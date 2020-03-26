/*jshint esversion: 6 */

let nota = document.getElementById("nota");
let formulario = document.getElementById("formulario");
let listaNotas = document.getElementById("lista-notas");

//

function todosEvent(params) {

    formulario.addEventListener("submit", agregarNota);

    listaNotas.addEventListener("click", borrarNota);

    document.addEventListener("DOMContentLoaded", inicioLocalStorage);
}

todosEvent();


//

function agregarNota(e) {
    e.preventDefault();
    // console.log("Formulario enviado");

    let contenidoNota = nota.value;
    // console.log(contenidoNota);

    if (contenidoNota == "") {
        if (!confirm("· La nota esta vacia, ¿guardar de todos modos? ·")) {

            // nada pasa
            return;

        } else {
            let botonBorrar = document.createElement("a");
            botonBorrar.classList = "borrar-nota";
            botonBorrar.innerText = "X";

            let textnode = document.createTextNode(contenidoNota);
            let node = document.createElement("LI");
            node.appendChild(textnode);
            node.appendChild(botonBorrar);
            listaNotas.appendChild(node);

            // Llamada funcion de Local storage
            guardarNotaLocalStorage(contenidoNota);

            nota.value = "";
        }

    } else {

        let botonBorrar = document.createElement("a");
        botonBorrar.classList = "borrar-nota";
        botonBorrar.innerText = "X";

        let textnode = document.createTextNode(contenidoNota);
        let node = document.createElement("LI");
        node.appendChild(textnode);
        node.appendChild(botonBorrar);
        listaNotas.appendChild(node);

        // Llamada funcion de Local storage
        guardarNotaLocalStorage(contenidoNota);

        nota.value = "";
    }
}


function borrarNota(e) {
    e.preventDefault();
    if (e.target.className == "borrar-nota") {

        // console.log("pulsada la X de 1 nota");

        if (confirm("· ¿Quiere borrar la nota? ·")) {
            e.target.parentElement.remove();
        } else {
            alert("Aquí no ha pasado nada!");
        }

        let textoOriginal = e.target.parentElement.innerText;
        let textoModSinX = textoOriginal.slice(0, -1);

        borrarDelLocalStorage(textoModSinX);
    }

}

function guardarNotaLocalStorage(texto) {
    let txt;
    txt = comprobarNotaLocalStorage();

    txt.push(texto);

    localStorage.setItem("Nota", JSON.stringify(txt));
}

function comprobarNotaLocalStorage() {

    let txt;

    if (localStorage.getItem("Nota") == null) {
        txt = [];
    } else {
        txt = JSON.parse(localStorage.getItem("Nota"));
    }
    return txt;
}

function inicioLocalStorage() {
    let txt;

    txt = comprobarNotaLocalStorage();

    txt.forEach(nota => {
        let botonBorrar = document.createElement("a");
        botonBorrar.classList = "borrar-nota";
        botonBorrar.innerText = "X";

        let textnode = document.createTextNode(nota);
        let node = document.createElement("LI");
        node.appendChild(textnode);
        node.appendChild(botonBorrar);
        listaNotas.appendChild(node);
    });
}

function borrarDelLocalStorage(texto) {

    let txt;

    txt = comprobarNotaLocalStorage();

    txt.forEach(function (elemento, index) {

        // console.log(elemento);
        if (elemento === texto) {
            txt.splice(index, 1);
        }

    });

    localStorage.setItem("Nota", JSON.stringify(txt));
}