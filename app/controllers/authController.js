const { tokenSign } = require('../helpers/generateToken')
const { compare, encrypt } = require('../helpers/handleBcrypt')
const httpError = require('../helpers/handleError')
const userModel = require('../models/Users')
const db = require('../../config/db')

const login = async (req, res) => {
  try {
    const { cellphone, password } = req.body
    console.log(cellphone, password)
    const user = await userModel.Usuario.findOne({
      where: {
        cellphone
      }
    })
    console.log('el usuario es: ', user)

    if(user == null){
      res.status(404)
      res.send({ error: 'Usuario no Encontrado'})
      return
    }else{
      const checkPassword = await compare(password, user.password)
  
      const tokenSession = await tokenSign(user)
  
      if(checkPassword){
        res.status(201).send({
          data: user,
          tokenSession
        })
        return
      }
  
      if(!checkPassword){
        res.status(409).send({
          error: 'password no es Valido'
        })
        return
      }
    }    

  } catch (error) {
    httpError(res, error)
  }
}

const register = async (req, res) => {
  try {
    const {username, cellphone, password, id_cargo } = req.body
    const passwordHash = await encrypt(password)
    const registerUser = await userModel.Usuario.create({
      username,
      cellphone,
      password: passwordHash,
      id_cargo
    })
    if(registerUser){
      const [results, metadata] = await db.query(`
        INSERT INTO public.huesped(
        nombre, apellidos, numero_documento, fecha_nacimiento, estado_civil, profesion, pais, ciudad, direccion, telefono, nivel_personalidad, estado_huesped, id_usuario)
        VALUES ('${registerUser.username.toLowerCase()}', '', '', null, '', '', '', '', '', '', 1, 1, ${registerUser.id_usuario});
      `)
    }
    res.status(200).send({
      data: registerUser
    })
  } catch (error) {
    httpError(res, error)
  }
}

module.exports = { login, register }