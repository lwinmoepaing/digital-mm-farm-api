const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const { successResponse } = require('../lib/responseHandler')

/**
 * @doc : to Login from User Request
 * @param { req } HttpRequest
 */
router.post('/', (req, res) => {
	passport.authenticate('local', {session: false}, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				message: 'Something is not right',
				user   : user
			})
		}
		req.login(user, {session: false}, (err) => {
			if (err) {
				res.send(err)
			}
			// generate a signed son web token with the contents of user object and return it in the response
			const token = jwt.sign(user, 'your_jwt_secret')
			return res.json({user, token})
		})
	})(req, res)
})

router.get('/', (req, res) => {
	res.json(successResponse('GET Auth SUCCESS'))
})

module.exports = router
