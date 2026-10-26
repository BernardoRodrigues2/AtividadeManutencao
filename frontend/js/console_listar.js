// Adicionando arquivo da funcionalidade de listagem de Consoles
const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn = document.getElementById('btn_listar')

btn.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/consoles', {
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
            console.error('Erro ao listar os consoles:', err)
            resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
        })
})

function criarTbody(dados) {
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codConsole}</td>`
        corpo += `<td>${el.modelo}</td>`
        corpo += `<td>${el.marca}</td>`
        corpo += `<td>${el.numSerie}</td>`
        corpo += `<td>${el.tipo}</td>`
        corpo += `<td>${el.idCliente}</td>`
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
                <th>Modelo</th>
                <th>Marca</th>
                <th>Número de Série</th>
                <th>Tipo</th>
                <th>Código do Cliente</th>
            </tr>
        </thead>
    `
}
