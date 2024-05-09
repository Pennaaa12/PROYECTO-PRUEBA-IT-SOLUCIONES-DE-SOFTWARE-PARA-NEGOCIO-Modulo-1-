var url = "http://localhost:8080/api/shoes/cliente/";

function listarCliente() {
    
    var urlLocal = url;
    var filtro = document.getElementById("texto").value
    if (filtro != "")
        urlLocal += "busqueda/" + filtro;


    //SE CREA LA PETICION AJAX
    $.ajax({
        url: urlLocal,
        type: "GET",
        success: function (result) {
            //success: funcion que se ejecuta
            //cuando la peticion tiene exito
            //console.log(result);

            var cuerpoTablaCliente = document.getElementById("cuerpoTablaCliente");
            //Se limpia el cuepro de la tabla
            cuerpoTablaCliente.innerHTML = "";
            //se hace un ciclo que recorra l arreglo con los datos
            for (var i = 0; i < result.length; i++) {
                //UNA ETIQUETA tr por cada registro
                var trResgistro = document.createElement("tr");

                var celdaId = document.createElement("tr");
                let celdaTipoIdentificacion = document.createElement("td")
                let celdanNumeroIdentificacion = document.createElement("td")
                let celdaNombreCliente = document.createElement("td")
                let celdaApellidoCliente = document.createElement("td")
                let celdaNumeroTelefono = document.createElement("td")
                let celdaDireccion = document.createElement("td")
                let celdaCiudad = document.createElement("td")
                let celdaEstadoCliente = document.createElement("td")



                celdaId.innerText = result[i]["id_cliente"];
                celdaTipoIdentificacion.innerText = result[i]["tipo_id"];
                celdanNumeroIdentificacion.innerText = result[i]["doc_cliente"];
                celdaNombreCliente.innerText = result[i]["nombre_cliente"];
                celdaApellidoCliente.innerText = result[i]["apellido_cliente"];
                celdaNumeroTelefono.innerText = result[i]["telefono_cliente"];
                celdaDireccion.innerText = result[i]["direccion_cliente"];
                celdaCiudad.innerText = result[i]["ciudad_cliente"];
                celdaEstadoCliente.innerText = result[i]["estado_cliente"];


                trResgistro.appendChild(celdaId);
                trResgistro.appendChild(celdaTipoIdentificacion);
                trResgistro.appendChild(celdanNumeroIdentificacion);
                trResgistro.appendChild(celdaNombreCliente);
                trResgistro.appendChild(celdaApellidoCliente);
                trResgistro.appendChild(celdaNumeroTelefono);
                trResgistro.appendChild(celdaDireccion);
                trResgistro.appendChild(celdaCiudad);
                trResgistro.appendChild(celdaEstadoCliente);

                //botones editar y deshabilitar
                let celdaOpcion = document.createElement("td");
                let botonEditarCliente = document.createElement("button");
                botonEditarCliente.value = result[i]["id_cliente"];
                botonEditarCliente.innerHTML = "Editar";

                botonEditarCliente.onclick = function (e) {
                    $('#exampleModal').modal('show');
                    consultarClienteID(this.value);
                }
                botonEditarCliente.className = "btn btn-warning editar-cliente";

                let botonDeshabilitarCliente = document.createElement("button");
                botonDeshabilitarCliente.innerHTML = "Deshabilitar";
                botonDeshabilitarCliente.className = "btn btn-danger deshabilitar-cliente";

                let clienteIdParaDeshabilitar = result[i]["id_cliente"];
                botonDeshabilitarCliente.onclick = function () {
                    deshabilitarCliente(clienteIdParaDeshabilitar);
                };


                celdaOpcion.appendChild(botonEditarCliente);
                celdaOpcion.appendChild(botonDeshabilitarCliente);

                trResgistro.appendChild(celdaOpcion)
                cuerpoTablaCliente.appendChild(trResgistro);


                //creamos un td por cada campo de resgistro

            }
        },
        error: function (error) {
            /*
            ERROR: funcion que se ejecuta cuando la peticion tiene un error
            */
            alert("Error en la petición " + error);
        }
    })
}


//1.Crear petición que traiga la información del medico por id
function consultarClienteID(id) {
    //alert(id);
    $.ajax({
        url: url + id,
        type: "GET",
        success: function (result) {
            document.getElementById("tipo_id").value = result["tipo_id"];
            document.getElementById("id_cliente").value = result["id_cliente"];
            document.getElementById("doc_cliente").value = result["doc_cliente"];
            document.getElementById("nombre_cliente").value = result["nombre_cliente"];
            document.getElementById("apellido_cliente").value = result["apellido_cliente"];
            document.getElementById("telefono_cliente").value = result["telefono_cliente"];
            document.getElementById("direccion_cliente").value = result["direccion_cliente"];
            document.getElementById("ciudad_cliente").value = result["ciudad_cliente"];
            document.getElementById("estado_cliente").value = result["estado_cliente"];
        }
    });
}
//2.Crear petición que actualice la información del medico

