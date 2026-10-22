const Cliente = require('../models/Cliente')

const CryptoJS = require('crypto-js')
const Key = 'segredo'

// Foi criado um novo arquivo separado para o funcionamento do controller do modelo Cliente
const cadastrarCliente = async (req, res) => {
    const valores = req.body

    // Verificar se todos os campos foram preenchidos
    if (!valores.nome || !valores.email || !valores.senha || !valores.cpf || !valores.telefone) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    // Verificar se o cpf é válido
    if (valores.cpf.length !== 11) {
        return res.status(400).json({ message: 'O CPF deve conter exatamente 11 dígitos!' })
    }

    try {
        // Criptografia de Cpf e Senha
        const cpfCripto = CryptoJS.AES.encrypt(valores.cpf, Key).toString()
        const senhaCripto = CryptoJS.AES.encrypt(valores.senha, Key).toString()

        await Cliente.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCripto,
            cpf: cpfCripto,
            telefone: valores.telefone
        })

        return res.status(201).json({ message: 'Dados cadastrados com sucesso!' })
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao cadastrar cliente!' })
    }
}

const listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll()

        let resultado = []

        clientes.forEach((el)=>{
            let cpfDescript = ''

            try {
                // Descriptografia do cpf para a listagem
                const bytes = CryptoJS.AES.decrypt(el.cpf, Key)
                cpfDescript = bytes.toString(CryptoJS.enc.Utf8) 

            } catch (err) {
                cpfDescript = 'Erro ao descriptografar'
                console.error(cpfDescript, err)
            }

                resultado.push({
                codCliente: el.codCliente,
                nome: el.nome,
                email: el.email,
                cpf: cpfDescript,
                telefone: el.telefone
            })
        })

        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Erro ao relizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'})
    }
}

// Adicionando a funcionalidade de Consulta de Clientes
const consultarClientes = async (req, res) => {
    const id = req.params.id

    try {
        const cliente = await Cliente.findByPk(id)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado!' })
        }

        // Descriptografia de cpf para a consulta
        const bytes = CryptoJS.AES.decrypt(cliente.cpf, Key)
        console.log('bytes = ',bytes)

        const cpfDescript = bytes.toString(CryptoJS.enc.Utf8)
        console.log('Cpf descriptografado = ',cpfDescript)

        return res.status(200).json({
            codCliente: cliente.codCliente,
            nome: cliente.nome,
            email: cliente.email,
            cpf: cpfDescript,
            telefone: cliente.telefone
        })

    } catch (err) {
        console.error('Erro ao relizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'})
    }
}

// Adiconando a funcionalidade de Atualização de Clientes
const atualizarClientes = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    try {
        const cliente = await Cliente.findByPk(id)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado!' })
        }

        const dadosAtualizados = { ...valores }

        if (valores.cpf) {
            if (valores.cpf.length !== 11) {
                return res.status(400).json({ message: 'O CPF deve conter exatamente 11 dígitos!' })
            }
            dadosAtualizados.cpf = CryptoJS.AES.encrypt(valores.cpf, Key).toString()
        }

        if (valores.senha) {
            dadosAtualizados.senha = CryptoJS.AES.encrypt(valores.senha, Key).toString()
        }

        await Cliente.update(dadosAtualizados, { where: { codCliente: id } })
        return res.status(200).json({ message: 'Cliente atualizado com sucesso!' })

    } catch (err) {
        console.error('Erro ao relizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'})
    }
}

// Adicionando a funcionalidade de Apagar de Clientes
const apagarCliente = async (req, res) => {
    const id = req.params.id

    try {
        const cliente = await Cliente.findByPk(id)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado!' })
        }

        await Cliente.destroy({ where: { codCliente: id } })
        return res.status(200).json({ message: 'Cliente excluído com sucesso!' })
    } catch (err) {
        console.error('Erro ao relizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'})
    }
}

// Adicionando a funcionalidade de consulta por nome dos Clientes
const consultarNome = async (req, res) => {
    const nome = req.params.nome

    try {
        const cliente = await Cliente.findOne({ where: { nome: nome } })

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado!' })
        }

        // Descriptografia do cpf
        const bytes = CryptoJS.AES.decrypt(cliente.cpf, Key)
        const cpfDescript = bytes.toString(CryptoJS.enc.Utf8)

        return res.status(200).json({
            codCliente: cliente.codCliente,
            nome: cliente.nome,
            email: cliente.email,
            cpf: cpfDescript,
            telefone: cliente.telefone
        })
    } catch (err) {
        console.error('Erro ao relizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'})
    }
}


// Foram adicionadas novas funcionalidades de consulta de clientes, atualização de clientes, apagar os clientes e consultar clientes
module.exports = { cadastrarCliente, listarClientes, consultarClientes, atualizarClientes, apagarCliente, consultarNome };