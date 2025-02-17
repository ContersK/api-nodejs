import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.USUARIO, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('nome', 125).checkLength('>=', 3).notNullable();
      table.string('email').unique().notNullable().checkLength('>=', 5);
      table.string('senha').index().notNullable().checkLength('>=', 6);

      table.comment('Tabela usada para armazenar usuarios no sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.USUARIO}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.USUARIO).then(() => {
    console.log(`# Dropped table ${ETableNames.USUARIO}`);
  });
}
