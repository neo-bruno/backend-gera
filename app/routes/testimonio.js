const express = require('express')
const router = express.Router()
const authVerification = require('../middleware/authVerification')

const { getTestimonios, getTestimonio, updateTestimonio } = require('../controllers/testimonioController')

router.get('/:numero_seccion', getTestimonios)
router.get('/find/:id_huesped', authVerification, getTestimonio)
// router.post('/', authVerification, saveCaja)
router.put('/', authVerification, updateTestimonio)
module.exports = router