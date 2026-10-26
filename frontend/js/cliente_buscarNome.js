// Adicionando arquivo da funcionalidade de consulta de cliente por nome
const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const btn = document.getElementById('btn_buscar')
const resposta = document.getElementById('resposta')

btn.addEventListener('click', (e) => {
    e.preventDefault()

    const nome = document.getElementById('nome').value

    fetch(`http://localhost:3000/cliente/buscarNome/${nome}`, {
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
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>CPF</th>
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${dados.codCliente}</td>
                            <td>${dados.nome}</td>
                            <td>${dados.email}</td>
                            <td>${dados.cpf}</td>
                            <td>${dados.telefone}</td>
                        </tr>
                    </tbody>
                </table>
            `
        })
        .catch(err => {
            console.error('Erro ao buscar cliente:', err)
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
        })
})
