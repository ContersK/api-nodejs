import { ETableNames } from "../../ETableNames";
import { ICidade } from "../../models";
import { Knex } from "../../knex";

export const getAll = async (
  page: number,
  limit: number,
  filter = ""
): Promise<ICidade[] | Error> => {
  try {
    const results = await Knex(ETableNames.CIDADE)
      .select("*")
      .where("nome", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return results;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao listar os registros");
  }
};
