import { Request, Response } from 'express';



export const create = (req: Request, res: Response) => {

  const data = req.body;
  if (!data) {
    console.log('Corpo da requisição está vazio ou não interpretado!');
  } else {
    console.log('Dados recebidos:', data);
  }

  return res.send('create!');
};