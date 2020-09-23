import * as Knex from 'knex';
import { createTable, createTableIfNotExists } from './utils/create-table.util';

export async function up(knex: Knex): Promise<void> {
  await createTableIfNotExists(knex, 'users', table => {
    table.increments('id').primary();
    table.string('first_name', 256).notNullable();
    table.string('last_name', 256).notNullable();

    table.string('email', 256).notNullable();
    table.string('password').notNullable();

    table.unique(['email', 'is_deleted']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}
