import express from 'express'
import Joi from 'joi'
import jwt from 'jsonwebtoken'

import logger from '../config/logger'
import { exist, validate, create, firstRegister } from './model'
import requireAuth from './requireAuth'

const router = express.Router()

// Check if user exists
router.post('/exist', async (req, res) => {
  try {
    logger.info('REQ /api/auth/exists')
    // Validate request
    const { value, error } = Joi.validate(
      req.body,
      Joi.object().keys({
        login: Joi.string().email().required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    // Check if login exists
    const exists = await exist(value.login)
    res.send({ exists })
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

// Sign in user
router.post('/signin', async (req, res) => {
  try {
    logger.info('REQ /api/auth/signin')
    // Validate request
    const { value, error } = Joi.validate(
      req.body,
      Joi.object().keys({
        login: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,20}$/).required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    // Validate user
    const user = await validate(value.login, value.password)
    if (!user) { return res.status(400).send({ error: 'Invalid login or password' }) }
    if (!user.active) { return res.status(401).send({ error: 'User disabled' }) }
    // Generate sign token
    delete user.active
    console.log(user)
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
    return res.send({ token, user })
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

// Sign on user
router.post('/signon', async (req, res) => {
  try {
    logger.info('REQ /api/auth/signon')
    // Validate request
    const { value, error } = Joi.validate(
      req.body,
      Joi.object().keys({
        login: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,20}$/).required(),
        role: Joi.string().required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const check = await exist(value.login)
    if (check) { return res.status(400).send({ error: 'User already exists' }) }
    const user = await create(value.login, value.password, value.role)
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
    return res.send({ token, user })
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.post('/register', async (req, res) => {
  try {
    logger.info('REQ /api/auth/register')
    const { value, error } = Joi.validate(
      req.body,
      Joi.object().keys({
        id: Joi.number().integer().required(),
        name: Joi.string().required(),
        phone: Joi.string().required(),
        role: Joi.string().required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    let player = false
    if(value.role === 'player') player = true
    await firstRegister(
      value.id,
      value.name,
      value.phone,
      player
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

// Get user data and renew JWT token
router.get('/user', requireAuth(), (req, res) => {
  try {
    logger.info('REQ /api/auth/user')
    const user = req.user
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
    return res.send({ token, user })
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router
