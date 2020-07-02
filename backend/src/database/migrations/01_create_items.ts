import Knex from 'knex';

export async function up(knex: Knex){
    //criar a tabela
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });

}
export async function down(knex: Knex){
    //se der ruim, deleta a tabela
    return knex.schema.dropTable('items');
}