import { Router } from "express";
//biblioteca para exibir respostas de status da pagina em http para o usuario 
import { StatusCodes } from 'http-status-codes';
import { CidadesController } from './../controllers';


const router = Router();


router.get('/', (req, res) => {
  res.send('olá mundo!');
});



router.post('/cidades', CidadesController.create);

export {router};