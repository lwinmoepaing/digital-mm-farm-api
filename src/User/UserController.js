const User = require('./UserModel')

const { errorResponse, successResponse } = require('../../lib/responseHandler')
const { DEEP_JSON_COPY } = require('../../lib/helper')

/**
 * GET Profile Data
 */

module.exports.GET_USER_BY_ID = async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		if(!user) throw new Error ('User Not Found ')

		let data = DEEP_JSON_COPY(user)
		delete data.password
		res.json(successResponse(data))
	} catch (e) {
		res.json(errorResponse(e))
	}
}
