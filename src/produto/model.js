import knex from '../config/knex'

const getAll = async () => {
    return await knex('produto')
  }

  const get = async (id) => {
    return await knex('produto').where('id', id).first()
  }

  const create = async (
    categoria_id,
    nome
  ) => {
    return await knex('produto').insert({
      categoria_id,
      nome
    })
  }

  const update = async (
    categoria_id,
    nome
  ) => {
    return await knex('produto').where('id' , id).update({
      categoria_id,
      nome
    })
  }

export {
    getAll,
    get,
    create, 
    update
}