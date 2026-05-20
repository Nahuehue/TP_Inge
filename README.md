# Portal de Talleres Culturales - UNGS
## Prueba de Concepto - Reentrega (Entrega 1)

Este repositorio contiene la implementación refactorizada de la Prueba de Concepto (PoC) correspondiente a la primera entrega del TP.

Para esta versión se priorizó la cohesión y el bajo acoplamiento, segregando los flujos de experiencia de usuario en dos perfiles distintos (Colaborador y Visitante) e incorporando persistencia de datos en el lado del cliente.

### Estructura del Repositorio

- **`index.html`**: Punto de entrada al sistema (Landing Page) que permite seleccionar el perfil de acceso.
- **`inscripcion.html`**: Interfaz exclusiva para el perfil Colaborador.
- **`busqueda.html`**: Interfaz exclusiva para el perfil Visitante, que integra los filtros y el mapa interactivo.
- **`css/styles.css`**: Hoja de estilos del sistema.
- **`js/data.js`**: Emula la base de datos implementando persistencia mediante `localStorage`, asegurando que las inscripciones impacten en el sistema para consultas posteriores.
- **`js/inscripcion.js`**: Maneja la lógica del formulario, la validación estricta de campos obligatorios y el guardado de nuevos talleres.
- **`js/busqueda.js`**: Implementa el motor de búsqueda avanzada (con normalización de texto) y la sincronización bidireccional entre la lista de resultados y los marcadores de la API de Leaflet.

### Requerimientos Funcionales Implementados

El prototipo valida la factibilidad de los siguientes identificadores actualizados del análisis:

* **RF01 - Registro de colaboradores**: Captura de datos personales y del taller, asignando el estado inicial correspondiente.
* **RF02 - Datos de talleres particulares**: Lógica dinámica que habilita la carga de dirección, días y horarios si el taller no se dicta en la sede.
* **RF03 - Validación de datos ingresados**: Verificación en tiempo real de los campos obligatorios.
* **RF07 - Ubicación del centro cultural**: Asociación automática de coordenadas predefinidas para la Sede Central.
* **RF08 - Búsqueda de talleres**: Filtros interactivos por nombre, rubro, localidad y días, mostrando resultados sincronizados con las referencias geográficas.

### Requerimientos No Funcionales Destacados

* **RNF07 - Mantenibilidad**: El código fue modularizado separando responsabilidades por funcionalidad (inscripción, búsqueda, mapa y datos) para facilitar futuras modificaciones.

### Instrucciones de Ejecución

1. Clonar o descargar el contenido del repositorio.
2. Ejecutar el archivo principal `index.html` en un navegador web. 

---
Universidad Nacional de General Sarmiento
Ingeniería de Software - Grupo 1
