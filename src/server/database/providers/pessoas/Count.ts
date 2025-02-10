import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const count = async (filter = ''): Promise<number | Error> => {
  try {
    const result = await Knex(ETableNames.PESSOA)
      .count('*', { as: 'total' })
      .where('nomeCompleto', 'like', `%${filter}%`)
      .first();

    if (!result || result.total === undefined) {
      return new Error(
        'Não foi possível encontrar a quantidade total de registros'
      );
    }
    return Number(result.total);
  } catch (error) {
    console.log(`Erro ao consultar a quantidade total de registros: ${error}`);
    return new Error(
      'Erro inesperado ao consultar a quantidade total de registros'
    );
  }
};
