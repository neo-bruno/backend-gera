const httpError = require('../helpers/handleError')
const db = require('../../config/db')

const verifyProductDuplicate = async (req, res, next) => {
  try {
    const { codigo, marca, talla, color } = req.body
    const [results, metadata] = await db.query(`
      select * from producto where codigo = '${codigo}' or (marca = '${marca}' and talla = '${talla}' and color = '${color}')
    `)
    console.log(results)

    if(results.length > 0){
      res.status(409).send({
        auth: false,
        message: `El Producto con el codigo: ${codigo}, la marca: ${marca} o talla : ${talla} => YA exite...!`
      })
    }else{
      next()
    }
  } catch (error) {    
    httpError(res, error)
  }
}

module.exports = verifyProductDuplicate