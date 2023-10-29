const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const menuPrincipal = document.getElementById('menuPrincipal');
const selectOptions = document.getElementById('selectMap');

const width = canvas.width = 500;
const height = canvas.height = 500;

const bloque = 50;
const tileCount = width / bloque;

let crash = false;
let murosLleno = false;

let muros = [];
let mapaElegido;

//Declaracion de mapas
let mapaCoords = [ 
    {nombre : ["laberinto1"],tiles : [[1,2,3,4,5,6,7,8,9],[4,9],[0,2,4,6,7,9],[0,2,6,9],[0,2,3,4,6,8,9],[0,4,5,6,9],[0,1,2,4,6,7,8,9],[0,9],[0,1,3,4,5,6,7,9],[0,1,3,4,5,7]]},
    {nombre : ["laberinto2"],tiles : [[],[]]},
    {nombre : ["laberinto3"],tiles : [[],[]]}
];
let meta = {color : 'lightblue', x: (tileCount-1)*bloque, y: (tileCount-1)*bloque};
let player = {x: 0, y: 0};



function conseguirMapa() {
    mapaElegido = selectOptions.options[selectOptions.selectedIndex].value;
    pintarMapa(mapaElegido); 
    pintarMeta();
}

//Pintar mapa segun cual sea el elegido
function pintarMapa(eleccion) {

    //Mapa
    for (let i = 0; i < mapaCoords.length; i++) {
        if (eleccion == mapaCoords[i].nombre) {
            for (let j = 0; j < mapaCoords[i].tiles.length; j++) {
                ctx.fillStyle = 'green';
                for (let k = 0; k < mapaCoords[i].tiles[j].length; k++) {
                    ctx.fillRect(mapaCoords[i].tiles[j][k]*bloque,j*bloque,bloque,bloque);
                    pushMuros({x: mapaCoords[i].tiles[j][k]*bloque, y: j*bloque});
                }
            }
            murosLleno = true;
            break;
        }
    }

    //Formacion de malla de cuadros
    for (let i = 0; i < width; i += bloque) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
    }

    for (let i = 0; i < height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
    }
}

function pintarMeta() {
    //Meta
    ctx.fillStyle = meta.color;
    ctx.fillRect(meta.x,meta.y,bloque,bloque);
}

function pintarPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x,player.y,bloque,bloque);

    pintarMapa(mapaElegido);
}

function borrarPlayer() {
    ctx.clearRect(player.x,player.y,bloque,bloque);
}

function pintarPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x,player.y,bloque,bloque);

    pintarMapa(mapaElegido);
}

function validateWin() {
    if (player.x == meta.x && player.y == meta.y) {
        playerWin();
    }
}

function validate(x, y) {
    if (x >= width || y >= height || x < 0 || y < 0) {
        debugger;
        crash = true;
        playerCrash();
    } else{
        for (let i = 0; i < muros.length; i++) {
            if (x == muros[i].x && y == muros[i].y) {
            crash = true;
            playerCrash();
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
        pintarPlayer();
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
    window.location.reload();
}

function pushMuros(muro) {
    if (murosLleno){
        return;
    } else {
        muros.push(muro);
    }
}

//mostrar el menuPrincipal al cargar la pagina
window.onload = () => {
    menuPrincipal.classList.toggle('activo');
}