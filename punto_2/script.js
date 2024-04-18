// Matriz global para mantener el estado de las celdas
const matriz = crearMatriz(10, 5);
const contenedorMatriz = document.getElementById('contenedor-matriz');
let celdasSeleccionadas = [];

// Renderizar la matriz en el DOM
contenedorMatriz.appendChild(crearTabla(matriz));

// Agregar evento al botón para seleccionar celda aleatoria
document.getElementById('seleccionar-celda-aleatoria').addEventListener('click', seleccionarCeldaAleatoria);

// Agregar evento al botón para limpiar la matriz
document.getElementById('limpiar-matriz').addEventListener('click', limpiarMatriz);

// Matriz vacía de tamaño filas y columnas
function crearMatriz(filas, columnas) {
    return Array.from({ length: filas }, () => Array.from({ length: columnas }, () => false));
}

// Tabla HTML para representar la matriz
function crearTabla(matriz) {
    const tabla = document.createElement('table');

    matriz.forEach((fila, indiceFilas) => {
        const tr = document.createElement('tr');

        fila.forEach((celda, indiceColumnas) => {
            const td = document.createElement('td');
            td.textContent = celda ? 'X' : '';
            td.classList.toggle('deshabilitada', celda);
            td.addEventListener('click', () => cambiarEstadoCelda(indiceFilas, indiceColumnas));
            tr.appendChild(td);
        });

        tabla.appendChild(tr);
    });

    return tabla;
}

// Cambia el estado de una celda de la matriz
function cambiarEstadoCelda(fila, columna) {
    const coordenadasCelda = `${fila},${columna}`;
    const celda = document.querySelector(`table tr:nth-child(${fila + 1}) td:nth-child(${columna + 1})`);

    matriz[fila][columna] = !matriz[fila][columna];

    if (matriz[fila][columna]) {
        celdasSeleccionadas.push(coordenadasCelda);
    } else {
        celdasSeleccionadas = celdasSeleccionadas.filter(coords => coords !== coordenadasCelda);
    }

    renderizarMatriz();
    resaltarCeldasSeleccionadas();
}

/**
 * Renderiza la matriz actualizada en el DOM
 */
function renderizarMatriz() {
    const tabla = document.querySelector('table');
    const celdas = tabla.querySelectorAll('td');

    celdas.forEach((celda, indice) => {
        const fila = Math.floor(indice / matriz[0].length);
        const columna = indice % matriz[0].length;
        const coordenadasCelda = `${fila},${columna}`;

        celda.textContent = matriz[fila][columna] ? 'X' : '';
        celda.classList.remove('seleccionada', 'fila-seleccionada', 'columna-seleccionada');

        if (celdasSeleccionadas.includes(coordenadasCelda)) {
            celda.classList.add('seleccionada');
        }

        celda.classList.toggle('deshabilitada', matriz[fila][columna]);
    });
}

/**
 * Resalta la fila y columna de las celdas seleccionadas
 */
function resaltarCeldasSeleccionadas() {
    const tabla = document.querySelector('table');
    const celdas = tabla.querySelectorAll('td');

    celdas.forEach((celda, indice) => {
        const fila = Math.floor(indice / matriz[0].length);
        const columna = indice % matriz[0].length;
        const coordenadasCelda = `${fila},${columna}`;

        // Omitir las celdas seleccionadas
        if (celdasSeleccionadas.includes(coordenadasCelda)) {
            return;
        }

        // Resaltar todas las celdas de la misma fila que las celdas seleccionadas
        if (celdasSeleccionadas.some(coords => coords.split(',')[0] === `${fila}`)) {
            celda.classList.add('fila-seleccionada');
        } else {
            celda.classList.remove('fila-seleccionada');
        }

        // Resaltar todas las celdas de la misma columna que las celdas seleccionadas
        if (celdasSeleccionadas.some(coords => coords.split(',')[1] === `${columna}`)) {
            celda.classList.add('columna-seleccionada');
        } else {
            celda.classList.remove('columna-seleccionada');
        }
    });
}

/**
 * Selecciona una celda aleatoria de la matriz
 */
function seleccionarCeldaAleatoria() {
    const fila = Math.floor(Math.random() * matriz.length);
    const columna = Math.floor(Math.random() * matriz[0].length);

    cambiarEstadoCelda(fila, columna);
}

/**
 * Limpia la matriz y elimina las celdas seleccionadas
 */
function limpiarMatriz() {
    matriz.forEach(fila => fila.fill(false));
    celdasSeleccionadas = [];
    renderizarMatriz();
}