// --- REGISTRO DE USUARIO ---
document.getElementById("btnRegistrar").addEventListener("click", function() {
    let usuario = document.getElementById("usuarioRegistro").value;
    let contrasena = document.getElementById("contrasenaRegistro").value;
    let confirmar = document.getElementById("confirmarRegistro").value;

    if (usuario == "" || contrasena == "" || confirmar == "") {
        alert("Debe llenar todos los campos");
        return;
    }

    if (contrasena != confirmar) {
        alert("Las contraseñas no coinciden");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuarioExiste = usuarios.find(function(user) {
        return user.usuario == usuario;
    });

    if (usuarioExiste) {
        alert("Ese usuario ya existe");
        return;
    }

    let nuevoUsuario = {
        usuario: usuario,
        contrasena: contrasena
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado correctamente");

    // Limpiar campos
    document.getElementById("usuarioRegistro").value = "";
    document.getElementById("contrasenaRegistro").value = "";
    document.getElementById("confirmarRegistro").value = "";

    // Cambiar a la vista de login
    document.getElementById("seccionRegistro").style.display = "none";
    document.getElementById("seccionLogin").style.display = "block";
});


// --- INICIO DE SESIÓN ---
document.getElementById("formLogin").addEventListener("submit", function(event) {
    event.preventDefault();

    let usuario = document.getElementById("username").value;
    let contrasena = document.getElementById("password").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let encontrado = usuarios.find(function(user) {
        return user.usuario == usuario && user.contrasena == contrasena;
    });

    if (encontrado) {
        alert("Inicio de sesión correcto");
        window.location.href = "inicio.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});


// --- NAVEGACIÓN ENTRE VISTAS ---

// Ir de Registro -> Login
const enlaceInicioSesion = document.getElementById("irInicioSesion");
if (enlaceInicioSesion) {
    enlaceInicioSesion.addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("seccionRegistro").style.display = "none";
        document.getElementById("seccionLogin").style.display = "block";
    });
}

// Ir de Login -> Registro (CORREGIDO)
const enlaceRegistrar = document.getElementById("registrar");
if (enlaceRegistrar) {
    enlaceRegistrar.addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("seccionLogin").style.display = "none";      // Oculta el login
        document.getElementById("seccionRegistro").style.display = "block";  // Muestra el registro
    });
}


// --- CERRAR SESIÓN (Para la página de inicio.html) ---
const botonCerrarSesion = document.getElementById("cerrarSesion");
if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener("click", function (e) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = "index.html";
    });
}



/* =========================================
   MECAENERGYCORP
   FORMULARIO DE CONTACTO
========================================= */

const formulario = document.getElementById("formularioContacto");

formulario.addEventListener("submit", function(event) {

    // Evitar que la página se recargue
    event.preventDefault();

    // Obtener los datos del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // Validar que los campos no estén vacíos
    if (nombre === "" || correo === "" || asunto === "" || mensaje === "") {

        alert("Por favor, completa todos los campos.");

        return;
    }

    // Crear el mensaje para WhatsApp
    const texto =
        "¡Hola, MecaEnergyCorp!" +
        "\n\nSoy: " + nombre +
        "\nMi correo electrónico es: " + correo +
        "\nAsunto: " + asunto +
        "\n\nMensaje: " + mensaje;

    // Preparar el enlace de WhatsApp
    const url = "https://wa.me/50252228132?text=" +
        encodeURIComponent(texto);

    // Abrir WhatsApp en una nueva pestaña
    window.open(url, "_blank");

    // Confirmar la preparación del mensaje
    alert("Tu mensaje está preparado. Ahora puedes enviarlo por WhatsApp.");

    // Limpiar el formulario
    formulario.reset();

});
