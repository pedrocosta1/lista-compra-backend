import knex from '../config/knex'

const getAll = async () => {
    return await knex('categoria')
  }

  const get = async (id) => {
    return await knex('categoria').where('id', id).first()
  }

  const create = async (
    nome
  ) => {
    return await knex('categoria').insert({
      nome
    })
  }

  const update = async (
    id,
    nome
  ) => {
    return await knex('categoria').where('id' , id).update({
      nome
    })
  }

export {
    getAll,
    get,
    create, 
    update
}