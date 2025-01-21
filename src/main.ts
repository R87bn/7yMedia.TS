const MAX_PUNTUACION = 7.5;
let puntuacionActual = 0;
let gameOver = false;
let simulacionUsada = false;

interface Carta {
  value: number;
  img: string;
}

const cartas: Carta[] = [
  {
    value: 1,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg",
  },
  {
    value: 2,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg",
  },
  {
    value: 3,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg",
  },
  {
    value: 4,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg",
  },
  {
    value: 5,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg",
  },
  {
    value: 6,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg",
  },
  {
    value: 7,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg",
  },
  {
    value: 0.5,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg",
  },
  {
    value: 0.5,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg",
  },
  {
    value: 0.5,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg",
  },
];

const scoreElement = document.getElementById("puntuacion");
if (!(scoreElement instanceof HTMLSpanElement)) {
  throw new Error("El elemento con id 'puntuacion' no es un HTMLSpanElement");
}

const cardImage = document.getElementById("img-cartas");
if (!(cardImage instanceof HTMLImageElement)) {
  throw new Error("El elemento con id 'img-cartas' no es un HTMLImageElement");
}

const messageElement = document.getElementById("mensaje");
if (!(messageElement instanceof HTMLDivElement)) {
  throw new Error("El elemento con id 'mensaje' no es un HTMLDivElement");
}

const btnPedir = document.getElementById("btn-pedir");
if (!(btnPedir instanceof HTMLButtonElement)) {
  throw new Error("El elemento con id 'btn-pedir' no es un HTMLButtonElement");
}

const btnPlantarse = document.getElementById("btn-plantarse");
if (!(btnPlantarse instanceof HTMLButtonElement)) {
  throw new Error(
    "El elemento con id 'btn-plantarse' no es un HTMLButtonElement"
  );
}

const btnNuevaPartida = document.getElementById("btn-nueva-partida");
if (!(btnNuevaPartida instanceof HTMLButtonElement)) {
  throw new Error(
    "El elemento con id 'btn-nueva-partida' no es un HTMLButtonElement"
  );
}

const btnVerQuePasaba = document.getElementById("btn-ver-que-pasaba");
if (!(btnVerQuePasaba instanceof HTMLButtonElement)) {
  throw new Error(
    "El elemento con id 'btn-ver-que-pasaba' no es un HTMLButtonElement"
  );
}

// 1. Función que devuelve un número aleatorio
const generarNumeroAleatorio = (max: number): number =>
  Math.floor(Math.random() * max);

// 2. Función que genera una carta aleatoria
const generarCartaAleatoria = (): Carta =>
  cartas[generarNumeroAleatorio(cartas.length)];

// 3. Función que obtiene la URL de la carta
const obtenerUrlCarta = (carta: Carta): string => carta.img;

// 4. Función que pinta la carta en el HTML
const pintarCartaEnHtml = (carta: Carta) => {
  cardImage.src = obtenerUrlCarta(carta);
};

// 5. Función que devuelve los puntos de la carta
const obtenerPuntosDeCarta = (carta: Carta): number => carta.value;

// 6. Función que suma puntos y devuelve el resultado
const sumarPuntos = (puntosActuales: number, nuevosPuntos: number): number =>
  puntosActuales + nuevosPuntos;

// 7. Función que actualiza el valor de score
const actualizarScore = (nuevosPuntos: number) => {
  puntuacionActual = sumarPuntos(puntuacionActual, nuevosPuntos);
  scoreElement.textContent = puntuacionActual.toFixed(1);
};

// 8. Función que verifica si hemos ganado o perdido
const verificarEstadoPartida = () => {
  if (puntuacionActual === MAX_PUNTUACION) {
    mostrarMensaje("¡Has ganado con 7.5 puntos!", "#28a745");
    finalizarPartida();
  } else if (puntuacionActual > MAX_PUNTUACION) {
    mostrarMensaje("¡Te has pasado de 7.5 puntos! Has perdido.", "#dc3545");
    finalizarPartida();
  }
};

// 9. Función que verifica si la puntuación es exactamente 7.5
const verificarPuntuacionExacta = (puntuacion: number) => {
  if (puntuacion === MAX_PUNTUACION) {
    mostrarMensaje(
      "Hubieras acertado, qué pena que seas un cobarde",
      "#ffcc00"
    );
  }
};

const finalizarPartida = () => {
  gameOver = true;

  // Deshabilitar los botones
  btnPedir.disabled = true;
  btnPlantarse.disabled = true;

  // Mostrar botones para continuar o simular
  btnNuevaPartida.hidden = false;
  btnVerQuePasaba.hidden = simulacionUsada;
};

// Función para mostrar mensaje
const mostrarMensaje = (mensaje: string, color: string = "#ff0000") => {
  messageElement.style.color = color;
  messageElement.textContent = mensaje;
};

// Botón "Pedir Carta"
btnPedir.addEventListener("click", () => {
  if (gameOver && !simulacionUsada) return; // Solo bloquear si se ha acabado el juego y no es simulación

  const carta = generarCartaAleatoria();
  pintarCartaEnHtml(carta);
  actualizarScore(obtenerPuntosDeCarta(carta));
  verificarEstadoPartida();

  // Verificar si la puntuación es exactamente 7.5
  verificarPuntuacionExacta(puntuacionActual);
});

// Botón "Plantarse"
btnPlantarse.addEventListener("click", () => {
  if (gameOver) return;

  let mensaje =
    puntuacionActual === 7.5
      ? "¡Lo has clavado! ¡Enhorabuena!"
      : puntuacionActual < 7.5
      ? "Casi, casi..."
      : "Te has pasado.";

  mostrarMensaje(mensaje, "#007bff");
  finalizarPartida();
});

// Botón "Nueva Partida"
btnNuevaPartida.addEventListener("click", () => {
  puntuacionActual = 0;
  gameOver = false;
  simulacionUsada = false;

  // Habilitar los botones
  btnPedir.disabled = false;
  btnPlantarse.disabled = false;

  // Ocultar botones y reiniciar mensajes
  btnNuevaPartida.hidden = true;
  btnVerQuePasaba.hidden = true;

  // Reiniciar la carta inicial
  pintarCartaEnHtml({
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg",
    value: 0,
  });

  // Reiniciar puntuación y mensaje
  actualizarScore(0);
  mostrarMensaje("¡Nueva partida! ¡Buena suerte!", "#000");
});

// Botón "Ver Qué Habría Pasado"
btnVerQuePasaba.addEventListener("click", () => {
  if (simulacionUsada) return;

  simulacionUsada = true;
  btnVerQuePasaba.hidden = true;
  btnPedir.disabled = false;
  btnPlantarse.disabled = false;

  // Simulación: pedir una carta como si estuviera jugando
  const carta = generarCartaAleatoria();
  pintarCartaEnHtml(carta);
  actualizarScore(obtenerPuntosDeCarta(carta));
  verificarEstadoPartida();

  // Verificar si la puntuación es exactamente 7.5
  verificarPuntuacionExacta(puntuacionActual);
});

// Iniciar partida inicial automáticamente
btnNuevaPartida.click();
