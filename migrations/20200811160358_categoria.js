
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('categoria', function(table) {
          table.increments()
          table.string('nome')
        }),
      ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('categoria'),
    ])
};
