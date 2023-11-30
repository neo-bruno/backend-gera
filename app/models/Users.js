const Sequelize = require('sequelize')
const db = require('../../config/db')

const Usuario = db.define('usuario',{
    id_usuario: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },    
    username: { type: Sequelize.STRING, allowNull:false},
    cellphone: { type: Sequelize.STRING, allowNull:false},
    password: { type: Sequelize.STRING, allowNull:false},
    id_cargo: { type: Sequelize.INTEGER, allowNull: false}
},
{ timestamps:false }
)

// const Usuario_Cargo = db.define('usuario_cargo',{
//     id_usuario_cargo: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//     id_usuario: {type: Sequelize.INTEGER, allowNull: false },
//     id_cargo: {type: Sequelize.INTEGER, allowNull: false }
// },
// { timestamps:false }
// )

const Cargo = db.define('cargo',{
    id_rol: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    posicion: { type: Sequelize.STRING, allowNull: false},
    nivel: { type: Sequelize.INTEGER, allowNull: true}
},
{ timestamps:false}
);

// Usuario.belongsToMany(Cargo, { through: Usuario_Cargo })
// Cargo.belongsToMany(Usuario, { through: Usuario_Cargo})

// Usuario.belongsToMany(Usuario_Cargo, { foreignKey: 'id_usuario' })
// Cargo.belongsTo(Usuario_Cargo, { foreignKey: 'id_cargo'})

module.exports = {Usuario, Cargo}