 // Variables globales
 let mensajeGlobal = "¡Bienvenido a tu lista de tareas!";
 let contadorTareasAgregadas = 0;
 let contadorTotalTareas = 0;

 // Variables con let y const dentro de un bloque (scope local)
 function inicializarLista() {
    let nombreLista = "Tareas Pendientes"; // Scope local a la función inicializarLista
    const mensajeInicial = mensajeGlobal; // Scope local a la función inicializarLista, toma el valor de la variable global

    mostrarMensaje(mensajeInicial); // Usamos la variable const aquí
    mostrarTareasIniciales(); // Llamamos a la nueva función para mostrar tareas
    configurarBotonAgregarTarea(); // Nueva función para el botón
 }

function mostrarMensaje(texto) {
    const elementoMensaje = document.getElementById('mensaje');
    elementoMensaje.textContent = texto;
 }

function mostrarTareasIniciales() {
    const tareas = ["Comprar víveres", "Estudiar JavaScript",
        "Hacer ejercicio", "Llamar a un amigo"]; // Array de tareas
    const listaTareasElemento = document.getElementById('lista-tareas');
    contadorTotalTareas = tareas.length;

    // Ciclo for para iterar sobre el array de tareas
    for (let i = 0; i < tareas.length; i++) {
        const tareaTexto = tareas[i]; // Obtenemos la tarea actual
        const elementoLista = document.createElement('li'); // Creamos un elemento <li>
        elementoLista.textContent = tareaTexto; // Establecemos el texto del <li> con la tarea
        listaTareasElemento.appendChild(elementoLista); // Agregamos el <li> a la <ul> en el HTML
    }
}

function configurarBotonAgregarTarea() {
    const botonAgregar = document.getElementById('boton-agregar-tarea');
    botonAgregar.addEventListener('click', function() {
        contadorTareasAgregadas ++;
        contadorTotalTareas ++;

        switch (contadorTareasAgregadas%3) {
            case 1:
                mostrarMensaje(`¡Excelente! llevás ${contadorTotalTareas} tareas en total`);
                break;
            case 2:
                mostrarMensaje(`¿Listo para ser productivo? por ahora llevas solo ${contadorTotalTareas} tareas`);
                break;
            default:
                mostrarMensaje(`Haz clic en 'Agregar Tarea' para seguir. Ya van ${contadorTotalTareas}`);
        }
    });
}
 
inicializarLista(); // Llamamos a la función para que se ejecute al cargar la página
console.log("Variable global mensajeGlobal:", mensajeGlobal); 
// Podemos acceder a la variable global desde fuera de la función
// console.log("Variable local nombreLista:", nombreLista); 
// Esto generaría un error porque nombreLista tiene scope local