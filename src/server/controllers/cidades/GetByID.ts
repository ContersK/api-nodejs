import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import "../../shared/services/translationsYup";
import { validation } from "../../shared/middlewares";

interface IParamProps {
  id?: number;
}

export const getByIDValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().required().integer().moreThan(0),
    })
  ),
}));

export const GetByID = async (req: Request<IParamProps>, res: Response) => {
  console.log(req.params);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("não implementado");
};
