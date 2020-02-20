
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '../.env') })

const env = process.env.NODE_ENV || 'development'
const JWT_SECRET = process.env.JWT_SECRET || 'lwinSecrect'
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/digital-mm-farm'

const config = {
	development: {
		API_VERSION: '/api/v1',
		API_KEY: process.env.API_KEY,
		JWT_SECRET,
		MONGO_URI
	},
	production: {
		API_VERSION: '/api/v1',
		API_KEY: process.env.API_KEY,
		JWT_SECRET,
		MONGO_URI
	}
}
module.exports = config[env]
