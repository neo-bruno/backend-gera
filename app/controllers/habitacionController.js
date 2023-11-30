const httpError = require('../helpers/handleError')
const db = require('../../config/db')

const getAllHabitaciones = async (req, res) => {
  try {
    const [results, metadata] = await db.query(`      
      select * from habitacion h, precio p, moneda m where h.numero_precio = p.numero_precio and m.id_moneda = p.id_moneda order by h.numero asc
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const getHabitacion  = async (req, res) => {
  try {
    const id_habitacion = req.params.id_habitacion
    const [results , metadata] = await db.query(`
      select * from habitacion h, precio p, moneda m where p.id_moneda = m.id_moneda and p.numero_precio = h.numero_precio and h.id_habitacion = ${id_habitacion}      
    `)
    res.status(201).send({data: results})
  } catch (error) {
    httpError(res, error)
  }
}

const getLastHabitacion = async (req, res) => {
  try {
    const [ results, metadata ] = await db.query(`
      select * from habitacion order by id_habitacion desc limit 1
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const saveHabitacion = async (req, res) => {
  try {
    const { numero, titulo, nombre, cap_adultos, cap_ninos, dimension, piso, telefono, check_in, check_out, sofa_cama, detalle_cama, estado, publicar, noche_boda, detalle_noche_boda, detalle_corto, descripcion, imagen_principal, url_video, valoracion, numero_precio, numero_categoria } = req.body
    const [results, metadata] = await db.query(`
      INSERT INTO public.habitacion(
      numero, titulo, nombre, cap_adultos, cap_ninos, dimension, piso, telefono, check_in, check_out, sofa_cama, detalle_cama, estado, publicar, noche_boda, detalle_noche_boda, detalle_corto, descripcion, imagen_principal, url_video, valoracion, numero_precio, numero_categoria)
      VALUES ('${numero}', '${titulo}', '${nombre}', ${cap_adultos}, ${cap_ninos}, '${dimension}', '${piso}', '${telefono}', '${check_in}', '${check_out}', ${sofa_cama}, '${detalle_cama}', ${estado}, ${publicar}, ${noche_boda}, '${detalle_noche_boda}', '${detalle_corto}', '${descripcion}', '${imagen_principal}', '${url_video}', ${valoracion}, ${numero_precio}, ${numero_categoria});
    `)
    res.status(200).send({ data: results })

  } catch (error) {
    httpError(res, error)
  }
}

module.exports = {
  getAllHabitaciones, saveHabitacion, getLastHabitacion, getHabitacion
}