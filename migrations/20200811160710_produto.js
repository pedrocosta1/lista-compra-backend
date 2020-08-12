
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('produto', function(table) {
          table.increments()
          table.string('nome'),
          table.integer('categoria_id').unsigned(), 
          table.foreign('categoria_id').references('categoria.id').onDelete('cascade')
        }),
      ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('produto'),
    ])
};
