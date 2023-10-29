const buttons = [
    {value : 37, name : 'izq'},
    {value : 38, name : 'arriba'},
    {value : 39, name : 'der'},
    {value : 40, name : 'abajo'},
    {value : 87, name : 'arriba'},
    {value : 83, name : 'abajo'},
    {value : 65, name : 'izq'},
    {value : 68, name : 'der'}
]

window.addEventListener('keyup',   (e) => {
    teclaActiva(e.keyCode);
})

function teclaActiva(tecla) {
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].value == tecla) { 
            movimiento(buttons[i].name);
        }
    }
}

function movimiento(direccion) {
    borrarPlayer()

    switch (direccion) {
        case 'arriba':
            validate(player.x,player.y - bloque);
            break;
        case 'abajo':
            validate(player.x,player.y + bloque);
            break;
        case 'izq':
            validate(player.x - bloque,player.y);
            break;
        case 'der':
            validate(player.x + bloque,player.y);
            break;
        default:
            break;
    }
    
    validateWin();
}




