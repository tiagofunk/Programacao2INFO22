const URL_USER = "http://localhost:3000/user/"
const URL_LOGOUT = "http://localhost:3000/logout/"

lerUsuario( localStorage.getItem('id') )

function lerUsuario( id ){
    var options = {
        method:"GET",
        headers:{"Content-Type":"application/json"},
        credentials: 'include' // Para enviar e receber cookies
    }
    
    let status = 0
    fetch(URL_USER+id,options)
    .then(function(response){
        status = response.status
        return response.json()
    }).then( function(data){
        var info = document.getElementById('info')
        if(status == 200 ) {
            info.innerHTML = `<p>${data.id}</p><p>${data.nome}</p><p>${data.email}</p>`
        }else{
            console.log(data);
            
            info.innerHTML = `<p>${data.msg}</p>`
        }
    })
    .catch(function(error){
        console.log(error)
    })
}

var botaoLogout = document.getElementById("botaoLogout")
botaoLogout.addEventListener("click",function(){
    var options = {
        method:"GET",
        headers:{"Content-Type":"application/json"},
        credentials: 'include' // Para enviar e receber cookies
    }
    
    let status = 0
    
    fetch(URL_LOGOUT,options)
    .then(function(response){
        status = response.status
        return response.json()
    }).then( function(data){
        var info = document.getElementById('info')
        if(status == 200 ) {
            window.location.href = 'index.html'
        }else{
            info.innerHTML = `<p>${data.msg}</p>`
        }
    })
    .catch(function(error){
        console.log(error)
    })
})