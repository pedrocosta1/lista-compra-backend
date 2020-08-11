import knex from '../config/knex'

const getAll = async () => {
    return await knex('log')
  }

  const get = async (id) => {
    return await knex('log').where('id', id).first()
  }

export {
    getAll,
    get
}