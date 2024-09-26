const URL_AUTH = "http://localhost:3000/auth/register/"

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('formulario')
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const formData = new FormData(form);
        const data = {
            "name": formData.get('name'),
            "email": formData.get('email'),
            "password":formData.get('password'),
            "confirmPassword":formData.get('confirmPassword'),
        }

        console.log(data)
        enviaPOST( data )
    })
})

function enviaPOST( data ){
    var header = {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    }
    fetch(URL_AUTH,header)
    .then(function(response){
        if (!response.ok && response.status === 422) {
            return response.json();            
        }else if(response.ok && response.status == 201 ) {
            window.location.href = "login.html"
        }
    }).then(function(data){
        console.log(data)
    }).catch(function(error){
        console.log(error)
    })
}