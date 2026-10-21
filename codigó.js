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