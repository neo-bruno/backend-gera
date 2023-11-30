const httpError = require('../helpers/handleError')
const db = require('../../config/db')

const getCliente = async (req, res) => {
  try {
    const telefono = req.params.telefono
    const [results, metadata] = await db.query(`
      select * from cliente where numero_celular = '${telefono}'
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const getLastCliente = async (req, res) => {
  try {    
    const [results, metadata] = await db.query(`
      select * from cliente order by id_cliente desc limit 1
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const getAllCliente = async (req, res) => {
    try {      
      const [results, metadata] = await db.query(`
        select * from cliente order by id_cliente desc
      `)
      res.status(201).send({ data: results })
    } catch (error) {
      httpError(res, error)
    }
  }

const saveCliente = async (req, res) => {
  try {
    const { numero_cliente, nombre_cliente, numero_celular, fecha_nacimiento, carnet_identidad, expedito, direccion, ciudad, pais } = req.body    
    let query = ''
    if(fecha_nacimiento == '')
      query = `INSERT INTO public.cliente(
        numero_cliente, nombre_cliente, numero_celular, fecha_nacimiento, carnet_identidad, expedito, direccion, ciudad, pais)
        VALUES (${numero_cliente}, '${nombre_cliente}', '${numero_celular}', null, '${carnet_identidad}', '${expedito}', '${direccion}', '${ciudad}', '${pais}');`
    else
      query = `INSERT INTO public.cliente(
        numero_cliente, nombre_cliente, numero_celular, fecha_nacimiento, carnet_identidad, expedito, direccion, ciudad, pais)
        VALUES (${numero_cliente}, '${nombre_cliente}', '${numero_celular}', '${fecha_nacimiento}', '${carnet_identidad}', '${expedito}', '${direccion}', '${ciudad}', '${pais}');`
    const [results, metadata] = await db.query(query)
    res.status(200).send({ data: results })

  } catch (error) {
    httpError(res, error)
  }
}
const modifyCliente = async (req, res) => {
  try {
    const { id_cliente, numero_cliente, nombre_cliente, numero_celular, fecha_nacimiento, carnet_identidad, expedito, direccion, ciudad, pais } = req.body
    const [results, metadata] = await db.query(`
    UPDATE public.cliente
	SET numero_cliente=${numero_cliente}, nombre_cliente='${nombre_cliente}', numero_celular='${numero_celular}', fecha_nacimiento='${fecha_nacimiento}', carnet_identidad='${carnet_identidad}', expedito='${expedito}', direccion='${direccion}', ciudad='${ciudad}', pais='${pais}'
	WHERE id_cliente = ${id_cliente};
    `)
    res.status(200).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

module.exports = {
    getAllCliente, getLastCliente, saveCliente, getCliente, modifyCliente
}