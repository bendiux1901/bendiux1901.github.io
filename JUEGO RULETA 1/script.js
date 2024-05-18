// Contador de gemas
let gemas = 30;
const gemasMaximas = 150;
const gemasSpan = document.getElementById('gemas');
gemasSpan.textContent = gemas;

// Datos de los personajes
const personajes = [
    { nombre: 'SUPERBANANA', imagen: 'personajeruleta1.png', tocado: false },
    { nombre: 'MAGO', imagen: 'personajeruleta2.png', tocado: false }
];

// Variable para controlar el estado de la colección
let coleccionVisible = false;

// Variable para el correo electrónico del usuario
let userEmail = '';

// Obtener referencia al botón de girar
const girarBtn = document.getElementById('girarBtn');

// Agregar evento de clic al botón
girarBtn.addEventListener('click', function() {
    girarRuleta();
});

// Función para girar la ruleta
function girarRuleta() {
    if (gemas >= 10) {
        gemas -= 10;
        actualizarGemas();
        // Girar la ruleta
        const ruleta = document.querySelector('.ruleta-img');
        ruleta.style.transition = 'transform 3s ease-in-out';
        const giroAleatorio = Math.floor(Math.random() * 360) + 180; // Girar entre 180 y 540 grados
        ruleta.style.transform = `rotate(${giroAleatorio}deg)`;
        // Detener la ruleta después de 3 segundos (cuando termine la transición)
        setTimeout(detenerRuleta, 3000);
    } else {
        alert('¡No tienes suficientes gemas! Consigue más para seguir jugando.');
    }
}

// Función para detener la ruleta
function detenerRuleta() {
    // Seleccionar un personaje aleatorio
    const personajeAleatorio = personajes[Math.floor(Math.random() * personajes.length)];
    personajeAleatorio.tocado = true;
    mostrarResultado(personajeAleatorio);
    actualizarColeccion();
    guardarPersonajes(); // Guardar datos de personajes automáticamente
}

// Función para actualizar el contador de gemas en el HTML
function actualizarGemas() {
    gemasSpan.textContent = gemas;
}

// Función para mostrar el resultado
function mostrarResultado(personaje) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.textContent = `TE HA TOCADO: ${personaje.nombre}`;
}

// Función para mostrar u ocultar la colección de personajes
function toggleColeccion() {
    const coleccionContainer = document.getElementById('coleccionContainer');
    const coleccion = document.querySelector('.coleccion');
    if (coleccionVisible) {
        coleccionContainer.style.display = 'none';
        coleccion.textContent = 'COLECCIÓN'; // Cambiar el texto de nuevo
    } else {
        mostrarColeccion();
        coleccion.textContent = 'CERRAR COLECCIÓN'; // Cambiar el texto
    }
    coleccionVisible = !coleccionVisible;
}

// Función para mostrar la colección de personajes
function mostrarColeccion() {
    const coleccionContainer = document.getElementById('coleccionContainer');
    coleccionContainer.innerHTML = ''; // Limpiar contenido existente

    const coleccionTitulo = document.createElement('h2');
    coleccionTitulo.textContent = 'Colección de Personajes';
    coleccionContainer.appendChild(coleccionTitulo);

    personajes.forEach(personaje => {
        const personajeDiv = document.createElement('div');
        personajeDiv.style.display = 'flex';
        personajeDiv.style.alignItems = 'center';
        personajeDiv.style.marginBottom = '10px';

        const personajeImg = document.createElement('img');
        personajeImg.src = personaje.imagen;
        personajeImg.style.width = '50px';
        personajeImg.style.height = 'auto';
        personajeImg.style.marginRight = '10px';
        personajeDiv.appendChild(personajeImg);

        const personajeNombre = document.createElement('span');
        personajeNombre.textContent = personaje.nombre;
        personajeDiv.appendChild(personajeNombre);

        const icono = document.createElement('img');
        icono.src = personaje.tocado ? 'verificado.png' : 'noverificado.png';
        icono.style.width = '20px';
        icono.style.height = '20px';
        icono.style.marginLeft = '10px';
        personajeDiv.appendChild(icono);

        coleccionContainer.appendChild(personajeDiv);
    });

    coleccionContainer.style.display = 'block'; // Mostrar contenedor de la colección
}

// Función para actualizar la colección de personajes
function actualizarColeccion() {
    if (coleccionVisible) {
        mostrarColeccion();
    }
}

// Función para guardar los datos de los personajes en localStorage
function guardarPersonajes() {
    if (userEmail) {
        const datos = {
            gemas,
            personajes
        };
        localStorage.setItem(userEmail, JSON.stringify(datos));
    }
}

// Función para cargar los datos de los personajes desde localStorage
function cargarPersonajes(email) {
    if (email) {
        userEmail = email;
        const datosGuardados = localStorage.getItem(email);
        if (datosGuardados) {
            const datos = JSON.parse(datosGuardados);
            gemas = Math.min(datos.gemas, gemasMaximas);
            datos.personajes.forEach((personajeGuardado, index) => {
                personajes[index].tocado = personajeGuardado.tocado;
            });
            alert('Datos cargados correctamente.');
            actualizarGemas();
            actualizarColeccion();
        } else {
            alert('No se han encontrado datos para este correo electrónico.');
        }
    } else {
        alert('No se ha proporcionado ningún correo electrónico.');
    }
}

// Función para iniciar sesión
function iniciarSesion() {
    const email = prompt('Introduce tu correo electrónico para iniciar sesión:');
    cargarPersonajes(email);
}

// No cargar datos automáticamente al inicio, solo al iniciar sesión
