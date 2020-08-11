import express from 'express'
// import Joi from 'joi'

import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { getTemplate } from './model'

const router = express.Router()

router.get('/', requireAuth('user'), (req, res) => {
  try {
    logger.info('REQ /api/template')
    return res.send(getTemplate())
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router
