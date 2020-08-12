
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('estoque', function(table) {
          table.increments()
          table.integer('qtd_min'),
          table.integer('qtd_atual'),
          table.integer('produto_id').unsigned(), 
          table.foreign('produto_id').references('produto.id').onDelete('cascade')
        }),
      ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('estoque'),
    ])
};
