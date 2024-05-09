var cores = ["red","green","blue","yellow","orange"]
var botaoAlterarCor = document.getElementById("botaoAlterarCor")
botaoAlterarCor.addEventListener("click",()=>{
    var body = document.getElementById("body")
    // body.style.backgroundColor = cores[ Math.round( Math.random() * cores.length)]

    var red = Math.round( Math.random() * 255)
    var green = Math.round( Math.random() * 255)
    var blue = Math.round( Math.random() * 255)

    body.style.backgroundColor = "rgb("+red+","+green+","+blue+")"
})