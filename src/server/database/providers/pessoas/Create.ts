import { ETableNames } from '../../ETableNames';
import { IPessoa } from '../../models';
import { Knex } from '../../knex';
import { number } from 'yup';

export const create = async (
  PESSOA: Omit<IPessoa, 'id'>
): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.CIDADE)
      .where('id', '=', PESSOA.cidadeId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('A cidade usada no cadastro não foi encontrada');
    }

    const [result] = await Knex(ETableNames.PESSOA)
      .insert(PESSOA)
      .returning('id');
    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Erro ao cadastrar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};
