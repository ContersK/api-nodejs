import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const count = async (filter: string): Promise<number | Error> => {
  try {
    const result = await Knex(ETableNames.CIDADE)
      .count("*", { as: "total" })
      .where("nome", "like", `%${filter}%`)
      .first();

    if (result && result.total !== undefined) {
      return Number(result.total);
    }
    return new Error("Erro ao contar os registros");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao listar os registros");
  }
};
