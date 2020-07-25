export async function up(knex) {
  return knex.schema.createTable('courses', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
  });
}

export async function down(knex) {
  return knex.schema.dropTable('courses');
}