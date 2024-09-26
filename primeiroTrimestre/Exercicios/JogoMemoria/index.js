const numeroPares = 5
const baralho = []
let pontuacao = 0
let cartasViradas = []
let paresEncontrados = 0
let podeVirar = true

for (let i = 1; i <= numeroPares; i++) {
    baralho.push(i)
    baralho.push(i)
}

baralho.sort(() => Math.random() - 0.5)

const gameBoard = document.getElementById('gameBoard');
for (let i = 0; i < baralho.length; i++) {
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.value = baralho[i]
    card.addEventListener('click', virarCarta)
    card.style.border = '1px solid rgba(0,0,0,0)'
    card.style.backgroundImage = buscarImagemFundo('?')
    gameBoard.appendChild(card)
}

function buscarImagemFundo( id ){
    var valor = ''
    switch (id) {
        case '?':
            valor = "url('./verso.png')"
            break;
        case '1':
            valor = "url('./coelho.png')"
            break;
        case '2':
            valor = "url('./cachorro.png')"
            break;
        case '3':
            valor = "url('./gato.png')"
            break;
        case '4':
            valor = "url('./peixe.png')"
            break;
        case '5':
            valor = "url('./passaro.png')"
            break;
        default:
            valor = "url('./verso.png')"
            break;
    
    }
    return valor
}

function virarCarta() {
    if (!podeVirar) return;
    const card = this;
    if (cartasViradas.length < 2 && !cartasViradas.includes(card)) {
        card.style.backgroundImage = buscarImagemFundo( card.dataset.value )
        card.style.border = '1px solid black'
        cartasViradas.push(card);
    }
    if (cartasViradas.length == 2) {
        podeVirar = false;
        setTimeout(verificarPar, 1000);
    }
}

function verificarPar() {
    const value1 = cartasViradas[0].dataset.value;
    const value2 = cartasViradas[1].dataset.value;
    if (value1 == value2) {
        pontuacao++;
        paresEncontrados++;
        document.getElementById('pontuacao').innerText = "Pontuação: " + pontuacao;
        cartasViradas = [];
        if (paresEncontrados === numeroPares) {
            document.getElementById('mensagem').textContent = 'Parábens! Você ganhou!';
        }
    } else {
        cartasViradas.forEach(card => {
            card.style.border = '1px solid rgba(0,0,0,0)'
            card.style.backgroundImage = buscarImagemFundo('?')
        });
        cartasViradas = [];
    }
    podeVirar = true;
}