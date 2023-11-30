const httpError = require('../helpers/handleError')
const db = require('../../config/db')
const archivoModel = require('../models/Archivo')

const getArchivosPanel = async (req, res) => {
  try {
    const id_panel = req.params.id_panel
    const [results, metadata] = await db.query(`
    select * from archivo a, panel_archivo pa where a.id_archivo = pa.id_archivo and pa.id_panel = ${id_panel}	
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const getArchivosHabitacion = async (req, res) => {
  try {
    const id_habitacion = req.params.id_habitacion
    let query = ``
    if(id_habitacion == 0){
      query = `        
        select * 
        from archivo a, habitacion_archivo ha
        where a.id_archivo = ha.id_archivo and ha.id_habitacion = 0
      `
    }else{
      query = `
        select a.*
        from archivo a, habitacion_archivo ha, habitacion h
        where a.id_archivo = ha.id_archivo and h.id_habitacion = ha.id_habitacion and h.id_habitacion = '${id_habitacion}'
      `
    }
    const [results, metadata] = await db.query(query)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const saveArchivo = async (req, res) => {
  try {
    const { nombre, url, link, id_panel, id_galeria } = req.body
    const registerArchivo = await archivoModel.Archivo.create({
      nombre,
      url,
      link
    })
    if (registerArchivo && id_panel > 0) {
      const [results, metadata] = await db.query(`
        INSERT INTO public.panel_archivo(id_panel, id_archivo)
        VALUES (${id_panel}, ${registerArchivo.id_archivo});
      `)
      res.status(200).send({ data: results })
    } else {
      if (registerArchivo && id_galeria > 0) {
        const [results, metadata] = await db.query(`
        INSERT INTO public.galeria_archivo(id_galeria, id_archivo)
        VALUES (${id_galeria}, ${registerArchivo.id_archivo});
      `)
        res.status(200).send({ data: results })
      }else{
        res.status(401).send({ data: registerArchivo })
      }
    }
  } catch (error) {
    httpError(res, error)
  }
}

const saveArchivoHabitacion = async (req, res) => {
  try {
    const { nombre, url, link, id_habitacion } = req.body
    const registerArchivo = await archivoModel.Archivo.create({
      nombre,
      url,
      link,
    })
    if (registerArchivo) {
      const [results, metadata] = await db.query(`
        INSERT INTO public.habitacion_archivo(id_habitacion, id_archivo)
        VALUES (${id_habitacion}, ${registerArchivo.id_archivo});
      `)
      res.status(200).send({ data: results })      
    } else {
      if(registerArchivo)
        res.status(200).send({ data: registerArchivo })
      else
        res.status(401).send({ data: registerArchivo })
    }
  } catch (error) {
    httpError(res, error)
  }
}

const deletePanelArchivo = async (req, res) => {
  try {
    const { id_panel, id_archivo, id_galeria } = req.params
    if(id_panel > 0){
      const [results, metadata] = await db.query(`
        DELETE FROM public.archivo
        WHERE id_archivo= ${id_archivo};
        DELETE FROM public.panel_archivo
        WHERE id_panel = ${id_panel} and id_archivo= ${id_archivo};
      `)
      res.status(201).send({ data: results })
    }else{
      const [results, metadata] = await db.query(`
        DELETE FROM public.archivo
        WHERE id_archivo= ${id_archivo};
        DELETE FROM public.galeria_archivo
        WHERE id_galeria = ${id_galeria} and id_archivo= ${id_archivo};
      `)
      res.status(201).send({ data: results })
    }
  } catch (error) {
    httpError(res, error)
  }
}

const deleteArchivoHabitacion = async (req, res) => {
  try {
    const { id_habitacion, id_archivo } = req.params
    const [results, metadata] = await db.query(`
      DELETE FROM public.archivo
      WHERE id_archivo= ${id_archivo};
    
      DELETE FROM public.habitacion_archivo
      WHERE id_habitacion = ${id_habitacion} and id_archivo= ${id_archivo};
    `)
    res.status(200).send({ data: results })    
  } catch (error) {
    httpError(res, error)
  }
}

const updateArchivoHabitacion = async (req, res) => {
  try {
    const { id_habitacion, id_archivo } = req.params
    const [results, metadata] = await db.query(`
      UPDATE public.habitacion_archivo
      SET id_habitacion=${id_habitacion}
      WHERE id_archivo=${id_archivo};
    `)
    res.status(200).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

module.exports = {
  getArchivosPanel, saveArchivo, deletePanelArchivo, getArchivosHabitacion, saveArchivoHabitacion, deleteArchivoHabitacion, updateArchivoHabitacion
}