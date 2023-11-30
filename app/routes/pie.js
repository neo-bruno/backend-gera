const express = require('express')
const router = express.Router()
const authVerification = require('../middleware/authVerification')

const { getPie, getPieIconos, updatePie } = require('../controllers/pieController')

router.get('/:numero_seccion', getPie)
router.get('/iconos/:id_pie', getPieIconos)
router.put('/', authVerification, updatePie)
// router.get('/:fecha', authVerification, findCaja)
// router.post('/', authVerification, saveCaja)
module.exports = router