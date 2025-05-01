import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { PessoasProvider } from '../../database/providers/pessoas';
import { validation } from '../../shared/middleware';

interface IParamProps {
  id?: number;
}

export const getByIDValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const GetByID = async (req: Request<IParamProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parâmetro 'id' deve ser informado",
      },
    });
  }

  const result = await PessoasProvider.getById(req.params.id);

  if (result instanceof Error) {
    if (result.message === 'Registro não encontrado') {
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: result.message,
        },
      });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
