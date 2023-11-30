const httpError = require('../helpers/handleError')
const db = require('../../config/db')

const getCuadro = async (req, res) => {
  try {
    const numero_cuadro = req.params.numero_cuadro
    const [results, metadata] = await db.query(`
        select * from cuadro where numero_cuadro = ${numero_cuadro}
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

module.exports = {
  getCuadro
}