const tipoTallerSelect = document.getElementById('tipo-taller');
const contenedorDireccion = document.getElementById('contenedor-direccion');
const inputDireccion = document.getElementById('input-direccion');
const formInscripcion = document.getElementById('form-inscripcion');
const divAlerta = document.getElementById('mensaje-alerta');

// Manejo dinamico del campo dirección (Validacion estricta )
tipoTallerSelect.addEventListener('change', () => {
    if (tipoTallerSelect.value === 'particular') {
        contenedorDireccion.style.display = 'block';
        inputDireccion.setAttribute('required', 'true');
    } else {
        contenedorDireccion.style.display = 'none';
        inputDireccion.removeAttribute('required');
        inputDireccion.value = '';
    }
});

formInscripcion.addEventListener('submit', (e) => {
    e.preventDefault();

    const esSede = tipoTallerSelect.value === 'sede';
    const direccionFinal = esSede ? 'Sede Central UNGS - Juan María Gutiérrez 1150' : inputDireccion.value;

    // Hardcodeamos coordenadas simuladas cerca de la zona para el ejemplo segun el tipo
    const latSimulada = esSede ? -34.5221 : -34.5400 + (Math.random() * 0.01);
    const lngSimulada = esSede ? -58.7000 : -58.7100 + (Math.random() * 0.01);

    const nuevoTaller = {
        id: Date.now(), // ID único temporal
        nombre: document.getElementById('taller-nombre').value,
        rubro: document.getElementById('taller-rubro').value,
        info: direccionFinal,
        localidad: document.getElementById('taller-localidad').value,
        dias: document.getElementById('taller-dias').value,
        lat: latSimulada,
        lng: lngSimulada,
        esSede: esSede
    };

    // Impacto real en el sistema: guardamos en localStorage
    guardarTaller(nuevoTaller);

    // Notificacion visual de exito en la interfaz (No un alert molesto)
    divAlerta.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>¡Registro Exitoso!</strong> El taller "${nuevoTaller.nombre}" fue guardado y quedó en estado PENDIENTE de aprobación.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    formInscripcion.reset();
    contenedorDireccion.style.display = 'none';
    inputDireccion.removeAttribute('required');
});