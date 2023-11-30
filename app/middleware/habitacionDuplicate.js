const httpError = require('../helpers/handleError')
const db = require('../../config/db')

const verifyRoomDuplicate = async (req, res, next) => {
  try {
    const { nombre, titulo, numero } = req.body
    const [results, metadata] = await db.query(`
        select * from habitacion where nombre = '${nombre}'
    `)
    console.log(results)

    if (results.length > 0) {
      res.status(409).send({
        auth: false,
        message: `La HABITACION ${nombre}  YA exite y NO PUEDE HABER DUPLICADOS...!`
      })
    } else {
      next()
    }
  } catch (error) {
    httpError(res, error)
  }
}

module.exports = verifyRoomDuplicate