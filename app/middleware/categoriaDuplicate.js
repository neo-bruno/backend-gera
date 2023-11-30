const httpError = require('../helpers/handleError')
const db = require('../../config/db')

const verifyCategoriaDuplicate = async (req, res, next) => {
  try {
    const { nombre } = req.body
    const [results, metadata] = await db.query(`
      select * from categoria where nombre = '${nombre}'
    `)    
    console.log(results)

    if(results.length > 0){
      res.status(409).send({
        auth: false,
        message: 'La categoria YA exite...!'
      })
    }else{
      next()
    }
  } catch (error) {    
    httpError(res, error)
  }
}

module.exports = verifyCategoriaDuplicate