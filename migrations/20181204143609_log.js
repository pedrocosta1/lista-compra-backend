
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('log', function(table) {
      table.increments()
      table.timestamp('date', true).defaultTo(knex.fn.now())
      table.string('from')
      table.string('level')
      table.text('message')
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('log'),
  ])
}
