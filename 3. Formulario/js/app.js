/*jshint esversion: 6 */

// Variables
const campoEmail = document.querySelector("#email");
const campoAsunto = document.querySelector("#asunto");
const campoMensaje = document.querySelector("#mensaje");

const botonEnviar = document.querySelector("#enviar");
const botonReset = document.querySelector("#resetBtn");

const formulario = document.getElementById("enviar-mail");


// Event Listener

function todosEvent() {
    document.addEventListener("DOMContentLoaded", alInicioDeshabilitaBoton);

    campoEmail.addEventListener("blur", validarCampo);
    campoMensaje.addEventListener("blur", validarCampo);
    campoAsunto.addEventListener("blur", validarCampo);

    botonEnviar.addEventListener("click", enviarEmail);
    botonReset.addEventListener("click", resetEmail);

}

todosEvent();

// Funciones

function alInicioDeshabilitaBoton() {
    botonEnviar.disabled = true;
}

function validarCampo() {
    // console.log("Blur");
    // console.log(campoMensaje.value);
    validarLongitud(this);

    // console.log(this.type);
    if (this.type === "email") {
        validarEmail(this);
    }

    if (campoEmail.value !== "" && campoMensaje.value !== "" && campoAsunto.value !== "") {
        if (document.querySelectorAll(".error").length === 0) {
            botonEnviar.disabled = false;
        }
    } else {
        botonEnviar.disabled = true;
    }
}

function validarLongitud(campo) {

    // console.log(campo.value.length);

    if (campo.value.length > 0) {
        campo.style.borderBottomColor = "green";
        campo.classList.remove("error");
    } else {
        campo.style.borderBottomColor = "red";
        campo.classList.add("error");
    }

}

function validarEmail(campo) {
    const mensaje = campo.value;

    if (mensaje.indexOf("@") !== -1) {
        campo.style.borderBottomColor = "green";
        campo.classList.remove("error");
    } else {
        campo.style.borderBottomColor = "red";
        campo.classList.add("error");
    }
}

function enviarEmail(e) {
    e.preventDefault();

    let cargaGIF = document.getElementById("spinner");
    cargaGIF.style.display = "block";

    let enviadoGIF = document.createElement("img");
    enviadoGIF.src = "img/mail.gif";
    enviadoGIF.style.display = "block";

    setTimeout(function () {
        cargaGIF.style.display = "none";
        document.querySelector("#loaders").appendChild(enviadoGIF);

        setTimeout(function () {
            enviadoGIF.remove();
            formulario.reset();
        }, 3000);
    }, 3000);

}

function resetEmail(e) {
    e.preventDefault();
    formulario.reset();

}