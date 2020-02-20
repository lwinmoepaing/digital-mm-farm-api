const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')

// Self Modules
const config = require('./config')
const errorHandler = require('./lib/errorHandler')
const ApiRouter = require('./router')
// Importing Services
const connectDb = require('./services/dbConnect')
const Logger = require('./services/logger')

// Dotenv (.env) Configuration
require('dotenv').config()
// Require Locale Passport Config
require('./services/passport')(passport)

// Connect To Database
connectDb()
// Use Logger
app.use(Logger)
// For setting various HTTP headers.
// It's not a silver bullet, but it can help!
app.use(helmet())
// For Cross Origin Resource Sharing
app.use(cors())
// Like Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


/**
 * Testing Initial API ROUTE
 * @doc : For only testing
 * @return { JSON }
 */
app.get('/', (req, res) => {
	const message = {
		success: true,
		author: 'Lwin Moe Paing'
	}
	res.status(201).json(message)
})

/**
 * SET API_ROUTER
 * @doc : Using Express Middleware For Routing
 * @directory : '/router/index.js'
 */
app.use(config.API_VERSION, ApiRouter)

/**
 * 404 Handler
 * @doc : Return 404 Response
 */
app.use('*', (req, res) => res.status(404).json({message: 'Request Not Found 404', statusCode: 404}))

/**
 * Latest Manage Error Exception
 * @doc : Finally Response Message
 * @return { JSON }
 */
app.use(errorHandler)

module.exports = app
