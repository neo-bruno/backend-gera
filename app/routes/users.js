const express = require('express')
const router = express.Router()
const authVerification = require('../middleware/authVerification')
const { getUser, getUsers, createUser, updateUser, deleteUser } = require('../controllers/usersController')

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', authVerification, createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router