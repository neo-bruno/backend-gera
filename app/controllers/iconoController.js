const httpError = require('../helpers/handleError')
const db = require('../../config/db')
const iconoModel = require('../models/Icono')

const getIconosPanel = async (req, res) => {
  try {
    const id_panel = req.params.id_panel
    const [results, metadata] = await db.query(`
    select * from icono i, panel_icono pi where i.id_icono = pi.id_icono and pi.id_panel = ${id_panel}
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const getIconosHabitacion = async (req, res) => {
  try {
    const id_habitacion = req.params.id_habitacion
    let query = ''
    if(id_habitacion == 0){
      query = `
      select * 
      from icono i, habitacion_icono hi
      where hi.id_icono = i.id_icono and hi.id_habitacion = ${id_habitacion}
      `
    }else{
      query = `
        select  h.*, hi.*, i.nombre as nombre_icono, i.tipo as tipo_icono  
        from icono i, habitacion h, habitacion_icono hi
        where hi.id_icono = i.id_icono and hi.id_habitacion = h.id_habitacion and h.id_habitacion = ${id_habitacion}
      `
    }
    const [results, metadata] = await db.query(query)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const savePanelIcono = async (req, res) => {
  try {
    const { nombre, tipo, id_panel, id_pie } = req.body
    const registerIcono = await iconoModel.Icono.create({
      nombre,
      tipo
    })
    if (registerIcono) {
      if (id_panel > 0) {
        const [results, metadata] = await db.query(`
          INSERT INTO public.panel_icono(id_panel, id_icono)
          VALUES (${id_panel}, ${registerIcono.id_icono});
        `)
        res.status(200).send({ data: results })
      } else {
        const [results, metadata] = await db.query(`
          INSERT INTO public.pie_icono(id_pie, id_icono)
          VALUES (${id_pie}, ${registerIcono.id_icono});
        `)
        res.status(200).send({ data: results })
      }
    } else {
      res.status(401).send({ data: registerIcono })
    }
  } catch (error) {
    httpError(res, error)
  }
}
const saveIconoHabitacion = async (req, res) => {
  try {
    const { nombre, tipo, id_habitacion } = req.body
    console.log(nombre, tipo, id_habitacion)
    const registerIcono = await iconoModel.Icono.create({
      nombre,
      tipo
    })
    if (registerIcono && id_habitacion == 0) {
      const [results, metadata] = await db.query(`
        INSERT INTO public.habitacion_icono(id_habitacion, id_icono)
        VALUES (${id_habitacion}, ${registerIcono.id_icono});
      `)
    } 
    res.status(200).send({ data: registerIcono })   
  } catch (error) {
    httpError(res, error)
  }
}

const deletePanelIcono = async (req, res) => {
  try {
    const { id_panel, id_icono, id_pie } = req.params
    if (id_panel > 0) {
      const [results, metadata] = await db.query(`
        DELETE FROM public.icono
        WHERE id_icono= ${id_icono};
      
        DELETE FROM public.panel_icono
        WHERE id_panel = ${id_panel} and id_icono= ${id_icono};
      `)
      res.status(201).send({ data: results })
    } else {
      const [results, metadata] = await db.query(`
      DELETE FROM public.icono
      WHERE id_icono= ${id_icono};

      DELETE FROM public.pie_icono
	    WHERE id_pie = ${id_pie} and id_icono= ${id_icono};
    `)
      res.status(201).send({ data: results })
    }
  } catch (error) {
    httpError(res, error)
  }
}
const deleteIconoHabitacion = async (req, res) => {
  try {
    const { id_habitacion, id_icono } = req.params
    const [results, metadata] = await db.query(`
      DELETE FROM public.icono
      WHERE id_icono= ${id_icono};
    
      DELETE FROM public.habitacion_icono
      WHERE id_habitacion = ${id_habitacion} and id_icono= ${id_icono};
    `)
    res.status(201).send({ data: results })
    // if (id_habitacion > 0) {
    // }else{
    //   if(id_habitacion == 0){
    //     const [results, metadata] = await db.query(`
    //       DELETE FROM public.icono
    //       WHERE id_icono= ${id_icono};
        
    //       DELETE FROM public.habitacion_icono
    //       WHERE id_habitacion = ${id_habitacion} and id_icono= ${id_icono};
    //     `)
    //     res.status(201).send({ data: results })
    //   }
    // }
  } catch (error) {
    httpError(res, error)
  }
}

const updateIconoHabitacion = async (req, res) => {
  try {
    const { id_habitacion, id_icono } = req.params
    const [results, metadata] = await db.query(`
      UPDATE public.habitacion_icono
      SET id_habitacion=${id_habitacion}
      WHERE id_icono=${id_icono};
    `)
    res.status(200).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

module.exports = {
  getIconosPanel, savePanelIcono, deletePanelIcono, getIconosHabitacion, saveIconoHabitacion, deleteIconoHabitacion, updateIconoHabitacion
}