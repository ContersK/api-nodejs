import * as Create from "./Create";
import * as GetAll from "./GetAll";
import * as GetByID from "./GetByID";
import * as UpdateByID from "./UpdateByID";
import * as DeleteByID from "./DeleteByID";
import * as Count from "./Count";

export const CidadesProvider = {
  ...Create,
  ...GetAll,
  ...GetByID,
  ...UpdateByID,
  ...DeleteByID,
  ...Count,
};
