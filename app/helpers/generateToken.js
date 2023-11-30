const jwt = require('jsonwebtoken')

const tokenSign = async (user) => {
  return jwt.sign({
    id_usuario: user.id_usuario,
    username: user.username,
    email: user.email,    
  },
  process.env.JWT_SECRET,
  {
    expiresIn: process.env.EXPIRATION_TIME
  }
  )
}

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)    
  } catch (error) {
    return null
  }
}

const decodeSign = (token) => {
  return jwt.decode(token, null)
}

module.exports = { tokenSign, decodeSign, verifyToken }