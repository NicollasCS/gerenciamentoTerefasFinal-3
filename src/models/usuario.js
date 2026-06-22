const database = require(`../config/database`)
const {DataTypes} = require("sequelize")

const Usuario = database.define("Usuario", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    accessKey: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timeLife: {
        type: DataTypes.DATE,
    },
    token: {
        type: DataTypes.STRING
    }
},
{
    tableName: 'usuario',
    timestamps: true
})

Usuario.sync({alter: true})

module.exports = Usuario
