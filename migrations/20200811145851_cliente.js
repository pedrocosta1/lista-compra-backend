
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('cliente', function(table) {
          table.increments()
          table.string('nome'),
          table.integer('user_id').unsigned(), 
          table.foreign('user_id').references('user.id').onDelete('cascade')
        }),
      ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('cliente'),
      ])
};
