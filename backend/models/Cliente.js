const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Cliente = db.define('cliente', {
    codCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    // A senha quando criptografado precisa de pelo menos 100 caracteres para salvar no banco
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    // O Cpf quando criptografado precisa de pelo menos 100 caracteres para salvar no banco
    cpf: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    // Foi retirado a coluna endereço e colocado a coluna telefone
    telefone: {
        type: DataTypes.STRING(50),
        allowNull: false
    }

}, {
    timestamps: false,
    tableName: 'clientes'
})

module.exports = Cliente;