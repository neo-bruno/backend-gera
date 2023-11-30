const httpError = require('../helpers/handleError')
const db = require('../../config/db')

const findPosition = async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario
    const [results, metadata] = await db.query(`
    select * from usuario u, cargo c where u.id_cargo = c.id_cargo and id_usuario = ${id_usuario}`)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

module.exports = findPosition