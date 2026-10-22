const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Console = db.define('console', {
    codConsole: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    modelo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    marca: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    // O numSerie quando criptografado precisa de pelo menos 100 caracteres para salvar no banco
    numSerie: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    tipo: {
        type: DataTypes.STRING(40),
        allowNull: false
    },

    // Foreign Key para o relacionamento entre as tabelas Console e Cliente
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'codCliente'
        }
    }

}, {
    timestamps: false,
    tableName: 'consoles'
})

module.exports = Console;