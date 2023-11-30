const httpError = require('../helpers/handleError')
const userModel = require('../models/Users')

const verifyEmailDuplicate = async (req, res, next) => {
  try {
    const {username, cellphone} = req.body
    const userData = await userModel.Usuario.findOne({
      where: {        
        cellphone
      }
    })
    console.log('el usuario data es: ', userData)
    if(userData){
      res.status(409).send({
        auth: false,
        message: `El usuario ${username} con el numero de telefono celular YA EXITE...! (Pruebe con Otro telefono)`
      })
    }else{
      next()
    }
  } catch (error) {    
    httpError(res, error)
  }
}

module.exports = verifyEmailDuplicate