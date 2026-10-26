const Agendamento = require('../models/Agendamento')
const Cliente = require('../models/Cliente')
const Console = require('../models/Console')

// Foi criado um novo arquivo separado para o funcionamento do controller do modelo Agendamento
const cadastrarAgendamento = async (req, res) => {
    const valores = req.body

    // Verificação do preenchimento dos campos
    if (!valores.data || !valores.hora || !valores.tipoServico || !valores.idCliente || !valores.idConsole) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {
        // Verificação se o Cliente existe
        const cliente = await Cliente.findByPk(valores.idCliente)
        if(!cliente){
            return res.status(404).json({ message: 'Cliente não encontrado!'})
        }

        // Verificação se o Console existe
        const console = await Console.findByPk(valores.idConsole)
        if(!console){
            return res.status(404).json({ message: 'Console não encontrado'})
        }

        // Cadastrar o Agendamento
        const novoAgendamento = await Agendamento.create(valores)
        return res.status(201).json({ message: 'Agendamento registrado com sucesso!', agendamento: novoAgendamento })
        
    } catch (err) {
        console.error('Erro ao realizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'}) 
    }
}

// Adicionando a funcionalidade de Atualização de Agendamentos
const atualizarAgendamento = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    try {
        const agendamento = await Agendamento.findByPk(id)

        // Verificação se o Agendamento existe
        if (!agendamento) {
            return res.status(404).json({ message: 'Agendamento não encontrado!' })
        }

        // Verificação se o Cliente existe
        if (valores.idCliente) {
            const cliente = await Cliente.findByPk(valores.idCliente)
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente informado não existe!' })
            }
        }

        // Verificação se o Console existe
        if (valores.idConsole) {
            const console = await Console.findByPk(valores.idConsole)
            if (!console) {
                return res.status(404).json({ message: 'Console informado não existe!' })
            }
        }

        // Atualizar os valores do Agendamento
        await Agendamento.update(valores, { where: { codAgendamento: id } })
        return res.status(200).json({ message: 'Agendamento atualizado com sucesso!' })
    } catch (err) {
        console.error('Erro ao atualizar agendamento:', err)
        return res.status(500).json({ message: 'Erro ao atualizar agendamento!' })
    }
}


// Adicionando a funcionalidade de listagem de Agendamentos
const listarAgenda = async (req, res) => {
    try {
        const agendamentos = await Agendamento.findAll({
            order: [['data', 'ASC']],
            include: [
                {
                    model: Cliente,
                    as: 'clienteAgendamento',
                    attributes: ['codCliente', 'nome', 'email', 'telefone']
                },
                {
                    model: Console,
                    as: 'consoleAgendamento',
                    attributes: ['codConsole', 'modelo', 'marca', 'tipo']
                }
            ]
        })

        return res.status(200).json(agendamentos)
    } catch (err) {
        console.error('Erro ao realizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'}) 
    }
}

module.exports = { cadastrarAgendamento, atualizarAgendamento, listarAgenda };
