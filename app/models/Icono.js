const Sequelize = require('sequelize')
const db = require('../../config/db')

const Icono = db.define('icono',{
    id_icono: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },    
    nombre: { type: Sequelize.STRING, allowNull:false},
    tipo: { type: Sequelize.STRING, allowNull:false}
},
{ timestamps:false }
)

module.exports = {Icono }