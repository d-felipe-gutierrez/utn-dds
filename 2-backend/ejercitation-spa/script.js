function mostrarInicio() {
  document.getElementById("contenedor-principal").innerHTML = ` 
        <h1>Página de Inicio</h1> 
        <p>Bienvenido a mi SPA.</p> 
        <button onclick="location.hash = '#acerca-de'">Ir a Acerca De</button> 
    `;
}

function mostrarAcercaDe() {
  document.getElementById("contenedor-principal").innerHTML = ` 
        <h1>Acerca De</h1> 
        <p>Información sobre la aplicación.</p> 
        <button onclick="location.hash = '#contacto'">Ir a Contacto</button> 
    `;
}

function mostrarContacto() {
  document.getElementById("contenedor-principal").innerHTML = ` 
        <h1>Contacto</h1> 
        <p>Formulario de contacto aquí.</p> 
        <button onclick="location.hash = '#inicio'">Volver a Inicio</button> 
    `;
}

function navegar() {
  let hash = location.hash;

  if (hash === "#inicio") {
    mostrarInicio();
  } else if (hash === "#acerca-de") {
    mostrarAcercaDe();
  } else if (hash === "#contacto") {
    mostrarContacto();
  } else {
    mostrarInicio(); // Vista por defecto
  }
}

navegar();
window.addEventListener("hashchange", navegar);
