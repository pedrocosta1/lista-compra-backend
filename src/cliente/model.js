import knex from '../config/knex'

const getAll = async () => {
    return await knex('cliente')
  }

  const get = async (id) => {
    return await knex('cliente').where('id', id).first()
  }

  const create = async (
    nome
  ) => {
    return await knex('cliente').insert({
      nome
    })
  }

  const update = async (
    id,
    nome
  ) => {
    return await knex('cliente').where('id' , id).update({
      nome
    })
  }

export {
    getAll,
    get,
    create, 
    update
}