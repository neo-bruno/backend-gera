const httpError = require('../helpers/handleError')
const db = require('../../config/db')

const findHuesped = async (req, res) => {
  try {
    const { dato, tipo } = req.params
    let query = ''
    if(tipo == 0){
      query = `
          select * 
          from usuario u, cargo c, huesped h
          where u.id_cargo = c.id_cargo and h.id_usuario = u.id_usuario
          order by h.id_huesped desc limit 7;
        `
    }
    if(tipo == 1){
      query = `
          select * 
          from usuario u, cargo c, huesped h
          where u.id_cargo = c.id_cargo and h.id_usuario = u.id_usuario and h.nombre like '%${dato}%' or h.apellidos like '%${dato}%';
        `
    }    
    const [results, metadata] = await db.query(query)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

module.exports = {
  findHuesped
}