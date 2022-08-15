import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable('user', function (table) {
        table.increments('id');
        table.string('name', 55).notNullable();
        table.string('surname', 55).notNullable();
        table.string('email', 150).notNullable().unique();
        table.integer('age', 150).notNullable();
        table.timestamps(true, true);
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("user");
}