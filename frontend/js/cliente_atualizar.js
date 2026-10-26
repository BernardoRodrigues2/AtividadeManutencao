// Adicionando arquivo da funcionalidade de atualização de cliente
const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const btn = document.getElementById('btn_atualizar')
const resposta = document.getElementById('resposta')

btn.addEventListener('click', (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value
    const valores = {}

    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const cpf = document.getElementById('cpf').value
    const telefone = document.getElementById('telefone').value

    if (nome) valores.nome = nome
    if (email) valores.email = email
    if (senha) valores.senha = senha
    if (cpf) valores.cpf = cpf
    if (telefone) valores.telefone = telefone

    fetch(`http://localhost:3000/cliente/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })
        .then(res => res.json())
        .then(dados => {
            resposta.innerHTML = `<p>${dados.message}</p>`
            document.querySelector('form').reset()
        })
        .catch(err => {
            console.error('Erro ao atualizar cliente:', err)
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
        })
})
