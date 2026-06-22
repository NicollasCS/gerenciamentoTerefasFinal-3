const database = require(`../config/database`)
const {DataTypes} = require("sequelize")
const Usuario = require("./usuario")

const Tarefa = database.define("Tarefa", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('criado', 'em_desenvolvimento', 'concluido'),
        defaultValue: 'criado'
    },
    usuarioID: {
        type: DataTypes.INTEGER,
        references: {
            model: "usuario",
            key: "id" 
        }
    }
},
{
    tableName: 'tarefa',
    timestamps: true
})

Tarefa.sync({alter: true})

module.exports = Tarefa
