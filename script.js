const enlaces = document.querySelectorAll(".menu-boton");
const secciones = document.querySelectorAll(".pagina-seccion");
const formulario = document.getElementById("formulario");
const mensajeFormulario = document.getElementById("mensajeFormulario");
const eliminar = document.getElementById("eliminar");

function mostrarSeccion(id) {
    secciones.forEach(seccion => {
        seccion.classList.remove("activa");
    });

    const seccion = document.querySelector(id);

    if (seccion) {
        seccion.classList.add("activa");
    }

    enlaces.forEach(enlace => {
        enlace.classList.remove("activo");

        if (enlace.getAttribute("href") === id) {
            enlace.classList.add("activo");
        }
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

enlaces.forEach(enlace => {
    enlace.addEventListener("click", function(evento) {
        evento.preventDefault();

        const destino = this.getAttribute("href");

        mostrarSeccion(destino);

        history.pushState(null, "", destino);
    });
});

document.querySelectorAll(".boton[href]").forEach(boton => {
    boton.addEventListener("click", function(evento) {
        evento.preventDefault();

        const destino = this.getAttribute("href");

        mostrarSeccion(destino);

        history.pushState(null, "", destino);
    });
});

window.addEventListener("popstate", function() {
    const destino = window.location.hash || "#inicio";

    mostrarSeccion(destino);
});

function guardarInformacion() {
    const informacion = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        servicio: document.getElementById("servicio").value,
        mensaje: document.getElementById("mensaje").value
    };

    localStorage.setItem(
        "informacionContacto",
        JSON.stringify(informacion)
    );
}

function cargarInformacion() {
    const datos = localStorage.getItem("informacionContacto");

    if (!datos) {
        return;
    }

    const informacion = JSON.parse(datos);

    document.getElementById("nombre").value = informacion.nombre || "";
    document.getElementById("email").value = informacion.email || "";
    document.getElementById("telefono").value = informacion.telefono || "";
    document.getElementById("servicio").value = informacion.servicio || "Técnico en informática";
    document.getElementById("mensaje").value = informacion.mensaje || "";
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    guardarInformacion();

    mensajeFormulario.textContent =
        "La información se guardó correctamente en este dispositivo.";

    formulario.reset();
});

eliminar.addEventListener("click", function() {
    const confirmar = confirm(
        "¿Deseas eliminar toda la información guardada?"
    );

    if (confirmar) {
        localStorage.removeItem("informacionContacto");

        formulario.reset();

        mensajeFormulario.textContent =
            "La información guardada fue eliminada.";
    }
});

formulario.addEventListener("reset", function() {
    mensajeFormulario.textContent = "";
});

cargarInformacion();

const inicio = window.location.hash || "#inicio";

mostrarSeccion(inicio);