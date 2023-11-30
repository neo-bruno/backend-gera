const Sequelize = require('sequelize')
const db = require('../../config/db')

const Archivo = db.define('archivo',{
    id_archivo: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },    
    nombre: { type: Sequelize.STRING, allowNull:false},
    url: { type: Sequelize.STRING, allowNull:false},
    link: { type: Sequelize.STRING, allowNull:false},
},
{ timestamps:false }
)

module.exports = {Archivo }