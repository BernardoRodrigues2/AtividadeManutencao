// Adicionando arquivo da funcionalidade de consulta de Console
const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const btn = document.getElementById('btn_consultar')
const resposta = document.getElementById('resposta')

btn.addEventListener('click', (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/console/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(res => res.json())
        .then(dados => {
            if (dados.message) {
                resposta.innerHTML = `<p>${dados.message}</p>`
                return
            }

            resposta.innerHTML = `
                <table>
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
                    <tbody>
                        <tr>
                            <td>${dados.codConsole}</td>
                            <td>${dados.modelo}</td>
                            <td>${dados.marca}</td>
                            <td>${dados.numSerie}</td>
                            <td>${dados.tipo}</td>
                            <td>${dados.idCliente}</td>
                        </tr>
                    </tbody>
                </table>
            `
        })
        .catch(err => {
            console.error('Erro ao consultar console:', err)
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
        })
})
