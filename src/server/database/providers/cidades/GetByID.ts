import { knex } from "knex";
import { ETableNames } from "../../ETableNames";
import { ICidade } from "../../models";

export const getById = async (id: number): Promise<ICidade | Error> => {
  try {
    const result = await knex(ETableNames.CIDADE)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) {
      return result;
    }

    return new Error("Registro não encontrado");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar o registro");
  }
};
