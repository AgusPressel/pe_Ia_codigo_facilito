# Especificación funcional — Aula Clara

## 1. Propósito

Aula Clara es una interfaz de demostración para centralizar la comunicación entre una escuela y las familias. Permite visualizar notificaciones, consultar respuestas, revisar alumnos y administrar configuraciones escolares de forma visual.

El proyecto actual es una aplicación frontend estática. No incluye autenticación, persistencia, envío real de mensajes ni integración con servicios externos.

## 2. Alcance

### Incluido

- Inicio con métricas, seguimiento de avisos y acciones prioritarias.
- Gestión visual de notificaciones.
- Registro temporal de alumnos.
- Registro temporal de grupos.
- Registro temporal de respuestas a avisos.
- Consulta de detalles de alumnos y notificaciones.
- Administración de secciones escolares.
- Diseño adaptable a escritorio, tablet y móvil.

### Fuera de alcance

- Inicio de sesión y roles reales.
- Guardado en base de datos.
- Envío real por WhatsApp o correo.
- Sincronización entre dispositivos.
- Gestión backend de permisos.
- Notificaciones push.
- Exportación e importación de datos.

## 3. Roles

### Administradora

La interfaz presenta una sesión demostrativa con Mariana Ruiz como administradora. Puede navegar, crear registros temporales y revisar información.

### Personal autorizado

Las secciones describen roles conceptuales de Dirección, Docentes y Administración, pero el prototipo no aplica restricciones reales.

## 4. Navegación

El sistema debe mostrar:

- Seguimiento de hoy (vista inicial; ver `specs/features/FOLLOWUP_QUEUE.md`).
- Inicio.
- Notificaciones.
- Alumnos.
- Administración.

Al seleccionar una sección:

1. Cambia la vista principal.
2. Actualiza la ruta visible en el encabezado.
3. Limpia las búsquedas anteriores.
4. Cierra el menú móvil.

La navegación móvil debe abrir y cerrar un panel lateral mediante el menú, el botón de cierre o la superposición.

## 5. Inicio

### Métricas

El inicio debe mostrar:

- Avisos activos.
- Respuestas pendientes.
- Entregas confirmadas.
- Datos incompletos.

### Seguimiento

Cada aviso debe mostrar:

- Título.
- Tipo.
- Grupo.
- Respuestas recibidas frente al total.
- Fecha límite.
- Estado visual.
- Acción para abrir el detalle.

Los filtros disponibles son:

- Todos.
- Por responder.
- Urgentes.

La búsqueda de notificaciones debe coincidir sin distinguir entre mayúsculas y minúsculas con título, grupo o tipo.

El área de atención debe mostrar tres casos prioritarios:

- Firmas pendientes.
- Documentación faltante.
- Confirmaciones sin responder.

## 6. Notificaciones

### Crear una notificación

Campos:

| Campo | Requerido | Valores |
|---|---:|---|
| Título | Sí | Texto libre |
| Tipo | Sí | Evento, Autorización, Vacunas, Retiro |
| Grupo destinatario | Sí | Grupos disponibles |
| Fecha límite | No | Fecha |
| Solicitar respuesta | No | Casilla |
| Requiere firma | No | Casilla |

Reglas:

- El título no puede quedar vacío.
- Si no se indica fecha, se muestra “Sin fecha”.
- La notificación se agrega al principio de la lista.
- El aviso comienza con cero respuestas y cero entregas.
- El estado inicial es “En seguimiento”.
- El cambio existe únicamente durante la sesión actual.

### Detalle

El detalle debe mostrar:

- Título, grupo, tipo y vencimiento.
- Respuestas recibidas y totales.
- Pendientes.
- Avisos entregados.
- Familias pendientes.
- Familias que respondieron.

Debe permitir registrar una respuesta individual una sola vez y preparar un recordatorio para pendientes. Estas acciones son demostrativas y no envían comunicaciones.

## 7. Alumnos

### Listado

Cada alumno debe mostrar:

- Nombre.
- Matrícula.
- Grupo.
- Padre o tutor.
- Teléfono.
- Información faltante.
- Progreso de la ficha.

La búsqueda debe coincidir con nombre, grupo o tutor. El filtro por grupo debe combinarse con la búsqueda.

### Crear alumno

Campos:

| Campo | Requerido |
|---|---:|
| Nombre del alumno | Sí |
| Grupo | Sí |
| Padre o tutor | Sí |
| Teléfono | Sí |
| Persona autorizada a retirar | No |
| Cartilla de vacunación recibida | No |

Reglas:

- Sin persona autorizada, la información faltante es “Persona autorizada”.
- Sin cartilla marcada, la información faltante es “Cartilla de vacunación”.
- Si ambos datos están completos, la información faltante es “Ficha completa”.
- El alumno se agrega al principio del listado temporal.
- Los datos no se guardan al recargar.

## 8. Administración

Las secciones desplegables son:

- Estructura escolar.
- Canales de comunicación.
- Tipos de notificación.
- Permisos del equipo.

La sección abierta debe cambiar al seleccionarla. Solo una sección puede mostrarse abierta.

### Agregar grupo

Campos:

| Campo | Requerido |
|---|---:|
| Nombre del grupo | Sí |

No se permiten nombres duplicados. Los grupos agregados deben estar disponibles para la creación de avisos y alumnos.

Las funciones marcadas como “Ajustes generales” o “Revisar permisos” deben indicar que están disponibles únicamente en una versión conectada.

## 9. Modales y mensajes

- Cerrar con el botón de cierre o Escape.
- Cerrar el formulario al hacer clic fuera del modal.
- Mantener foco accesible en el primer campo cuando corresponda.
- Mostrar mensajes temporales con estado accesible durante 3.6 segundos.

Los formularios deben evitar el envío nativo de navegador.

## 10. Datos demostrativos

Los datos iniciales se encuentran en memoria dentro de `public/app.js`. Los cambios no persisten entre recargas.

## 11. Criterios de aceptación

### Navegación

- Cada elemento del menú cambia correctamente la vista.
- La navegación móvil abre y cierra sin bloquear el contenido.
- La ruta visible corresponde a la sección activa.

### Búsqueda y filtros

- Una búsqueda vacía muestra todos los registros.
- Las coincidencias son insensibles a mayúsculas y minúsculas.
- Los filtros combinados muestran solamente registros coincidentes.

### Notificaciones

- No se puede crear un aviso sin título.
- El aviso nuevo aparece en la lista.
- El detalle calcula correctamente entregados, pendientes y respuestas.
- Una misma respuesta individual no puede registrarse dos veces.

### Alumnos y grupos

- El alumno nuevo aparece en el padrón temporal.
- Las reglas de información faltante se aplican correctamente.
- Los grupos duplicados no se agregan.
- El grupo nuevo aparece en los selectores disponibles.
