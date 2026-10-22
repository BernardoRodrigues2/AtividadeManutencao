// Adicionando um arquivo de relacionamento para relacionar as tabelas 

const Agendamento = require('./Agendamento')
const Cliente = require('./Cliente')
const Console = require('./Console')


Cliente.hasMany(Agendamento, {
    foreignKey: 'idCliente',
    as: 'agendamentoCliente',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Cliente, {
    foreignKey: 'idCliente',
    as: 'clienteAgendamento',
    allowNull: false
})

Console.hasMany(Agendamento, {
    foreignKey: 'idConsole',
    as: 'agendamentoConsole',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Console, {
    foreignKey: 'idConsole',
    as: 'consoleAgendamento',
    allowNull: false
})

Cliente.hasMany(Console, {
    foreignKey: 'idCliente',
    as: 'consoleCliente',
    onDelete: 'CASCADE'
})

Console.belongsTo(Cliente, {
    foreignKey: 'idCliente',
    as: 'clienteConsole',
    allowNull: false
})

module.exports = { Agendamento, Cliente, Console };