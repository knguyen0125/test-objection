import * as bcrypt from 'bcrypt';
import * as Knex from 'knex';

const NUMBER_OF_ROUNDS = 12;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users_roles').del();
  await knex('roles').del();
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1,
      first_name: 'Public',
      last_name: 'Nguyen',
      email: 'public@gmail.com',
      password: await bcrypt.hash('hello', NUMBER_OF_ROUNDS),
    },
    {
      id: 2,
      first_name: 'Admin',
      last_name: 'Nguyen',
      email: 'admin@gmail.com',
      password: await bcrypt.hash('hello', NUMBER_OF_ROUNDS),
    },
  ]);

  await knex('roles').insert([
    {
      id: 1,
      name: 'public',
    },
    {
      id: 2,
      name: 'admin',
    },
  ]);

  await knex('users_roles').insert([
    {
      id: 1,
      user_id: 1,
      role_id: 1,
    },
    {
      id: 2,
      user_id: 2,
      role_id: 2,
    },
  ]);
}
