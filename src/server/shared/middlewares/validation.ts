import { RequestHandler, Request, Response, NextFunction } from "express";
import { AnyObject, Maybe, Schema, ValidationError, ObjectSchema } from "yup";
import { StatusCodes } from "http-status-codes";

type TProperty = "body" | "header" | "params" | "query";

type TGetSchema = <T extends Maybe<AnyObject>>(
  schema: ObjectSchema<T>
) => ObjectSchema<T>;

type TAllSchemas = Record<TProperty, ObjectSchema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation =
  (getAllSchemas) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const schemas = getAllSchemas((Schema) => Schema);
    const errorResult: Record<TProperty, Record<string, string>> = {
      body: {},
      header: {},
      params: {},
      query: {},
    };

    Object.entries(schemas).forEach(([field, schema]) => {
      try {
        schema.validateSync(req[field as TProperty], {
          abortEarly: false,
        });
      } catch (error) {
        const yupError = error as ValidationError;
        const ValidationErrors: Record<string, string> = {};

        yupError.inner.forEach((err) => {
          if (err.path === undefined) return;
          ValidationErrors[err.path] = err.message;
        });

        errorResult[field as TProperty] = ValidationErrors;
      }
    });

    const filteredErrorResult = Object.fromEntries(
      Object.entries(errorResult).filter(
        ([_, errors]) => Object.keys(errors).length > 0
      )
    );

    if (Object.keys(filteredErrorResult).length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json(filteredErrorResult);
    }

    return next();
  };
