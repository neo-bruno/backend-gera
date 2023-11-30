const { httpError } = require('../helpers/handleError')
const userModel = require('../models/Users')

const getUsers = (req, res) => {
  res.send({ list: [1,2,3]})
}
const getUser = (req, res) => {

}
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const resUser = await userModel.Usuario.create({
      username, email, password
    })
    res.send({ data: resUser })

  } catch (error) {
    httpError(res, error)
  }
}
const updateUser = (req, res) => {

}
const deleteUser = (req, res) => {

}

module.exports = {
  createUser, getUser, getUsers, updateUser, deleteUser
}