import { ETableNames } from '../../ETableNames';
import { IUsuario } from '../../models';
import { Knex } from '../../knex';
import { PassWordCrypto } from '../../../shared/services';

export const create = async (
  usuario: Omit<IUsuario, 'id'>
): Promise<number | Error> => {
  try {
    const hashedPassword = PassWordCrypto.encrypt(usuario.senha);

    const [result] = await Knex(ETableNames.USUARIO)
      .insert({ ...usuario, senha: hashedPassword })
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
