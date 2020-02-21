const express = require('express')
const passport = require('passport')
const router = express.Router()

// Importing Controller
const AuthController = require('../../src/Auth/AuthController')
const UserController = require('../../src/User/UserController')

/**
 * Get User Info (Me)
 * @doc : Getting to Self Profile
 */

router.get('/me', passport.authenticate('jwt', {session: false}), AuthController.GET_PROFILE_DATA)

/**
 * Get All User (With Filters)
 */
router.get('/', passport.authenticate('jwt', {session: false}), UserController.GET_ALL_USERS)

/**
 * Update User
 * @doc : Access 'Admin' Or 'Self Update Man'
 */
router.put('/:id', passport.authenticate('jwt', {session: false}), UserController.UPDATE_USER_BY_ID)

/**
 * Delete User
 */
router.delete('/:id', passport.authenticate('jwt', {session: false}), UserController.DELETE_USER_BY_ID)

module.exports = router