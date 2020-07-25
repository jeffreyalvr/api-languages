export async function seed(knex) {
  await knex('courses').insert([
    {
      title: 'japanese',
    },
    {
      title: 'korean',
    }
  ]);
}