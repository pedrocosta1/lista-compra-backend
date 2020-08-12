import knex from '../config/knex'

const getAll = async () => {
    return await knex('user')
  }

  const get = async (id) => {
    return await knex('user').where('id', id).first()
  }

  const create = async (
    nome,
    email
  ) => {
    return await knex('user').insert({
      nome,
      email
    })
  }

  const update = async (
    id,
    nome,
    email
  ) => {
    return await knex('user').where('id' , id).update({
      nome,
      email
    })
  }

export {
    getAll,
    get,
    create, 
    update
}