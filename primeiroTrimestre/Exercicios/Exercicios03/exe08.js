var contador = 0
var cores = ["red","green","blue","yellow","orange"]
var divColorida = document.getElementById("divColorida")
divColorida.addEventListener("click",()=>{
    if( contador == cores.length ) contador = 0
    divColorida.style.backgroundColor = cores[ contador ]
    contador++
})