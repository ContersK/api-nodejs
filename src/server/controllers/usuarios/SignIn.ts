import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import jwt from 'jsonwebtoken';
import { UsuariosProvider } from '../../database/providers/usuarios';
import bcrypt from 'bcrypt';
import { validation } from '../../shared/middleware';
import { IUsuario } from '../../database/models';
import { PassWordCrypto } from '../../shared/services';

interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      senha: yup.string().required().min(6),
      email: yup.string().required().email().min(5),
    })
  ),
}));

export const signIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const { email, senha } = req.body;

  const result = await UsuariosProvider.getByEmail(email);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos',
      },
    });
  }

  // Verifica a senha usando bcrypt
  const isPasswordValid = await bcrypt.compare(
    senha,
    PassWordCrypto.encrypt(senha)
  );
  if (!isPasswordValid) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos',
      },
    });
  }

  // Gera um token JWT
  const accessToken = jwt.sign({ userId: result.id }, 'seuSegredoJWT', {
    expiresIn: '1h',
  });

  return res.status(StatusCodes.OK).json({ accessToken });
};
