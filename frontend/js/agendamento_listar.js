// Adicionando arquivo de funcionalidade de listagem Agendamentos
const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn = document.getElementById('btn_listar')

btn.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/agendamentos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(res => res.json())
        .then(dados => {
            resposta.innerHTML = `
                <table>
                    ${criarThead()}
                    ${criarTbody(dados)}
                </table>
            `
        })
        .catch(err => {
            console.error('Erro ao listar os agendamentos:', err)
            resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
        })
})

function criarTbody(dados) {
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codAgendamento}</td>`
        corpo += `<td>${el.data}</td>`
        corpo += `<td>${el.hora}</td>`
        corpo += `<td>${el.tipoServico}</td>`
        corpo += `<td>${el.clienteAgendamento.nome}</td>`
        corpo += `<td>${el.consoleAgendamento.modelo}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    return `
        <thead>
            <tr>
                <th>Código</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Tipo de Serviço</th>
                <th>Cliente</th>
                <th>Console</th>
            </tr>
        </thead>
    `
}
