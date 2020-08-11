
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user', function(table) {
      table.increments('id')
      table.string('login')
      table.string('password')
      table.string('hash')
      table.string('role').defaultTo('user')
      table.boolean('active').defaultTo(true)
      table.unique('login')
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('user'),
  ])
}
