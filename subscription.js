document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("form-suscripcion");
    var titulo = document.getElementById("form-title");

    var campos = ["nombre", "email", "telefono", "ciudad", "frecuencia"];

    function mostrarError(id, mensaje) {
        var span = document.getElementById("error-" + id);
        var campo = document.getElementById(id);
        span.textContent = mensaje;
        campo.classList.add("campo-error");
    }

    function ocultarError(id) {
        var span = document.getElementById("error-" + id);
        var campo = document.getElementById(id);
        span.textContent = "";
        campo.classList.remove("campo-error");
    }

    function validarNombre() {
        var valor = document.getElementById("nombre").value.trim();
        if (valor === "") {
            mostrarError("nombre", "El nombre es obligatorio.");
            return false;
        }
        if (valor.length < 3) {
            mostrarError("nombre", "El nombre debe tener al menos 3 caracteres.");
            return false;
        }
        ocultarError("nombre");
        return true;
    }

    function validarEmail() {
        var valor = document.getElementById("email").value.trim();
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (valor === "") {
            mostrarError("email", "El correo electronico es obligatorio.");
            return false;
        }
        if (!regex.test(valor)) {
            mostrarError("email", "Ingresa un correo electronico valido.");
            return false;
        }
        ocultarError("email");
        return true;
    }

    function validarTelefono() {
        var valor = document.getElementById("telefono").value.trim();
        var regex = /^[0-9]+$/;
        if (valor === "") {
            mostrarError("telefono", "El telefono es obligatorio.");
            return false;
        }
        if (!regex.test(valor) || valor.length < 8) {
            mostrarError("telefono", "Ingresa un telefono valido (minimo 8 digitos).");
            return false;
        }
        ocultarError("telefono");
        return true;
    }

    function validarCiudad() {
        var valor = document.getElementById("ciudad").value.trim();
        if (valor === "") {
            mostrarError("ciudad", "La ciudad es obligatoria.");
            return false;
        }
        ocultarError("ciudad");
        return true;
    }

    function validarFrecuencia() {
        var valor = document.getElementById("frecuencia").value;
        if (valor === "") {
            mostrarError("frecuencia", "Selecciona una frecuencia.");
            return false;
        }
        ocultarError("frecuencia");
        return true;
    }

    var validadores = {
        nombre: validarNombre,
        email: validarEmail,
        telefono: validarTelefono,
        ciudad: validarCiudad,
        frecuencia: validarFrecuencia
    };

    campos.forEach(function (id) {
        var campo = document.getElementById(id);

        campo.addEventListener("blur", function () {
            validadores[id]();
        });

        campo.addEventListener("focus", function () {
            ocultarError(id);
        });
    });

    var nombreInput = document.getElementById("nombre");
    nombreInput.addEventListener("input", function () {
        var valor = nombreInput.value.trim();
        if (valor.length >= 3) {
            titulo.textContent = "Hola " + valor + ", suscribite a las alertas";
        } else {
            titulo.textContent = "Suscribite a las alertas meteorologicas";
        }
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        var todosValidos = true;
        campos.forEach(function (id) {
            if (!validadores[id]()) {
                todosValidos = false;
            }
        });

        if (todosValidos) {
            var datos = {
                nombre: document.getElementById("nombre").value.trim(),
                email: document.getElementById("email").value.trim(),
                telefono: document.getElementById("telefono").value.trim(),
                ciudad: document.getElementById("ciudad").value.trim(),
                frecuencia: document.getElementById("frecuencia").value,
                comentarios: document.getElementById("comentarios").value.trim()
            };

            var mensaje = "Suscripcion exitosa!\n\n";
            mensaje += "Nombre: " + datos.nombre + "\n";
            mensaje += "Email: " + datos.email + "\n";
            mensaje += "Telefono: " + datos.telefono + "\n";
            mensaje += "Ciudad: " + datos.ciudad + "\n";
            mensaje += "Frecuencia: " + datos.frecuencia + "\n";
            if (datos.comentarios) {
                mensaje += "Comentarios: " + datos.comentarios + "\n";
            }

            alert(mensaje);
            form.reset();
            titulo.textContent = "Suscribite a las alertas meteorologicas";
        } else {
            alert("Por favor, corrige los errores antes de enviar el formulario.");
        }
    });
});
