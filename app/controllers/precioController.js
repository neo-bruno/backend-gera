const httpError = require('../helpers/handleError')
const db = require('../../config/db')

const getPrecios = async (req, res) => {
  try {
    const [results, metadata] = await db.query(`
      select * from precio
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const getAllPrecios = async (req, res) => {
  try {
    const [results, metadata] = await db.query(`
      SELECT * FROM PRECIO p, MONEDA m WHERE p.id_moneda = m.id_moneda
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const getLastPrecio = async (req, res) => {
  try {
    const [results, metadata] = await db.query(`
      select * from precio order by id_precio desc limit 1
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const getPrecio = async (req, res) => {
  try {
    const numero_precio = req.params.numero_precio
    const [results, metadata] = await db.query(`
      select * from precio p, moneda m where p.id_moneda = m.id_moneda and p.numero_precio = ${numero_precio}      
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const savePrecio = async (req, res) => {
  try {
    const { numero_precio, nombre_precio, valor_precio, estado_precio, id_moneda } = req.body
    const [results, metadata] = await db.query(`
      INSERT INTO public.precio(
      numero_precio, nombre_precio, valor_precio, estado_precio, id_moneda)
      VALUES (${numero_precio}, '${nombre_precio}', ${valor_precio}, ${estado_precio}, ${id_moneda});
    `)
    res.status(200).send({ data: results })

  } catch (error) {
    httpError(res, error)
  }
}
const modifyPrecio = async (req, res) => {
  try {
    const { id_precio, numero_precio, nombre_precio, valor_precio, estado_precio, id_moneda } = req.body
    const [results, metadata] = await db.query(`
    UPDATE public.precio
	  SET numero_precio=${numero_precio}, nombre_precio='${nombre_precio}', valor_precio=${valor_precio}, estado_precio=${estado_precio}, id_moneda=${id_moneda}
	  WHERE id_precio=${id_precio};
    `)
    res.status(200).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

module.exports = {
  savePrecio, getPrecios, getAllPrecios, getLastPrecio, modifyPrecio, getPrecio
}