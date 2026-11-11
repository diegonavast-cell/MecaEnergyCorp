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