import * as Knex from 'knex';
import { createTableIfNotExists } from './utils/create-table.util';

export async function up(knex: Knex): Promise<void> {
  await createTableIfNotExists(knex, 'roles', table => {
    table.increments('id').primary();
    table.string('name').unique();
  });

  await createTableIfNotExists(knex, 'users_roles', table => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .references('id')
      .inTable('users');
    table
      .integer('role_id')
      .references('id')
      .inTable('roles');
  });

  await createTableIfNotExists(knex, 'permissions', table => {
    table.increments('id').primary();
    table.string('resource').notNullable();
    table.enum('action', ['create', 'read', 'update', 'delete']).notNullable();
    table.enum('possession', ['any', 'own']).notNullable();
    table
      .string('attributes')
      .notNullable()
      .defaultTo('*');
  });

  await createTableIfNotExists(knex, 'roles_permissions', table => {
    table.increments('id').primary();
    table
      .integer('role_id')
      .references('id')
      .inTable('roles');
    table
      .integer('permission_id')
      .references('id')
      .inTable('permissions');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('roles_permissions');
  await knex.schema.dropTableIfExists('users_roles');
  await knex.schema.dropTableIfExists('roles');
  return await knex.schema.dropTableIfExists('permissions');
}
