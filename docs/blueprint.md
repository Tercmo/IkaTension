# **App Name**: IkaTension

## Core Features:

- Blood Pressure Input: Provide clear input fields for systolic and diastolic blood pressure values, with an optional pulse field.
- Automatic Timestamp: Automatically record the exact date and time when a blood pressure reading is saved.
- CSV Export: Implement functionality to export all saved blood pressure records to a CSV file.

## Style Guidelines:

- Primary color: Use a calming blue (#A0C4FF) to promote a sense of health and well-being.
- Secondary color: Light gray (#F0F0F0) for backgrounds to ensure readability and a clean interface.
- Accent: Teal (#64CCC9) for interactive elements such as buttons and links.
- Maintain a simple and clean layout with clear sections for data input, display, and export.
- Use recognizable icons for actions like 'Save,' 'Export,' and 'Theme Switch.'
- Subtle transitions for theme switching and data saving to enhance user experience.

## Original User Request:
1. Objetivo Principal:
Desarrollar una aplicación web sencilla e intuitiva que permita a los usuarios registrar, guardar y gestionar sus lecturas de tensión arterial.

2. Funcionalidades Clave:

Entrada de Datos:
Proporcionar campos claros para que el usuario ingrese sus valores de tensión arterial (presión sistólica y diastólica). Se podría considerar añadir un campo opcional para el pulso.
Guardado de Registros:
Incluir un botón claramente visible (ej. "Guardar Registro", "Save Record") para guardar la lectura de tensión ingresada.
Timestamp Automático: Al presionar el botón de guardar, la aplicación debe registrar y almacenar automáticamente la fecha y hora exactas en que se guardó el registro. Esta información debe asociarse a cada lectura guardada.
Visualización de Registros:
Mostrar los registros guardados en un formato claro y ordenado (por ejemplo, una tabla o una lista cronológica). Cada entrada debe mostrar la fecha, hora y los valores de tensión registrados.
Exportación de Datos:
Implementar una función que permita al usuario exportar todos los registros de tensión guardados a un archivo en formato CSV (Comma Separated Values). Debe haber un botón dedicado para esta acción (ej. "Exportar a CSV", "Export to CSV"). (Nota: Si prefieres un botón por cada registro individual, especifícalo, aunque es menos común).
3. Diseño y Experiencia de Usuario (UI/UX):

Diseño Responsivo: La interfaz de la aplicación debe adaptarse fluidamente a diferentes tamaños de pantalla (escritorios, tabletas, móviles).
Tema Claro/Oscuro:
Incorporar un botón o interruptor que permita al usuario cambiar entre un tema visual claro y un tema oscuro.
La preferencia de tema del usuario debería recordarse (ej. usando localStorage).
Estilo Visual: Mantener un diseño general sencillo, limpio y fácil de usar, priorizando la funcionalidad y la legibilidad.
Internacionalización (i18n):
La interfaz de usuario (textos, etiquetas, botones) debe estar disponible en Español e Inglés.
La aplicación debe detectar automáticamente el idioma preferido del navegador del usuario y mostrar la interfaz en ese idioma por defecto. Si el idioma del navegador no es ni español ni inglés, se puede establecer un idioma predeterminado (ej. inglés).
(Opcional, pero recomendado) Permitir al usuario cambiar manualmente el idioma si lo desea, independientemente de la configuración del navegador.
4. Atribución:

Incluir una mención al diseñador "ikaladev" en un lugar apropiado y discreto (por ejemplo, en el pie de página o en una sección "Acerca de").

La aplicación se llama ikatension
  