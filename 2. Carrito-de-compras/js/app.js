/*jshint esversion: 6 */

// Variables
let carrito = document.getElementById("carrito");
let cursos = document.getElementById("lista-cursos");
let listaCursosCarrito = document.querySelector("#lista-carrito > tbody");
let botonVaciarCarrito = document.querySelector("#vaciar-carrito");
let botonVaciarCarritoTodo = document.querySelector("#vaciar-carrito");

// Event Listeners
function todosEvent() {
    cursos.addEventListener("click", comprarCurso);
    carrito.addEventListener("click", borrarCurso);
    botonVaciarCarrito.addEventListener("click", vaciarCarrito);
    botonVaciarCarritoTodo.addEventListener("click", borrarCarritoLocalStorage);
    document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

todosEvent();

// Funciones

function comprarCurso(e) {
    e.preventDefault();

    // console.log(e.target.classList);
    if (e.target.classList.contains("agregar-carrito")) {
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}

function leerDatosCurso(curso) {
    // console.log(curso.querySelector("img"));
    const informacionCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector("p span").textContent,
        id: curso.querySelector("a").getAttribute("data-id")
    };
    // console.log(informacionCurso);

    insertarCarrito(informacionCurso);
}

function insertarCarrito(curso) {

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>
            <img src="${curso.imagen}" width="100px"></img>
        </td>
        <td>
            ${curso.titulo}
        </td>
        <td>
            ${curso.precio}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursosCarrito.appendChild(fila);

    guardarLocalStorage(curso);
}

function borrarCurso(e) {
    e.preventDefault();
    // console.log("Eliminar (pero cuando pulsa cualquier sitio)");

    if (e.target.classList.contains("borrar-curso")) {
        // console.log(e.target);
        // console.log(e.target.parentElement.parentElement);
        e.target.parentElement.parentElement.remove();

        const dataID = e.target.getAttribute('data-id');

        // console.log(dataID);
        // console.log(cursoLS);

        borrarElementosCarrito(dataID);
    }
}

function vaciarCarrito(e) {
    e.preventDefault();

    // listaCursosCarrito.innerHTML = "";

    while (listaCursosCarrito.firstChild) {
        listaCursosCarrito.removeChild(listaCursosCarrito.firstChild);
    }

}

function borrarCarritoLocalStorage(e) {
    e.preventDefault();

    vaciarCarrito(e);

    localStorage.setItem("Cursos", "[]");

}

function borrarElementosCarrito(cursoID) {

    const cursoLS = comprobarLocalStorage();
    cursoLS.forEach(function (elemento, index) {
        // console.log(elemento.id);
        if (elemento.id === cursoID) {
            cursoLS.splice(index, 1);
        }

    });

    localStorage.setItem("Cursos", JSON.stringify(cursoLS));

}

function guardarLocalStorage(curso) {

    let cursosLS = comprobarLocalStorage();

    cursosLS.push(curso);

    localStorage.setItem("Cursos", JSON.stringify(cursosLS));
}

function comprobarLocalStorage() {

    let cursoLS;

    if (localStorage.getItem("Cursos") == null) {
        cursoLS = [];
    } else {
        cursoLS = JSON.parse(localStorage.getItem("Cursos"));
    }
    return cursoLS;
}

function leerLocalStorage() {

    let cursoLS;

    cursoLS = comprobarLocalStorage();

    cursoLS.forEach(elemento => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width="100px"></img>
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${elemento.id}">X</a>
        </td>
    `;
        listaCursosCarrito.appendChild(fila);

    });
}