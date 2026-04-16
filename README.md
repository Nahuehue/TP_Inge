# Portal de Talleres Culturales - UNGS
## Prueba de Concepto - Entrega 1

Este repositorio contiene la implementación de la Prueba de Concepto (PoC) correspondiente a la primera entrega de la asignatura Ingeniería de Software de la Universidad Nacional de General Sarmiento. El objetivo es validar los requerimientos funcionales y no funcionales críticos detectados durante la fase de análisis.

### Descripción del Proyecto

El sistema es un portal web diseñado para centralizar la oferta de talleres culturales. Permite a los colaboradores registrar actividades y a los ciudadanos realizar búsquedas interactivas mediante la integración de un sistema de información geográfica.

### Estructura del Repositorio

- **index.html**: Define la estructura de la interfaz de usuario, incluyendo el formulario de inscripción y el contenedor del mapa interactivo.
- **css/styles.css**: Contiene la hoja de estilos necesaria para la correcta visualización de los componentes y la disposición de la interfaz dual (lista y mapa).
- **js/data.js**: Define la estructura de datos en formato JSON que simula el repositorio de información del sistema.
- **js/main.js**: Implementa la lógica de la aplicación, el motor de búsqueda en tiempo real y la integración con la API de mapas.

### Requerimientos Funcionales Implementados

El prototipo valida la factibilidad de los siguientes identificadores del análisis:

1. **RF01 - Inscripción de Miembros**: Captura de datos de colaboradores y talleres.
2. **RF05 - Búsqueda Interactiva**: Filtrado dinámico de actividades según criterios de búsqueda.
3. **RF10 - Datos de Talleres Particulares**: Lógica para el registro de direcciones específicas fuera de la sede.
4. **RF11 - Ubicación del Centro Cultural**: Asociación automática de la localización de la sede central de la UNGS.

### Requerimientos No Funcionales

- **RNF01 - Disponibilidad**: El sistema está diseñado para operar de manera continua mediante el consumo de servicios de mapas estables (CartoDB/OpenStreetMap).
- **RNF02 - Usabilidad**: Interfaz limpia y declarativa desarrollada sobre el framework Bootstrap 5.

### Guía de Ejecución

1. Clonar o descargar el contenido del repositorio.
2. Ejecutar el archivo `index.html` en un navegador web.
3. Se recomienda el uso de un entorno de servidor local (como Live Server en VS Code) para asegurar la carga correcta de todos los recursos externos/ Pero cliqueando dos veces index.html también debería funcionar.

---
Universidad Nacional de General Sarmiento
Ingeniería de Software