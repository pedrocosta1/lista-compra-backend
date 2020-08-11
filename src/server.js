import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
// Loads enviroment variables
dotenv.load()

// Import configs
import logger from './config/logger'
import './config/knex'

// Import routes where ------------------------------------
import log from './log/routes'
import auth from './auth/routes'
import template from './template/routes' // Sample
// --------------------------------------------------------

logger.info('Starting server...')

// Express
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// CORS
app.use(cors())

// Routes
const router = express.Router()
// Add routes where ---------------------------------------
router.get('/version', (req, res) => res.send(process.env.VERSION))
router.use('/log', log)
router.use('/auth', auth)
router.use('/template', template) // Sample
// --------------------------------------------------------

app.use('/api', router)

// Error Handler
// eslint-disable-next-line
// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).send(err.stack)
// })

// Starts express server
app.listen(process.env.PORT, () => logger.info(`Server listening on port ${process.env.PORT}`))
