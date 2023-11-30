const { verifyToken } = require('../helpers/generateToken')  
const httpError  = require('../helpers/handleError')

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ').pop()
    const tokenData = await verifyToken(token)
    if(tokenData){
      next()
    }else{
      res.status(409)
      res.send({ error: 'Error en la autorizacion del token'})
    }
  } catch (error) {
    httpError(res, error)
  }
}

module.exports = verifyUser