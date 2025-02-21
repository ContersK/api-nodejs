import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsuariosProvider } from '../../database/providers/usuarios';
import { validation } from '../../shared/middleware';
import { IUsuario } from '../../database/models';

interface IBodyProps extends Omit<IUsuario, 'id'> {}

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      senha: yup.string().required().min(6),
      email: yup.string().required().email().min(5),
    })
  ),
}));

export const signUp = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  try {
    // Verifica se o e-mail já está cadastrado
    const existingUser = await UsuariosProvider.getByEmail(req.body.email);
    if (existingUser && !(existingUser instanceof Error)) {
      return res.status(StatusCodes.CONFLICT).json({
        errors: {
          default: 'Email já cadastrado',
        },
      });
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(12);
    const hashedSenha = await bcrypt.hash(req.body.senha, salt);

    // Cria o usuário no banco de dados
    const createdUserId = await UsuariosProvider.create({
      ...req.body,
      senha: hashedSenha,
    });

    if (createdUserId instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: createdUserId.message,
        },
      });
    }

    // Gera o token JWT
    const jwtSecret =
      process.env.JWT_SECRET || 'secretPadraoParaDesenvolvimento';
    const token = jwt.sign({ uid: createdUserId }, jwtSecret, {
      expiresIn: '24h',
    });

    // Retorna apenas o ID do usuário criado
    return res.status(StatusCodes.CREATED).json(createdUserId);
  } catch (error) {
    console.error('SignUp Error:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Erro no processamento da requisição',
      },
    });
  }
};
