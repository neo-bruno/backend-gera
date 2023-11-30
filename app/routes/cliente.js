const express = require('express')
const router = express.Router()
const authVerification = require('../middleware/authVerification')

const {getCliente, getLastCliente, getAllCliente, saveCliente, modifyCliente} = require('../controllers/clienteController')

router.get('/:telefono', authVerification, getCliente)
router.get('/get/last', authVerification, getLastCliente)
router.get('/', authVerification, getAllCliente)
router.post('/', authVerification, saveCliente)
router.put('/', authVerification, modifyCliente)
module.exports = router