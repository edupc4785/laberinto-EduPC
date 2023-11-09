function dibujarMuros() {
    for (let i = 0; i < muros.length; i++) {
        //Verificar Izquierda
        if(muros[i].x == 0 || esMuro(muros[i].x - bloque, muros[i].y)){
            muros[i].ubicacion += '1';
        }
        //Verificar Arriba
        if(muros[i].y == 0 || esMuro(muros[i].x, muros[i].y - 50)){
            muros[i].ubicacion += '2';
        }
        //Verificar Abajo
        if(muros[i].y == height - bloque || esMuro(muros[i].x, muros[i].y + 50)){
            muros[i].ubicacion += '3';
        }
        //Verificar Derecha
        if(muros[i].x == width - bloque || esMuro(muros[i].x + 50, muros[i].y)){
            muros[i].ubicacion += '4';
        }
    }

    for (let i = 0; i < muros.length; i++) {
        console.log(muros[i].ubicacion, muros[i].ubicacion.length)
        switch (muros[i].ubicacion.length){
            case 0:
                muros[i].image.src = './assets/uni_centro.png';
                break;
            case 1:
                definir1(muros[i]);
                break;
            case 2:
                definir2(muros[i]);
                break;
            case 3:
                definir3(muros[i]);
                break;
            case 4:
                muros[i].image.src = './assets/centro.png'
                break;
        }
    }

    for (let i = 0; i < muros.length; i++) {
        muros[i].image.onload = () => {
            ctx.drawImage(muros[i].image, muros[i].x, muros[i].y, bloque, bloque);
        };
    }
}

function definir1(muro) {
    let ubicacionMuro = muro.ubicacion;

    switch (ubicacionMuro) {
        case '1':
            muro.image.src = './assets/Esq_Hor_Der.png'
            break;
        case '2':
            muro.image.src = './assets/Esq_Ver_Aba.png'
            break;
        case '3':
            muro.image.src = './assets/Esq_Ver_Arri.png'
            break;
        case '4':
            muro.image.src = './assets/Esq_Hor_Izq.png'
            break;
    }
}

function definir2(muro) {
    let ubicacionMuro = muro.ubicacion;

    switch (ubicacionMuro) {
        case '12':
            muro.image.src = './assets/Aba_Der.png';
            break;
        case '13':
            muro.image.src = './assets/Sup_Der.png';
            break;
        case '14':
            muro.image.src = './assets/Uni_Med_Hor.png';
            break;
        case '23':
            muro.image.src = './assets/Uni_Med_Vert.png';
            break;
        case '24':
            muro.image.src = './assets/Aba_Izq.png';
            break;
        case '34':
            muro.image.src = './assets/Sup_Izq.png';
            break;
    }
}

function definir3(muro) {
    let ubicacionMuro = muro.ubicacion;

    switch (ubicacionMuro) {
        case '123':
            muro.image.src = './assets/Med_Der.png';
            break;
        case '124':
            muro.image.src = './assets/Med_Aba.png';
            break;
        case '134':
            muro.image.src = './assets/Med_Sup.png';
            break;
        case '234':
            muro.image.src = './assets/Med_Izq.png';
    }
    
}

function esMuro(x, y) {
    for (let i = 0; i < muros.length; i++) {
        if (muros[i].x == x && muros[i].y == y) {
            return true;
        }
    }
    return false;
}