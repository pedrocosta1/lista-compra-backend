import crypto from 'crypto'

import knex from '../config/knex'
import { description } from 'joi'

const generateHash = (password, hash = null) => {
  const key = hash ? hash : crypto.randomBytes(16).toString('base64')
  const pass = crypto.pbkdf2Sync(password, Buffer.from(key, 'base64'), 10000, 64, 'SHA1').toString('base64')
  return { pass, key }
}

const validate = async (login, password) => {
  const user = await knex('user').where('login', login)
    .select('id', 'login', 'password', 'hash', 'role', 'active').first()
  if (user && user.password === generateHash(password, user.hash).pass) {
    delete user.password
    delete user.hash
    return user
  }
  return null
}

const exist = async login => {
  const { count } = await knex('user').count('*').where('login', login).first()
  return count > 0
}

const get = async id => {
  return knex('user').where('id', id).select('id', 'login', 'role', 'active').first()
}

const create = async (login, password, role) => {
  const {pass, key} = generateHash(password)
  const user = await knex('user').insert({ 
    login,
    password: pass,
    hash: key,
    role
  }).returning('id', 'login', 'role', 'active')
  const userResult = await knex('user').where('id', user[0]).first()
  return userResult
}

const firstRegister = async (id, name, phone, player) => {
  if(player) {
    await knex('player').insert({
      name,
      phone,
      user: id
    })
  } else {
    await knex('client').insert({
      name,
      phone,
      user: id
    })
  }
}

export {
  validate,
  exist,
  get,
  create,
  firstRegister
}
