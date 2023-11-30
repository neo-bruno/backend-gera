const express = require('express')
const router = express.Router()
// const authVerification = require('../middleware/authVerification')
const {saveImage} = require('../controllers/imageController')

router.post('/', saveImage)

module.exports = router