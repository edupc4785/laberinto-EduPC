function startGame() {
    menuJuego.classList.toggle('activo');
    menuPrincipal.classList.toggle('activo');

    definirMapas();
    pintarMapa();
    pintarPlayer();
}
