console.log("--- Paso 1: Ejecución Síncrona ---");
console.log("Inicio proceso Síncrono");

function procesoSecundarioSync() {
    // Simulamos una tarea que toma tiempo (aunque en JS síncrono real, bloquearía)
    let suma = 0;
    for (let i = 0; i < 100000000; i++) {
        suma += 1; // Una operación simple para simular trabajo
    }
    console.log("Etapa 2 del proceso (Sync) completada.");
    return suma; // Devolvemos algo para mostrar que se completó
}

function procesoPrincipalSync() {
    console.log("Etapa 1 del proceso (Sync)");
    const resultadoSecundario = procesoSecundarioSync(); // Llamada síncrona, bloqueante
    console.log("Resultado del proceso secundario:", resultadoSecundario);
    console.log("Etapa 3 del proceso (Sync)");
}

procesoPrincipalSync();
console.log("Fin proceso Síncrono");
console.log("-------------------------------------\n"); // Separador

console.log("--- Paso 2: Asincronía con setTimeout ---");
function mensajeAsync() {
    console.log('CALLBACK: Proceso asíncrono (setTimeout) ejecutado a las ' + (new
    Date()).toLocaleTimeString());
}

console.log("Inicio proceso Async (setTimeout) a las " + (new Date()).toLocaleTimeString());

// Programamos la ejecución de mensajeAsync para después de 2 segundos (2000 ms)
setTimeout(mensajeAsync, 2000);
console.log("Fin de la configuración del setTimeout a las " + (new Date()).toLocaleTimeString());
console.log("El hilo principal sigue ejecutando otras cosas...");
console.log("-------------------------------------\n"); // Separador

console.log("--- Paso 3: Callbacks ---"); 
function simularLecturaArchivo(nombreArchivo, callback) { 
    console.log(`Iniciando lectura simulada de: ${nombreArchivo}`);

    // Simulamos una operación asíncrona que tarda 1.5 segundos 
    setTimeout(() => { 
      const contenido = `Contenido del archivo '${nombreArchivo}'`; 
      console.log(`Lectura simulada de ${nombreArchivo} completada.`);
      
      // Llamamos al callback con el resultado 
      callback(null, contenido); // Pasamos null como error (simulando éxito) 
    }, 1500); 
} 
 
// Función callback que se ejecutará al terminar la lectura 
function procesarContenido(error, contenido) { 
    console.log("CALLBACK: Ejecutando el callback..."); 
    if (error) { 
        console.error("Error al leer el archivo:", error); 
        return; 
    } 
    console.log("Contenido recibido:", contenido.toUpperCase()); // Procesamos el contenido 
} 
 
console.log("Solicitando lectura de archivo..."); 
simularLecturaArchivo('miDocumento.txt', procesarContenido); 
console.log("Solicitud de lectura enviada, el programa continúa..."); 
console.log("-------------------------------------\n"); // Separador

console.log("--- Paso 4: Callback Hell (Simulación) ---"); 
function tareaAsincrona(nombreTarea, duracion, callback) { 
    console.log(`Iniciando Tarea: ${nombreTarea}`); 
    setTimeout(() => { 
        console.log(`Tarea ${nombreTarea} completada.`); 
        callback(); // Llama al siguiente paso 
    }, duracion); 
} 
 
console.log("Iniciando secuencia de tareas anidadas..."); 
tareaAsincrona('A', 1000, function() { // Callback para Tarea A 
    console.log("-> Callback de Tarea A ejecutado."); 
    tareaAsincrona('B', 500, function() { // Callback para Tarea B (anidado) 
        console.log("--> Callback de Tarea B ejecutado."); 
        tareaAsincrona('C', 800, function() { // Callback para Tarea C (más anidado) 
            console.log("---> Callback de Tarea C ejecutado."); 
            console.log("Secuencia de tareas anidadas completada."); 
            console.log("-------------------------------------\n"); // Separador final 
        }); 
    }); 
});

console.log("Configuración de tareas anidadas terminada. Esperando ejecución...");

console.log("--- Paso 5: Promesas ---"); 
function simularLecturaArchivoConPromesa(nombreArchivo) { 
    console.log(`(Promesa) Iniciando lectura simulada de: ${nombreArchivo}`); 
    // Creamos y retornamos una nueva Promesa 
    return new Promise((resolve, reject) => { 
        // Simulamos la operación asíncrona 
        setTimeout(() => { 
            const exito = Math.random() > 0.2; // Simulamos un posible error (20% de probabilidad) 
            if (exito) { 
                const contenido = `(Promesa) Contenido del archivo '${nombreArchivo}'`; 
                console.log(`(Promesa) Lectura simulada de ${nombreArchivo} completada.`); 
                resolve(contenido); // La promesa se resuelve exitosamente 
            } else { 
                const error = `(Promesa) Error al leer ${nombreArchivo}`; 
                console.error(error); 
                reject(error); // La promesa se rechaza con un error 
            } 
        }, 1200); 
    }); 
} 
 
