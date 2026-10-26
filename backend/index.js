const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')

// Carregar os relacionamentos
require('./models/rel')

const authMiddleware = require('./middleware/auth.middleware')

const agendamentoController = require('./controller/agendamento.controller')
const authController = require('./controller/auth.controller')
const clienteController = require('./controller/cliente.controller')
const consoleController = require('./controller/console.controller')

// ================================= MiddleWare ================================

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// =============================================================================

// ================================== Rotas ====================================

// Rotas publicas ---->
app.post('/cliente', clienteController.cadastrarCliente)
app.post('/login', authController.login)

// Teste de rota padrão -->
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API PixelFix Rodando!' })
})


// Rotas Privadas ---->
//O authMiddleware protege as rotas abaixo ->
app.use(authMiddleware)

// Rotas do controller do Clientes -->
app.get('/clientes', clienteController.listarClientes)
app.get('/cliente/:id', clienteController.consultarClientes)
app.put('/cliente/:id', clienteController.atualizarClientes)
app.delete('/cliente/:id', clienteController.apagarCliente)
app.get('/cliente/buscarNome/:nome', clienteController.consultarNome)

//Rotas do controller do Console -->
app.post('/console', consoleController.cadastrarConsole)
app.get('/consoles', consoleController.listarConsoles)
app.get('/console/:id', consoleController.consultarConsole)

// Rotas do controller do Agendamento -->
app.post('/agendamento', agendamentoController.cadastrarAgendamento)
app.get('/agendamentos', agendamentoController.listarAgenda)
app.put('/agendamento/:id', agendamentoController.atualizarAgendamento)


// =============================================================================

// =============================== Server ======================================
conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro ao conectar com o banco de dados!', err)
    })
