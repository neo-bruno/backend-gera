const express = require('express')
const router = express.Router()
const authVerification = require('../middleware/authVerification')

const { getPanel, updatePanel } = require('../controllers/panelController')

router.get('/:numero_seccion', getPanel)
// router.get('/:fecha', authVerification, findCaja)
// router.post('/', authVerification, saveCaja)
router.put('/', authVerification, updatePanel)
module.exports = router