import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import "../../shared/services/translationsYup";
import { validation } from "../../shared/middlewares";

interface IQuerryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const GetAllValidations = validation((getSchema) => ({
  query: getSchema<IQuerryProps>(
    yup.object().shape({
      page: yup.number().optional().moreThan(0),
      limit: yup.number().optional().moreThan(0),
      filter: yup.string().optional(),
    })
  ),
}));

export const GetAll = async (
  req: Request<{}, {}, {}, IQuerryProps>,
  res: Response
) => {
  console.log(req.query);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("não implementado");
};
