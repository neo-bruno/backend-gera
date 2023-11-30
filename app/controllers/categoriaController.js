const httpError = require('../helpers/handleError')
const db = require('../../config/db')

const getCategorias = async (req, res) => {
  try {
    const [results, metadata] = await db.query(`
      select * from categoria
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const getLastCategoria = async (req, res) => {
  try {
    const [results, metadata] = await db.query(`
      select * from categoria order by id_categoria desc limit 1
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const saveCategoria = async (req, res) => {
  try {
    const { numero_categoria, nombre, tipo, estado_categoria } = req.body
    const [results, metadata] = await db.query(`
      INSERT INTO public.categoria(
      numero_categoria, nombre, tipo, estado_categoria)
      VALUES (${numero_categoria}, '${nombre}', '${tipo}', ${estado_categoria});
    `)
    res.status(200).send({ data: results })

  } catch (error) {
    httpError(res, error)
  }
}
const modifyCategoria = async (req, res) => {
  try {
    const { id_categoria, numero_categoria, nombre, tipo, estado_categoria } = req.body
    const [results, metadata] = await db.query(`
    UPDATE public.categoria
    SET numero_categoria=${numero_categoria}, nombre='${nombre}', tipo='${tipo}', estado_categoria=${estado_categoria}
    WHERE id_categoria= ${id_categoria};
    `)
    res.status(200).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

module.exports = {
  saveCategoria, getCategorias, getLastCategoria, modifyCategoria
}