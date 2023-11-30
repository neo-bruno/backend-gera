const express = require('express')
const router = express.Router()
const authVerification = require('../middleware/authVerification')

const { findHuesped } = require('../controllers/huespedController')

router.get('/:dato/:tipo', authVerification, findHuesped)
module.exports = router