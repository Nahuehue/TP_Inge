// Inicializar Mapa centrado en la UNGS
const map = L.map('map').setView([-34.5221, -58.7000], 13);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO'
}).addTo(map);

// Funcion para limpiar tildes y mayusculas
function normalizarTexto(texto) {
    if (!texto) return "";
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Estructura para asociar IDs de talleres con sus marcadores en el mapa
let marcadoresActivos = {};

const listaContenedor = document.getElementById('lista-talleres');
const filterTexto = document.getElementById('buscar-texto');
const filterLocalidad = document.getElementById('buscar-localidad');
const filterDias = document.getElementById('buscar-dias');

// Función principal para renderizar la interfaz
function cargarInterfaz() {
    // Limpiamos lo previo
    listaContenedor.innerHTML = '';
    for (let id in marcadoresActivos) {
        map.removeLayer(marcadoresActivos[id]);
    }
    marcadoresActivos = {};

    const talleres = obtenerTalleres();

    talleres.forEach(taller => {
        // Guardamos el marcador en nuestro objeto de control
        const marker = L.marker([taller.lat, taller.lng]).addTo(map);
        marker.bindPopup(`<b>${taller.nombre}</b><br>${taller.info}<br><small>Dias: ${taller.dias}</small>`);
        marcadoresActivos[taller.id] = marker;

        // Crear elemento de lista
        const item = document.createElement('button');
        item.className = 'list-group-item list-group-item-action p-3 taller-item';
        // Dataset para usar en el filtrado posterior
        item.dataset.nombre = taller.nombre.toLowerCase();
        item.dataset.rubro = taller.rubro.toLowerCase();
        item.dataset.localidad = taller.localidad.toLowerCase();
        item.dataset.dias = taller.dias.toLowerCase();
        item.dataset.id = taller.id;

        item.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1">${taller.nombre}</h6>
                <span class="badge bg-info text-dark">${taller.rubro}</span>
            </div>
            <div class="text-muted small">${taller.localidad} - ${taller.dias}</div>
            <small class="text-muted d-block mt-1">${taller.info}</small>
        `;

        item.onclick = () => {
            map.flyTo([taller.lat, taller.lng], 16);
            marker.openPopup();
        };

        listaContenedor.appendChild(item);
    });
}

// L0gica de Filtrado Avanzado Sincronizado 
function filtrarTalleres() {
    // Normalizamos lo que escribe el usuario (sin tildes, todo minúscula)
    const txt = normalizarTexto(filterTexto.value);
    const loc = normalizarTexto(filterLocalidad.value);
    const dias = normalizarTexto(filterDias.value);

    const items = document.querySelectorAll('.taller-item');

    items.forEach(item => {
        // Normalizamos los datos ocultos del HTML para comparar en igualdad de condiciones
        const nombreItem = normalizarTexto(item.dataset.nombre);
        const rubroItem = normalizarTexto(item.dataset.rubro);
        const locItem = normalizarTexto(item.dataset.localidad);
        const diasItem = normalizarTexto(item.dataset.dias);

        const coincidenTexto = nombreItem.includes(txt) || rubroItem.includes(txt);
        const coincideLocalidad = locItem.includes(loc);
        const coincideDias = diasItem.includes(dias);
        const idTaller = item.dataset.id;

        if (coincidenTexto && coincideLocalidad && coincideDias) {
            item.style.display = 'block';
            // Si coincide el filtro, nos aseguramos que el pin esté en el mapa
            if (!map.hasLayer(marcadoresActivos[idTaller])) {
                marcadoresActivos[idTaller].addTo(map);
            }
        } else {
            item.style.display = 'none';
            // Sincronización: Si no coincide el filtro, removemos el pin del mapa
            if (map.hasLayer(marcadoresActivos[idTaller])) {
                map.removeLayer(marcadoresActivos[idTaller]);
            }
        }
    });
}

// Listeners de los filtros avanzados
filterTexto.addEventListener('input', filtrarTalleres);
filterLocalidad.addEventListener('input', filtrarTalleres);
filterDias.addEventListener('input', filtrarTalleres);

// Carga inicial
window.onload = cargarInterfaz;