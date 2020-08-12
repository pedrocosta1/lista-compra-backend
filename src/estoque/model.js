import knex from '../config/knex'

const getAll = async () => {
    return await knex('estoque')
  }

  const get = async (id) => {
    return await knex('estoque').where('id', id).first()
  }

  const create = async (
    produto_id,
    qtd_min,
    qtd_atual
  ) => {
    return await knex('estoque').insert({
      produto_id,
      qtd_min,
      qtd_atual
    })
  }

  const update = async (
    produto_id,
    qtd_min,
    qtd_atual
  ) => {
    return await knex('estoque').where('id' , id).update({
      produto_id,
      qtd_min,
      qtd_atual
    })
  }

export {
    getAll,
    get,
    create, 
    update
}