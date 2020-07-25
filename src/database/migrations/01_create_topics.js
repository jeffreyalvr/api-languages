export async function up(knex) {
  return knex.schema.createTable('topics', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
  });
}

export async function down(knex) {
  return knex.schema.dropTable('topics');
}