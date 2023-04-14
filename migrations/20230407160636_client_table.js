/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
  return knex.schema.createTable("users",(table) =>{
    table.uuid("id").primary();
    table.string("name",255);
    table.string("email",255);
    table.string("client_id",255)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
  return knex.schema.dropTable("users")
};
