const URL_LOGIN = "http://localhost:3000/auth/login/"

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('formulario')
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const formData = new FormData(form);
        const data = {
            "email": formData.get('email'),
            "password":formData.get('password')
        }

        console.log(data)
        enviaPOST( data )
    })
})


function enviaPOST( data ){
    var options = {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data),
        credentials: 'include' // Para enviar e receber cookies
    }
    var status = 0
    fetch(URL_LOGIN,options)
    .then(function(response){
        status = response.status
        return response.json()
    }).then( function(data){
        if (status == 422) {
            if( data != undefined ){
                var mensagemErro = document.getElementById("mensagemErro")
                mensagemErro.innerText = data.msg
                mensagemErro.style.display = "block"
            }
        }else if(status == 200 ) {
            localStorage.setItem('id',data.id)
            window.location.href = "index.html"
        }
    })
    .catch(function(error){
        console.log(error)
    })
}