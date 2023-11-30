const express = require('express')
const router = express.Router()
const authVerification = require('../middleware/authVerification')

const findPosition = require('../controllers/empleadoController')

router.get('/:id_usuario', authVerification, findPosition)

module.exports = router