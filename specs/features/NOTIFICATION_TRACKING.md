# Feature: seguimiento completo de notificaciones

## Definición del problema

La escuela necesita saber qué familias recibieron un aviso, quién respondió y quién debe recibir seguimiento. La interfaz actual permite ver contadores, pero el flujo no garantiza un seguimiento consistente al crear, consultar y actualizar una notificación.

El usuario principal es Mariana Ruiz, administradora del Colegio Horizonte, quien necesita revisar una comunicación y convertir pendientes en respuestas o recordatorios sin salir del contexto del aviso.

## Diseño de la solución

Implementar un flujo único de seguimiento de notificaciones con tres estados visibles:

- Creada: la notificación existe y tiene cero respuestas.
- Pendiente: quedan familias sin respuesta.
- Respondió: una familia fue registrada como respuesta.

Cada tarjeta, fila y detalle debe usar los mismos datos calculados. Al abrir una notificación, el usuario podrá cambiar entre las listas Pendientes y Respondieron, registrar una respuesta individual una sola vez y preparar un recordatorio para pendientes.

La creación debe validar título y mostrar una confirmación. Los contadores de respuestas, entregas y pendientes se recalcularán inmediatamente, sin persistencia ni integración externa.

## Criterios de aceptación

1. **Creación válida e inválida**
   - Dado que se completa el título, al crear la notificación, aparece primero en el listado y muestra `0` respuestas frente al total calculado.
   - Dado que el título contiene solo espacios o está vacío, el formulario impide la creación y permanece abierto.

2. **Consistencia de detalle**
   - Al abrir una notificación, el detalle muestra el título, grupo, tipo, fecha límite, cantidad de respuestas recibidas, pendientes y entregadas.
   - Los contadores se derivan del total, entregas y respuestas registradas sin mostrar valores contradictorios.

3. **Registro de una respuesta**
   - Al pulsar `Registrar respuesta` sobre una familia pendiente, esa familia pasa a Respondieron, el contador de confirmadas aumenta exactamente en uno y el contador pendiente disminuye exactamente en uno.
   - Una misma familia no puede registrarse dos veces en la misma notificación.

4. **Búsqueda y seguimiento**
   - Al buscar por título, grupo o tipo sin distinguir mayúsculas, solo aparecen las coincidencias.
   - Al abrir las pestañas `Pendientes` y `Respondieron`, cada lista contiene únicamente familias de su estado correspondiente.

5. **Acciones y accesibilidad**
   - Escape, el botón de cierre y el clic fuera del modal cierran el detalle.
   - El recordatorio de pendientes muestra confirmación y el usuario puede cerrar el flujo sin que se envíe ningún mensaje real.
