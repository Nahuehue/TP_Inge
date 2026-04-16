// 1. Inicializar Mapa centrado en la UNGS
const map = L.map('map').setView([-34.5221, -58.7000], 14);

// Usamos CartoDB para evitar el error de Access Blocked en local
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO'
}).addTo(map);

// 2. Referencias al DOM
const listaContenedor = document.getElementById('lista-talleres');
const tipoTallerSelect = document.getElementById('tipo-taller');
const contenedorDireccion = document.getElementById('contenedor-direccion');
const inputDireccion = document.getElementById('input-direccion');
const formInscripcion = document.getElementById('form-inscripcion');
const inputBusqueda = document.getElementById('input-busqueda');

// 3. Lógica de Interfaz Dinámica (RF10)
// Muestra el input de dirección solo si el taller es particular 
tipoTallerSelect.addEventListener('change', () => {
    if (tipoTallerSelect.value === 'particular') {
        contenedorDireccion.style.display = 'block';
        inputDireccion.setAttribute('required', true);
    } else {
        contenedorDireccion.style.display = 'none';
        inputDireccion.removeAttribute('required');
        inputDireccion.value = ''; 
    }
});

// 4. Renderizar Talleres desde data.js (RF05 / RNF01)
// Genera los pines en el mapa y la lista para la búsqueda interactiva 
TALLERES_DATA.forEach(taller => {
    // Crear Pin en Mapa
    const marker = L.marker([taller.lat, taller.lng]).addTo(map);
    marker.bindPopup(`<b>${taller.nombre}</b><br>${taller.info}`);

    // Crear Item en Lista
    const item = document.createElement('button');
    item.className = 'list-group-item list-group-item-action p-3';
    item.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">${taller.nombre}</h6>
            <span class="badge bg-info text-dark">${taller.rubro}</span>
        </div>
        <small class="text-muted">${taller.info}</small>
    `;

    // Interacción de la PoC: Click en lista -> Mover mapa 
    item.onclick = () => {
        map.flyTo([taller.lat, taller.lng], 16);
        marker.openPopup();
    };

    listaContenedor.appendChild(item);
});

// 5. Lógica del Buscador en tiempo real (RF05)
// Filtra los talleres por nombre o rubro según lo que tipee el usuario 
inputBusqueda.addEventListener('input', (e) => {
    const termino = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.list-group-item');
    
    items.forEach(item => {
        const texto = item.innerText.toLowerCase();
        item.style.display = texto.includes(termino) ? 'block' : 'none';
    });
});

// 6. Manejo del Formulario (RF01, RF02, RF03, RF10, RF11)
// Simula el envío de datos y la notificación al moderador 
formInscripcion.onsubmit = (e) => {
    e.preventDefault();
    
    const direccionFinal = tipoTallerSelect.value === 'sede' 
        ? 'Sede Central UNGS (Asociada automáticamente - RF11)' 
        : inputDireccion.value + ' (Dirección particular - RF10)';
    
    alert(`REGISTRO EXITOSO (RF01):
    - Ubicación: ${direccionFinal}
    - Estado: PENDIENTE (RF02)
    - Acción: Se notificó al moderador por correo (RF03)`);
    
    formInscripcion.reset();
    contenedorDireccion.style.display = 'none';
};