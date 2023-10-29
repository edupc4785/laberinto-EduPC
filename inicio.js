function startGame() {
    canvas.classList.toggle('activo');
    menuPrincipal.classList.toggle('activo');

    conseguirMapa();
    pintarPlayer();
}
