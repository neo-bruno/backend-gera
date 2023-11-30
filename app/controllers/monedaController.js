const httpError = require('../helpers/handleError')
const db = require('../../config/db')

const getMonedas = async (req, res) => {
  try {    
    const [results, metadata] = await db.query(`
      select * from moneda
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

module.exports = getMonedas