import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import "../../shared/services/translationsYup";
import { validation } from "../../shared/middlewares";

interface IParamProps {
  id?: number;
}
interface IBodyProps {
  nome: string;
}

export const UpdateByIDValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().required().integer().moreThan(0),
    })
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
    })
  ),
}));

export const UpdateByID = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response
) => {
  console.log(req.params);
  console.log(req.body);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("não implementado");
};
