import * as Create from './SignUp';
import * as GetByEmail from './SignIn';

export const UsuariosController = {
  ...Create,
  ...GetByEmail,
};
