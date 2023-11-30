const express = require('express')
const router = express.Router()
const authVerification = require('../middleware/authVerification')

const { getSeccion, updateSeccion } = require('../controllers/seccionController')

router.get('/:numero_menu', getSeccion)
router.put('/', authVerification, updateSeccion)
// router.post('/', authVerification, saveCaja)
// router.put('/', authVerification, modifyCaja)
module.exports = router