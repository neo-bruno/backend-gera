const express = require('express')
const router = express.Router()
const authVerification = require('../middleware/authVerification')
const verifyCategoriaDuplicate = require('../middleware/categoriaDuplicate')

const {getCategorias, getLastCategoria, saveCategoria, modifyCategoria} = require('../controllers/categoriaController')

router.get('/', authVerification, getCategorias)
router.get('/last', authVerification, getLastCategoria)
router.post('/', authVerification, verifyCategoriaDuplicate, saveCategoria)
router.put('/', authVerification, modifyCategoria)

module.exports = router