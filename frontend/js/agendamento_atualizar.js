// Adicionando arquivo de funcionalidade de atualização de Agendamento
const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const btn = document.getElementById('btn_atualizar')
const resposta = document.getElementById('resposta')

btn.addEventListener('click', (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    const valores = {
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        tipoServico: document.getElementById('tipoServico').value
    }

    fetch(`http://localhost:3000/agendamento/${id}`, {
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
            console.error('Erro ao atualizar agendamento:', err)
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
        })
})
