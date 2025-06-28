document.addEventListener(`DOMContentLoaded`, () => {
    const countriesContainer = document.getElementById('countries-container');
    const loadingMessage = document.getElementById('loading-message');
    const API_URL = 'http://localhost:3000/api/countries';

    // Funcion para obtener los datos de los paises
    async function fetchCountries() {
        try {
            // Ocultar mensaje de carga
            if (loadingMessage) {
                loadingMessage.style.display = 'none';
            }

            // Realizar la peticion GET a la API
            const response = await fetch(API_URL);

            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Convertir respuesta a JSON
            const countries = await response.json();

            // Limpiar el contenedor antes de renderizar (si no esta vacio)
            countriesContainer.innerHTML = '';

            // Renderizar los paises en el HTML
            renderCountries(countries);
        } catch (error) {
            console.error('Error al obtener los países:', error);

            // Mostrar un mensaje de error al usuario
            countriesContainer.innerHTML = `<p class="text-danger">Error al cargar los países: ${error.message}</p>`;
        }
    }

    // Funcion para renderizar los paises en el DOM
    function renderCountries(countries) {
        if(!countries || countries.length === 0) {
            countriesContainer.innerHTML = '<p>No se encontraron países.</p>';
            return;
        }

        countries.forEach(country => {
            // Crear los elementos div para las Bootstrap grid
            const colDiv = document.createElement('div');
            colDiv.classList.add('col');

            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card', 'h-100', 'country-card');

            const cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body');

            // Agregar contenido de la tarjeta
            const flagImg = document.createElement('img');
            flagImg.src = country.flag || 'placeholder.svg';
            flagImg.alt = `Bandera de ${country.name}`;
            flagImg.classList.add('country-flag');

            const nameElement = document.createElement('h5');
            nameElement.classList.add('card-title');
            nameElement.textContent = country.name;

            const populationElement = document.createElement('p'); 
            populationElement.classList.add('card-text'); 
            populationElement.textContent = `Población: ${country.population ? country.population.toLocaleString('es-ES') : 'N/D'}`;

            const currencyElement = document.createElement('p'); 
            currencyElement.classList.add('card-text'); 
            currencyElement.textContent = `Moneda: ${country.currency || 'N/D'}`;

            // Ensamblar la tarjeta
            cardBodyDiv.appendChild(flagImg);
            cardBodyDiv.appendChild(nameElement);
            cardBodyDiv.appendChild(populationElement);
            cardBodyDiv.appendChild(currencyElement);

            cardDiv.appendChild(cardBodyDiv);

            colDiv.appendChild(cardDiv);

            countriesContainer.appendChild(colDiv);
        });
    }

    fetchCountries()
})