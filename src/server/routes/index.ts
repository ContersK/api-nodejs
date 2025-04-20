import { Router } from 'express';
import {
  CidadesController,
  PessoasController,
  UsuariosController,
} from './../controllers';
import { ensureAuthenticated } from '../shared/middleware';

const router = Router();

router.get('/', (req, res) => {
  res.send('olá mundo!');
});

router.get(
  '/cidades',
  ensureAuthenticated,
  CidadesController.GetAllValidations,
  CidadesController.GetAll
);
router.get(
  '/cidades/:id',
  ensureAuthenticated,
  CidadesController.getByIDValidation,
  CidadesController.GetByID
);

router.post(
  '/cidades',
  ensureAuthenticated,
  CidadesController.createValidation,
  CidadesController.create
);

router.put(
  '/cidades/:id',
  ensureAuthenticated,
  CidadesController.UpdateByIDValidation,
  CidadesController.UpdateByID
);

router.delete(
  '/cidades/:id',
  ensureAuthenticated,
  CidadesController.deleteByIdValidation,
  CidadesController.deleteById
);

router.get(
  '/pessoas',
  ensureAuthenticated,
  PessoasController.GetAllValidations,
  PessoasController.GetAll
);

router.get(
  '/pessoas/:id',
  ensureAuthenticated,
  PessoasController.getByIDValidation,
  PessoasController.GetByID
);

router.post(
  '/pessoas',
  ensureAuthenticated,
  PessoasController.createValidation,
  PessoasController.create
);

router.put(
  '/pessoas/:id',
  ensureAuthenticated,
  PessoasController.UpdateByIDValidation,
  PessoasController.UpdateByID
);

router.delete(
  '/pessoas/:id',
  ensureAuthenticated,
  PessoasController.deleteByIdValidation,
  PessoasController.deleteById
);

router.post(
  '/entrar/',
  UsuariosController.signInValidation,
  UsuariosController.signIn
);
router.post(
  '/cadastrar',
  UsuariosController.signUpValidation,
  UsuariosController.signUp
);

export { router };
