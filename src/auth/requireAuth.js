import jwt from 'jsonwebtoken'

import logger from '../config/logger'
import { get as getUser } from './model'

// Verify if token and user are valid
const requireAuth = (role = null) => (req, res, next) => {
  try {
    // Get token from header
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      const token = req.headers.authorization.split(' ')[1]
      // Verify token
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) { return res.status(401).send({ error }) }
        // Get user from database
        getUser(decoded.id).then(user => {
          if (!user) { return res.status(401).send({ error: 'User not found' }) }
          if (!user.active) { return res.status(401).send({ error: 'User disabled' }) }
          if (role && user.role !== role) { return res.status(401).send({ error: 'Permission denied' }) }
          // Save user on req for foward requests
          req.user = user
          return next()
        })
      })
    } else {
      return res.status(401).send({ error: 'JWT token not found' })
    }
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
}

export default requireAuth
