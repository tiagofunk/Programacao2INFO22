const URL_API = 'http://localhost:3000/professor/'

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('cadastro')
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const formData = new FormData(form);
        const data = {
            "nome": formData.get('nome'),
            "titulacao": formData.get('titulacao'),
            "regimeTrabalho":formData.get('regimeTrabalho')
        };

        fetch(URL_API, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            window.location.href = './professores.html';
        })
        .catch(error => {
            alert('Erro: ' + error.message);
        });
    });
});