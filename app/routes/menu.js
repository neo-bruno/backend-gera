const express = require('express')
const router = express.Router()
const authVerification = require('../middleware/authVerification')

const { getMenu } = require('../controllers/menuController')

router.get('/', getMenu)
// router.get('/:fecha', authVerification, findCaja)
// router.post('/', authVerification, saveCaja)
// router.put('/', authVerification, modifyCaja)
module.exports = router