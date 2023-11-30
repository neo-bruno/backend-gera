const express = require('express')
const router = express.Router()
const authVerification = require('../middleware/authVerification')
const getMonedas = require('../controllers/monedaController')

router.get('/', authVerification, getMonedas)

module.exports = router