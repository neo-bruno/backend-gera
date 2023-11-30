const express = require('express')
const router = express.Router()
const authVerification = require('../middleware/authVerification')

const { getIconosPanel, savePanelIcono, deletePanelIcono, getIconosHabitacion, saveIconoHabitacion, deleteIconoHabitacion, updateIconoHabitacion } = require('../controllers/iconoController')

router.get('/panel/:id_panel', getIconosPanel)
// router.get('/:fecha', authVerification, findCaja)
router.post('/', authVerification, savePanelIcono)
router.delete('/:id_panel/:id_icono/:id_pie', authVerification, deletePanelIcono)

router.get('/:id_habitacion', getIconosHabitacion)
router.post('/habitacion/', authVerification, saveIconoHabitacion)
router.delete('/eliminar/habitacion/:id_habitacion/:id_icono', deleteIconoHabitacion)
router.put('/:id_habitacion/:id_icono', authVerification, updateIconoHabitacion)
module.exports = router