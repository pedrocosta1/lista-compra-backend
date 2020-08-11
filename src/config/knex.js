require('dotenv').config()
const knexStringcase = require('knex-stringcase')

// Converts Postgres snake_case to camelCase
const options = knexStringcase({
  client: 'mysql',
  version: '5.7',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: '3306',
  },
})

// Connects to Database
const knex = require('knex')(options)

export default knex
