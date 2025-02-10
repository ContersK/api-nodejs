import { ETableNames } from "../../ETableNames";
import { IPessoa } from "../../models";
import { Knex } from "../../knex";

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.PESSOA).where("id", "=", id).del();

    if (result > 0) {
      return;
    }

    return new Error("Erro ao excluir o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao excluir o registro");
  }
};
