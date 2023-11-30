const express = require('express')
const router = express.Router()
const authVerification = require('../middleware/authVerification')
const verifyRoomDuplicate = require('../middleware/habitacionDuplicate')

const { getAllHabitaciones, getHabitacion, saveHabitacion, getLastHabitacion } = require('../controllers/habitacionController')

router.get('/', getAllHabitaciones)
router.get('/:id_habitacion', getHabitacion)
router.get('/get/last', authVerification, getLastHabitacion)
router.post('/', authVerification, verifyRoomDuplicate, saveHabitacion)

module.exports = router