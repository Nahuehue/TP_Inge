const TALLERES_INICIALES = [
    //Agrege mas campos al json asi es mas facil filtrar.
    {
        id: 1,
        nombre: "Taller de Guitarra",
        rubro: "Musica",
        info: "Sede Central UNGS - Juan María Gutiérrez 1150",
        localidad: "Malvinas Argentinas",
        dias: "Lunes y Miércoles",
        lat: -34.5221,
        lng: -58.7000,
        esSede: true
    },
    {
        id: 2,
        nombre: "Taller de Teatro Integral",
        rubro: "Teatro",
        info: "Centro Cultural San Miguel - Belgrano 1240",
        localidad: "San Miguel",
        dias: "Martes y Jueves",
        lat: -34.5425,
        lng: -58.7118,
        esSede: false
    },
    {
        id: 3,
        nombre: "Taller Municipal de San Miguel",
        rubro: "Cultura",
        info: "Municipalidad de San Miguel - Sarmiento 1551",
        localidad: "San Miguel",
        dias: "Sábados",
        lat: -34.5422,
        lng: -58.7121,
        esSede: false
    }
];

// Si no existen talleres en el localStorage, cargamos los iniciales
if (!localStorage.getItem('talleres')) {
    localStorage.setItem('talleres', JSON.stringify(TALLERES_INICIALES));
}

// Función auxiliar para obtener los talleres actualizados
function obtenerTalleres() {
    return JSON.stringify(localStorage.getItem('talleres')) ? JSON.parse(localStorage.getItem('talleres')) : [];
}

// Función auxiliar para guardar un nuevo taller
function guardarTaller(nuevoTaller) {
    const talleres = obtenerTalleres();
    talleres.push(nuevoTaller);
    localStorage.setItem('talleres', JSON.stringify(talleres));
}