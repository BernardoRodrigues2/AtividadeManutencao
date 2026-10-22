// Adicionando arquivo de sincronia entre as tabelas

const { Agendamento, Cliente, Console } = require('./models/rel')
const conn = require('./db/conn')

async function syncDataBase() {
    try {
        await conn.sync({ force: true })
        console.log('Tabelas sincronizadas com sucesso!')
    } catch (err) {
        console.error('Erro ao sincronizar as tabelas')
    }finally{
        await conn.close()
        console.log('Fechando a conexão com o banco de dados!')
    }
}

syncDataBase()