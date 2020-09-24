import * as Knex from 'knex';
import { CreateTableBuilder } from 'knex';

export const createTable = async (
  knex: Knex,
  tableName: string,
  callback: (table: CreateTableBuilder) => any,
) => {
  await knex.schema.createTable(tableName, table => {
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
    table.float('is_deleted', null, 0).defaultTo(0);
  });

  await knex.schema.alterTable(tableName, callback);
};

export const createTableIfNotExists = async (
  knex: Knex,
  tableName: string,
  callback: (table: CreateTableBuilder) => any,
) => {
  const hasTable = await knex.schema.hasTable(tableName);

  if (!hasTable) {
    return await createTable(knex, tableName, callback);
  }

  return null;
};
