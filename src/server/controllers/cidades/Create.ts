import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";

interface ICidade {
  nome: string;
}
export const createValidation = validation(
  (
    getSchema: <T extends yup.Maybe<yup.AnyObject>>(
      schema: yup.ObjectSchema<T>
    ) => yup.ObjectSchema<T>
  ) => ({
    body: getSchema<ICidade>(
      yup.object().shape({
        nome: yup.string().required().min(3).strict(),
      })
    ),
  })
);

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  return res.status(StatusCodes.CREATED).json(1);
};
