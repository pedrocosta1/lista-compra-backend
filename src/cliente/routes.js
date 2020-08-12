import express from 'express'
import Joi from 'joi'

import logger from '../config/logger'
import knex from '../config/knex'
import requireAuth from '../auth/requireAuth'
import { getAll, get, create, update } from './model'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { value, error } = Joi.validate(
      req.body,
      Joi.object().keys({
        nome: Joi.string().required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    await create (nome)
    res.send({ status: true })
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('GET /cliente')
    const cliente = await getAll()
    return res.send(cliente)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/:id', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('GET /cliente/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.number().integer().required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const cliente = await get(value.id)
    return res.send(cliente)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/:id', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('POST /cliente/:id')
    const params = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.string().required(),
      })
    )
    if (params.error) { 
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const body = Joi.validate(
      req.body,
      Joi.object().options({ abortEarly: false }).keys({
        nome: Joi.string().required()
      })
    )
    if (body.error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    await update(
      params.value.id,
      body.value.nome
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router