function actualizarCliente() {
    var id_cliente = document.getElementById("id_cliente").value
    let formData = {
        "tipo_id": document.getElementById("tipo_id").value,
        "doc_cliente": document.getElementById("doc_cliente").value,
        "nombre_cliente": document.getElementById("nombre_cliente").value,
        "apellido_cliente": document.getElementById("apellido_cliente").value,
        "telefono_cliente": document.getElementById("telefono_cliente").value,
        "direccion_cliente": document.getElementById("direccion_cliente").value,
        "ciudad_cliente": document.getElementById("ciudad_cliente").value,
        "estado_cliente": document.getElementById("estado_cliente").value
    };

    if (validarCampos()) {
        $.ajax({
            url: url + id_cliente,
            type: "PUT",
            data: formData,
            success: function (result) {
                // Manejar la respuesta exitosa según necesites
                Swal.fire({
                    title: "¡Excelente!",
                    text: "Se guardó correctamente",
                    icon: "success"
                });
                // Puedes hacer algo adicional como recargar la lista de médicos
                listarCliente();
            },
            error: function (error) {
                // Manejar el error de la petición
                Swal.fire({
                    title: "¡Error!",
                    text: "No se guardó",
                    icon: "error"
                });
            }
        });
    } else {
        Swal.fire({
            title: "¡Error!",
            text: "Llene todos los campos correctamente",
            icon: "error"
        });
    }
}


// funcion de deshabilitar medico
function deshabilitarCliente(id) {
    Swal.fire({
        title: '¿Está seguro?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, deshabilitar!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url + id,
                type: "DELETE",
                success: function (result) {
                    Swal.fire(
                        'Deshabilitado!',
                        'El registro ha sido deshabilitado.',
                        'success'
                    );
                    listarCliente(); // Recarga la lista de médicos
                },
                error: function (error) {
                    Swal.fire(
                        'Error!',
                        'No se pudo deshabilitar el registro.',
                        'error'
                    );
                }
            });
        }
    });
}


function registrarCliente() {

    let formData = {
        "tipo_id": document.getElementById("tipo_id").value,
        "doc_cliente": document.getElementById("doc_cliente").value,
        "nombre_cliente": document.getElementById("nombre_cliente").value,
        "apellido_cliente": document.getElementById("apellido_cliente").value,
        "telefono_cliente": document.getElementById("telefono_cliente").value,
        "direccion_cliente": document.getElementById("direccion_cliente").value,
        "ciudad_cliente": document.getElementById("ciudad_cliente").value,
        "estado_cliente": document.getElementById("estado_cliente").value

    };

    if (validarCampos()) {
        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            success: function (result) {
                //
                Swal.fire({
                    title: "¡Excelente!",
                    text: "Se guardó correctamente",
                    icon: "success"
                });
            },
        })
    } else {
        Swal.fire({
            title: "¡Error!",
            text: "Llene todos los campos correctamente",
            icon: "error"
        });
    }
}

// cliente.js

function validarTipoId(element) {
    // Implementa la validación del tipo de identificación aquí
}

function validarNumeroIdentificacion(element) {
    // Implementa la validación del número de identificación aquí
}

function validarNombreCliente(element) {
    // Implementa la validación del nombre del cliente aquí
}

function validarApellidoCliente(element) {
    // Implementa la validación del apellido del cliente aquí
}

function validarTelefonoCliente(element) {
    // Implementa la validación del número de teléfono aquí
}

function validarDireccionCliente(element) {
    // Implementa la validación de la dirección aquí
}

function validarCiudadCliente(element) {
    // Implementa la validación de la ciudad aquí
}

function registrarCliente() {
    // Implementa la lógica para registrar al cliente aquí
    alert("Cliente registrado exitosamente"); // Ejemplo de mensaje de alerta
}

function limpiar() {
    // Implementa la lógica para limpiar el formulario aquí
    document.getElementById("tipo_id").value = "";
    document.getElementById("doc_cliente").value = "";
    document.getElementById("nombre_cliente").value = "";
    document.getElementById("apellido_cliente").value = "";
    document.getElementById("telefono_cliente").value = "";
    document.getElementById("direccion_cliente").value = "";
    document.getElementById("ciudad_cliente").value = "";
    document.getElementById("estado_medico").selectedIndex = 0;
}
