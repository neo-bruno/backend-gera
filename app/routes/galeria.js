const express = require('express')
const router = express.Router()
const authVerification = require('../middleware/authVerification')

const { getGaleria, getArchivosGaleria, updateGaleria } = require('../controllers/galeriaController')

router.get('/:numero_seccion', getGaleria)
router.get('/archivos/:id_galeria', getArchivosGaleria)
// router.post('/', authVerification, saveCaja)
router.put('/', authVerification, updateGaleria)
module.exports = router