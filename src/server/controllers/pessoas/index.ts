import * as Create from './Create';
import * as GetAll from './GetAll';
import * as GetByID from './GetByID';
import * as UpdateByID from './UpdateByID';
import * as DeleteByID from './DeleteByID';

export const PessoasController = {
  ...Create,
  ...GetAll,
  ...GetByID,
  ...UpdateByID,
  ...DeleteByID,
};
