const express = require('express')
const router = express.Router()
const verifyEmailDuplicate = require('../middleware/userDuplicate')

const { login, register } = require('../controllers/authController')


router.post('/login', login)

router.post('/register', verifyEmailDuplicate, register)

module.exports = router