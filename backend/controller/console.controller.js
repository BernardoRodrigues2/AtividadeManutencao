const Console = require('../models/Console')
const Cliente = require('../models/Cliente')

const CryptoJS = require('crypto-js')
const Key = 'segredo'

// Foi criado um novo arquivo separado para o funcionamento do controller do modelo Console
const cadastrarConsole = async (req, res) => {
    const valores = req.body

    // Verificação do preenchimento dos campos 
    if (!valores.modelo || !valores.marca || !valores.numSerie || !valores.tipo || !valores.idCliente) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {
        const cliente = await Cliente.findByPk(valores.idCliente)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente informado não existe!' })
        }

        const numSerieCripto = CryptoJS.AES.encrypt(valores.numSerie, Key).toString()

        await Console.create({
            modelo: valores.modelo,
            marca: valores.marca,
            numSerie: numSerieCripto,
            tipo: valores.tipo,
            idCliente: valores.idCliente
        })

        return res.status(201).json({ message: 'Dados cadastrados com sucesso!'})
    } catch (err) {
        console.error('Erro ao relizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'})
    }
}

// Implementando funcionalidade de consulta de Console
const consultarConsole = async (req, res) => {
    const id = req.params.id

    try {
        const console = await Console.findByPk(id)

        if (!console) {
            return res.status(404).json({ message: 'Console não encontrado!' })
        }

        // Descriptografia do número de série
        const bytes = CryptoJS.AES.decrypt(console.numSerie, Key)
        const numSerieDescript = bytes.toString(CryptoJS.enc.Utf8)

        return res.status(200).json({
            codConsole: console.codConsole,
            modelo: console.modelo,
            marca: console.marca,
            numSerie: numSerieDescript,
            tipo: console.tipo,
            idCliente: console.idCliente
        })

    } catch (err) {
        console.error('Erro ao realizar operação!', err)
        return res.status(500).json({ message: 'Erro ao realizar operação!' })
    }
}

// Implementando funcionalidade de consulta de Console
module.exports = { cadastrarConsole, consultarConsole };