const express = require('express')
const router = express.Router()
const authVerification = require('../middleware/authVerification')

const { getCuadro } = require('../controllers/cuadroController')

router.get('/:numero_cuadro', getCuadro)
// router.get('/:fecha', authVerification, findCaja)
// router.post('/', authVerification, saveCaja)
// router.put('/', authVerification, modifyCaja)
module.exports = router