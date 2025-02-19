import { Router } from 'express';
import {
  CidadesController,
  PessoasController,
  UsuariosController,
} from './../controllers';

const router = Router();

router.get('/', (req, res) => {
  res.send('olá mundo!');
});

router.get(
  '/cidades',
  CidadesController.GetAllValidations,
  CidadesController.GetAll
);
router.get(
  '/cidades/:id',
  CidadesController.getByIDValidation,
  CidadesController.GetByID
);

router.post(
  '/cidades',
  CidadesController.createValidation,
  CidadesController.create
);

router.put(
  '/cidades/:id',
  CidadesController.UpdateByIDValidation,
  CidadesController.UpdateByID
);

router.delete(
  '/cidades/:id',
  CidadesController.deleteByIdValidation,
  CidadesController.deleteById
);

router.get(
  '/pessoas',
  PessoasController.GetAllValidations,
  PessoasController.GetAll
);

router.get(
  '/pessoas/:id',
  PessoasController.getByIDValidation,
  PessoasController.GetByID
);

router.post(
  '/pessoas',
  PessoasController.createValidation,
  PessoasController.create
);

router.put(
  '/pessoas/:id',
  PessoasController.UpdateByIDValidation,
  PessoasController.UpdateByID
);

router.delete(
  '/pessoas/:id',
  PessoasController.deleteByIdValidation,
  PessoasController.deleteById
);

router.post(
  './entrar/',
  UsuariosController.signInValidation,
  UsuariosController.signIn
);
router.post(
  './cadastrar',
  UsuariosController.signUpValidation,
  UsuariosController.signUp
);

export { router };
