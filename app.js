let numeroSecreto = 0;
let intentos = 0;
let numerosSorteados = [];
let numeroMaximo = 10;

condicionesIniciales();

function condicionesIniciales() {
  asignarTextoElemento("h1", "Juego del numero secreto");
  asignarTextoElemento("p", `Indica un numero entre 1 y ${numeroMaximo}`);
  //generar nuevo numero secreto
  numeroSecreto = generarNumeroSecreto(1, 10);

  //iniciar contador de intentos
  intentos = 1;
}

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
}

function generarNumeroSecreto(min, max) {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

  console.log(numeroGenerado);
  console.log(numerosSorteados);
  //si ya sorteamos todos los numeros
  if (numerosSorteados.length === numeroMaximo) {
    asignarTextoElemento("p", "Todos los números han sido sorteados, reinicia el juego");
    document.getElementById("reiniciar").removeAttribute("disabled");
    return;
  } else {
    //si el numero generado ya fue sorteado
    if (numerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto(min, max); //volver a intentar
    } else {
      // sino agregarlo al array de numeros sorteados
      numerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

function verificarIntento() {
  let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);

  if (numeroDeUsuario === numeroSecreto) {
    asignarTextoElemento(
      "p",
      `Ganaste! en ${intentos} ${intentos === 1 ? "intento" : "intentos"}`
    );
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (numeroDeUsuario > numeroSecreto) {
      asignarTextoElemento("p", "El numero secreto es menor");
    } else {
      asignarTextoElemento("p", "El numero secreto es mayor");
    }
    intentos++;
    limpiarCaja();
  }

  return;
}

function limpiarCaja() {
  let valorCaja = document.querySelector("#valorUsuario");
  valorCaja.value = "";
}

function reiniciarJuego() {
  limpiarCaja();

  condicionesIniciales();

  //desactivar boton reiniciar

  document.querySelector("#reiniciar").setAttribute("disabled", true);
}
