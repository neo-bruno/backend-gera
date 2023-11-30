const express = require('express')
const router = express.Router()
const authVerification = require('../middleware/authVerification')

const { getArchivosPanel, saveArchivo, deletePanelArchivo, getArchivosHabitacion, saveArchivoHabitacion, deleteArchivoHabitacion, updateArchivoHabitacion } = require('../controllers/archivoController')

router.get('/panel/:id_panel', getArchivosPanel)
router.post('/', authVerification, saveArchivo)
router.delete('/:id_panel/:id_archivo/:id_galeria', authVerification, deletePanelArchivo)

router.get('/:id_habitacion', getArchivosHabitacion)
router.post('/habitacion/', authVerification, saveArchivoHabitacion)
router.delete('/habitacion/eliminar/:id_habitacion/:id_archivo', authVerification, deleteArchivoHabitacion)
router.put('/:id_habitacion/:id_archivo', authVerification, updateArchivoHabitacion)
module.exports = router