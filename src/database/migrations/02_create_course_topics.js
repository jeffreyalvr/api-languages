export async function up(knex) {
  return knex.schema.createTable('course_topics', table => {
    table.increments('id').primary();
    table.integer('course_id').notNullable().references('id').inTable('courses');
    table.integer('topic_id').notNullable().references('id').inTable('topics');
  });
}

export async function down(knex) {
  return knex.schema.dropTable('course_topics');
}