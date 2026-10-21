function registrar() {
    let usuario = document.getElementById("usuarioRegistro").value;
    let contrasena = document.getElementById("contrasenaRegistro").value;
    let confirmar = document.getElementById("confirmarRegistro").value;

    if (
        usuario == "" ||
        contrasena == "" ||
        confirmar == ""
    ) {
        alert("Debe llenar todos los campos primo");
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
        alert("Ese usuario ya existe brotheeer");
        return;
    }

    let nuevoUsuario = {
        usuario: usuario,
        contrasena: contrasena
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado correctamente");

    document.getElementById("usuarioRegistro").value = "";
    document.getElementById("contrasenaRegistro").value = "";
    document.getElementById("confirmarRegistro").value = "";

    document.getElementById("seccionRegistro").style.display = "none";
    document.getElementById("seccionLogin").style.display = "block";
}

function iniciarSesion(event) {
    event.preventDefault();

    let usuario = document.getElementById("username").value;
    let contrasena = document.getElementById("password").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let encontrado = usuarios.find(function(user) {
        return user.usuario == usuario &&
               user.contrasena == contrasena;
    });

    if (encontrado) {
        alert("Inicio de sesión correcto");
        window.location.href = "index4.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}