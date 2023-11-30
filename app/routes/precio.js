const express = require('express')
const router = express.Router()
const authVerification = require('../middleware/authVerification')
// const verifyCategoriaDuplicate = require('../middleware/categoriaDuplicate')

const {getPrecios, getLastPrecio, getAllPrecios, getPrecio, savePrecio, modifyPrecio} = require('../controllers/precioController')

router.get('/', authVerification, getPrecios)
router.get('/last', authVerification, getLastPrecio)
router.get('/get/all', authVerification, getAllPrecios)
router.get('/get/room/:numero_precio', authVerification, getPrecio)
router.post('/', authVerification, savePrecio)
router.put('/', authVerification, modifyPrecio)

module.exports = router