import { Router } from "express";
//biblioteca para exibir respostas de status da pagina em http para o usuario 
import { StatusCodes } from 'http-status-codes';

const router = Router();


router.get('/', (req, res) => {
  res.send('olá mundo!');
});

router.post('/teste', (req, res) => {
  //console.log(req.body);

  res.status(StatusCodes.UNAUTHORIZED).json(req.body);
  //res.json('teste!');
});

export {router};