console.log("(Promesa) Solicitando lectura..."); 
simularLecturaArchivoConPromesa('config.json') 
    .then((contenidoRecibido) => { 
        // Este bloque se ejecuta si la promesa se resuelve (resolve) 
        console.log("PROMESA CUMPLIDA (.then):"); 
        console.log("Contenido:", contenidoRecibido.toUpperCase()); 
    }) 
    .catch((errorRecibido) => { 
        // Este bloque se ejecuta si la promesa se rechaza (reject) 
        console.log("PROMESA RECHAZADA (.catch):"); 
        console.error("Error:", errorRecibido); 
    }) 
    .finally(() => { 
        // Este bloque se ejecuta siempre, tanto si se resuelve como si se rechaza 
        console.log("(Promesa) Operación finalizada (finally)."); 
        console.log("-------------------------------------\n"); // Separador 
    }); 
 
console.log("(Promesa) Solicitud de lectura enviada, el programa continúa...");

console.log("--- Paso 6: Fetch API (Promesas) ---"); 
const apiUrl = 'https://restcountries.com/v3.1/alpha/arg'; // API para obtener datos de Argentina 
 
console.log(`(Fetch) Realizando solicitud a: ${apiUrl}`); 
 
fetch(apiUrl) // fetch devuelve una Promesa 
    .then(response => { 
        // El primer .then recibe el objeto Response. 
        // response.ok indica si la solicitud HTTP fue exitosa (status 200-299) 
        console.log("(Fetch) Respuesta recibida. Status:", response.status); 
        if (!response.ok) { 
            // Si hay un error HTTP (ej: 404 Not Found), lanzamos un error para que lo capture el .catch() 
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`); 
        } 
        // response.json() también devuelve una Promesa que se resuelve con los datos parseados como JSON. 
        return response.json();  
    }) 
    .then(data => { 
        // Este .then recibe los datos ya parseados (el array de países, en este caso) 
        console.log("(Fetch) Datos JSON recibidos:"); 
        // Mostramos solo algunos datos del país (Argentina en este caso) 
        const pais = data[0]; // La API devuelve un array, tomamos el primer elemento 
        console.log("Nombre Oficial:", pais.name.official); 
        console.log("Capital:", pais.capital[0]); 
        console.log("Población:", pais.population); 
    }) 
    .catch(error => { 
        // Captura errores de red (ej: no hay conexión) o los errores que lanzamos (ej: !response.ok) 
        console.error("(Fetch) Error en la solicitud:", error); 
    }) 
    .finally(() => { 
        console.log("(Fetch) Solicitud fetch finalizada."); 
        console.log("-------------------------------------\n"); // Separador 
    }); 
 
console.log("(Fetch) Solicitud fetch iniciada, esperando respuesta...");

console.log("--- Paso 7: Async/Await ---"); 
const apiUrlPokemon = 'https://pokeapi.co/api/v2/pokemon/pikachu'; // API de Pokémon 
 
// Definimos una función asíncrona con la palabra clave 'async' 
async function obtenerDatosPokemon(url) { 
    console.log(`(Async/Await) Iniciando fetch a: ${url}`); 
    try { 
        // Usamos 'await' para esperar a que la Promesa de fetch se resuelva 
        const response = await fetch(url);  
        console.log("(Async/Await) Respuesta recibida. Status:", response.status); 
 
        // Verificamos si la respuesta es correcta 
        if (!response.ok) { 
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`); 
        } 
 
        // Usamos 'await' de nuevo para esperar a que la Promesa de response.json() se resuelva 
        const data = await response.json();  
        console.log("(Async/Await) Datos JSON de Pokémon recibidos:"); 
        console.log("Nombre:", data.name); 
        console.log("ID:", data.id); 
        console.log("Tipo principal:", data.types[0].type.name); 
 
    } catch (error) { 
        // El bloque catch maneja cualquier error ocurrido en el 'try' (errores de red o los lanzados manualmente) 
console.error("(Async/Await) Error al obtener datos del Pokémon:", error); 
} finally { 
console.log("(Async/Await) Proceso de obtención de Pokémon finalizado."); 
console.log("-------------------------------------\n"); // Separador final 
} 
} 
// Llamamos a nuestra función asíncrona 
console.log("(Async/Await) Llamando a obtenerDatosPokemon..."); 
obtenerDatosPokemon(apiUrlPokemon); 
console.log("(Async/Await) Llamada a obtenerDatosPokemon realizada, pero la ejecución continúa..."); 