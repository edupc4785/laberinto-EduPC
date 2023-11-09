const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

const menuPrincipal = document.getElementById('menuPrincipal');
const menuJuego = document.getElementById('juegoMapa');
const spanNivel = document.getElementById('nivel');

const width = canvas.width = 500;
const height = canvas.height = 500;

const bloque = 50;
const tileCount = width / bloque;

let crash = false;
let murosLleno = false;

let muros = [];
let mapasOrden = [];
let numLevel = 1

//Declaracion de mapas
let mapaCoords = [ 
    {nombre : "laberinto1",tiles : [[1,2,3,4,5,6,7,8,9],[4,9],[0,2,4,6,7,9],[0,2,6,9],[0,2,3,4,6,8,9],[0,4,5,6,9],[0,1,2,4,6,7,8,9],[0,9],[0,1,3,4,5,6,7,9],[0,1,3,4,5,6,7]]},
    {nombre : "laberinto2",tiles : [[2],[0,2,4,6,7,8],[4,8],[1,2,3,4,5,6,7,8],[0,1],[3,5,7,8,9],[1,2,3,5,7],[1,5,9],[1,3,4,5,6,7,8,9],[1]]},
    {nombre : "laberinto3",tiles : [[2],[0,2,4,5,6,8],[2,6,7,8],[1,2,4,5,6],[2,4,6,7,8,9],[0,2,4],[2,6,7,8],[1,2,4,5,6],[1,4,6,8,9],[3,4]]},
    {nombre: "laberinto4", tiles : [[2,8],[0,2,4,5,6,8],[0,6],[0,1,2,3,4,6,7,8],[4,8,9],[1,2,4,5,6,8],[2,8],[0,2,3,4,5,6,7,8],[0,2,6],[0,4,8]]}
];

class objeto {
    constructor(imagen, x, y) {
        this.image = new Image;
        this.image.src = imagen;
        this.x = x;
        this.y = y;
    }

    pintarObjeto() {
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            bloque,
            bloque
        )
    }
}

let meta = new objeto(`./assets/diamante.png`, (tileCount-1)*bloque, (tileCount-1)*bloque);
let player = new objeto(`./assets/player.png`, 0, 0);

function definirMapas() {
    let lista  = [];
    for (let i = 0; i < 3; i++) {
        let numAleat = Math.floor(Math.random() * mapaCoords.length);
        if (!lista.includes(numAleat)) {
            mapasOrden.push(numAleat);
            lista.push(numAleat)
        } else {
            i--;
        }
    }
}


//Pintar mapa segun cual sea el elegido
function pintarMapa() {
    ctx.clearRect(0,0,width,height);
    spanNivel.innerHTML = `Nivel ${numLevel}`;
    let mapa = mapasOrden[numLevel-1];
    for (let j = 0; j < mapaCoords[mapa].tiles.length; j++) {
        for (let k = 0; k < mapaCoords[mapa].tiles[j].length; k++) {
            muros.push({x: mapaCoords[mapa].tiles[j][k]*bloque, y: j*bloque, ubicacion: '', image: new Image});
        }
    }

    dibujarMuros();
    pintarMeta();
}
function pintarMeta() {
    meta.pintarObjeto();
}

function pintarPlayer() {
    player.pintarObjeto();

    validateWin();
}

function borrarPlayer() {
    ctx.clearRect(player.x,player.y,bloque,bloque);
}

function validateWin() {
    if (player.x == meta.x && player.y == meta.y) {
        playerWin();
    }
}

function validate(x, y) {
    if (x >= width || y >= height || x < 0 || y < 0) {
        crash = true;
    } else{
        for (let i = 0; i < muros.length; i++) {
            if (x == muros[i].x && y == muros[i].y) {
                crash = true;
                break;
            } else {
                crash = false;
            }
        }
    }

    if (!crash) {
        player.x = x;
        player.y = y;
        pintarPlayer();
    } else {
        playerCrash();
    }

}

function playerCrash() {
    alert('Game Over');
    player.x = 0;
    player.y = 0;
    pintarPlayer();
}

function playerWin() {
    alert('Ganaste!!');
    siguienteNivel();
}

function siguienteNivel() {
    numLevel++;
    if (numLevel <= 3) {
        player.x = 0;
        player.y = 0;
        muros = [];
        pintarMapa();
        pintarPlayer();
    }
}

//mostrar el menuPrincipal al cargar la pagina
window.onload = () => {
    menuPrincipal.classList.toggle('activo');
}