# Especificación técnica — Aula Clara

## 1. Arquitectura

Aplicación web estática compuesta por:

- `public/index.html`: estructura base y contenedores.
- `public/app.js`: datos, estado, renderizado, eventos y modales.
- `public/styles.css`: diseño, componentes y responsividad.
- `vercel.json`: publicación y cabeceras HTTP.

No existe proceso de compilación ni servidor de aplicación.

## 2. Ejecución

El directorio `public` debe servir sus archivos directamente. En Vercel, la configuración publica ese directorio como salida estática.

Comandos sugeridos para desarrollo local:

```powershell
python -m http.server 8080 --directory public
```

URL local: `http://localhost:8080`

## 3. Estado de la aplicación

El estado principal es un objeto JavaScript en memoria:

```text
view
filter
search
studentSearch
studentGroup
modal
detailTab
adminOpen
mobileNavOpen
```

Las colecciones principales son `notices`, `students` y `groups`. Los cambios se pierden al actualizar o cerrar la página.

## 4. Renderizado

La aplicación usa renderizado imperativo:

1. `render()` selecciona la vista activa.
2. Genera HTML como cadena.
3. Asigna el resultado a los contenedores existentes.
4. Renderiza el modal cuando corresponde.

El renderizado completo debe ejecutarse después de cambios de navegación, filtros o datos.

## 5. Seguridad de presentación

Todo texto dinámico se debe escapar antes de insertarlo en HTML mediante una función compatible con:

- `&`
- `<`
- `>`
- `"`
- `'`

No se deben interpolar datos sin escape en atributos o contenido HTML.

## 6. Eventos

Se utilizan delegaciones globales para:

- Click.
- Entrada de texto.
- Cambio de selectores.
- Envío de formularios.
- Escape y navegación mediante teclado.

Las acciones deben identificarse mediante el atributo `data-action`.

## 7. Contratos de datos

### Notificación

```text
{
  id,
  title,
  type,
  group,
  date,
  total,
  confirmed,
  delivered,
  status,
  icon,
  urgent,
  needsSignature,
  needsReply,
  respondedIds,
  dueDays
}
```

`dueDays` es opcional: días desde hoy hasta el vencimiento, o `null` sin fecha (ver `specs/features/FOLLOWUP_QUEUE.md`). El estado `contacted` (id de alumno a hora de contacto) vive en memoria.

`respondedIds` es opcional. No debe permitir duplicados al registrar respuestas.

### Alumno

```text
{
  id,
  name,
  room,
  guardian,
  phone,
  pickupPerson,
  missing,
  tone
}
```

## 8. Reglas de formato

- Fechas de fecha límite: formato localizado corto en español.
- Matrículas temporales de alumnos: prefijo `AL-` y cuatro últimos dígitos del timestamp.
- IDs temporales de avisos: timestamp en milisegundos.
- Iniciales: máximo dos letras, derivadas de las palabras del nombre.

## 9. Accesibilidad

Requisitos mínimos:

- Controles con nombre accesible.
- Botones con texto visible o etiqueta `aria-label`.
- Tabs con `role="tab"` y `aria-selected`.
- Modal con `role="dialog"` y `aria-modal="true"`.
- Región de mensajes con `role="status"` y atributos `aria-live`.
- Navegación en teclado para filas y modales.
- Estado visible para foco de controles.

## 10. Responsividad

Los puntos principales son:

- `1160 px`: sidebar y columnas reducidas.
- `970 px`: panel principal y métricas reorganizadas.
- `680 px`: navegación lateral móvil y una sola columna.

Las tablas deben conservar acceso horizontal mediante sus contenedores desplazables.

## 11. Cabeceras HTTP

`vercel.json` define:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security`
- `X-Frame-Options: SAMEORIGIN`
- `Permissions-Policy` sin cámara, micrófono ni geolocalización
- `Content-Security-Policy` restringida a recursos propios, datos y estilos seguros

No se deben agregar dependencias externas de JavaScript o imágenes sin evaluar y actualizar la política CSP.

## 12. Pruebas manuales

Como el proyecto no contiene framework de pruebas, cada cambio debe comprobar al menos:

1. Inicio y navegación completa.
2. Búsqueda y filtros de avisos.
3. Creación de notificación válida e inválida.
4. Apertura y cierre de detalle.
5. Registro de respuesta sin duplicados.
6. Creación de alumno y cálculo de estado.
7. Creación de grupo y disponibilidad en formularios.
8. Navegación móvil.
9. Escape para cerrar modal.
10. Recarga para confirmar que los datos temporales no persisten.
11. Revisión de consola sin errores.
