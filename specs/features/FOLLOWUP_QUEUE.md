# Feature: Seguimiento de hoy (cola de contacto por familia)

## Definición del problema

Mariana Ruiz (ver `specs/ICP.md`) necesita saber a quién contactar hoy. Hoy debe abrir cada aviso para ver qué familias faltan, y una familia con varios pendientes recibe varios mensajes. No queda registro de a quién ya se contactó.

## Diseño de la solución

Nueva vista **Seguimiento de hoy**, primera opción del menú y vista inicial. Reemplaza a Inicio como pantalla de entrada. Inicio sigue disponible con su contenido actual.

Estructura de la vista:

1. **Resumen del día** con tres cifras: familias por contactar, contactadas hoy y familias con aviso que vence en 48 h o menos.
2. **Cola de familias** agrupada por padre o tutor. Cada fila muestra el alumno, el tutor, el teléfono y los avisos pendientes con su vencimiento. Orden: vencimiento más cercano primero y, a igualdad, más avisos pendientes primero.
3. **Pestañas** `Por contactar` y `Contactadas`.
4. **Acciones por familia:**
   - `Preparar mensaje`: abre un modal con un texto que reúne todos los avisos pendientes de esa familia. Permite `Copiar mensaje` y `Marcar como contactada`. No se envía nada.
   - `Marcar contactada`: mueve la familia a Contactadas con la hora.
   - `Deshacer`: devuelve la familia a Por contactar.

Reglas:

- Una familia es un par alumno + tutor. Aparece una sola vez aunque tenga varios avisos pendientes.
- Un aviso cuenta como pendiente si el alumno pertenece al grupo destinatario y no tiene respuesta registrada.
- Si se registra la respuesta del alumno en el detalle del aviso, ese aviso desaparece de la fila. Si no quedan avisos, la familia sale de la cola.
- Los avisos sin fecha límite van al final y no cuentan para las 48 h.
- El estado Contactada vive solo en la sesión actual. No hay persistencia ni envío real.

Contrato de datos (se agrega a la notificación): `dueDays`, número de días desde hoy hasta el vencimiento, o `null` si no hay fecha. Para avisos nuevos se calcula desde la fecha elegida.

## Criterios de aceptación

1. **Cola ordenada y sin duplicados**
   - Al abrir la aplicación, la primera vista es Seguimiento de hoy.
   - Cada familia aparece una sola vez, con todos sus avisos pendientes.
   - La primera familia es la que tiene el vencimiento más cercano. Con empate, la que tiene más avisos pendientes.

2. **Resumen coherente**
   - `Por contactar` y `Contactadas hoy` coinciden con la cantidad de filas de cada pestaña.
   - `Vencen en 48 h` cuenta familias de la pestaña Por contactar con al menos un aviso pendiente con `dueDays` de 0 a 2.

3. **Preparar mensaje**
   - El modal nombra al tutor y al alumno y lista todos los avisos pendientes con su vencimiento.
   - `Copiar mensaje` muestra confirmación. Si el portapapeles no está disponible, muestra un aviso y no falla.
   - `Marcar como contactada` cierra el modal y mueve la familia a Contactadas.

4. **Contacto y reversa**
   - `Marcar contactada` mueve a la familia a Contactadas en un clic y muestra la hora.
   - `Deshacer` la devuelve a Por contactar en su posición original.
   - Recargar la página reinicia el estado.

5. **Integración con avisos**
   - Registrar una respuesta en el detalle de un aviso quita ese aviso de la fila de la familia.
   - Un aviso creado con fecha de mañana aparece en la cola de sus familias con vencimiento de 1 día.

6. **Accesibilidad y responsividad**
   - Escape y clic fuera cierran el modal. El foco queda en el modal al abrirlo.
   - Todos los botones tienen nombre accesible.
   - La vista funciona a 1280, 768 y 375 px sin desborde horizontal.

## Métricas de éxito

Las metas aplican a escuelas piloto en la versión conectada. La demostración publicada no tiene analítica ni persistencia: ahí solo se pueden verificar las cifras del resumen.

| Métrica | Línea base | Meta a 30 días | Cómo se mide |
|---|---|---|---|
| Tiempo diario de seguimiento por administradora | 30 a 40 min | 10 min o menos | Cronometrado con 3 escuelas piloto, antes y después |
| Tiempo desde abrir la app hasta contactar a las primeras 5 familias | No existe | 2 min o menos | Prueba de uso con la persona usuaria |
| Familias con aviso que vence en 48 h contactadas antes del vencimiento | ~40% (estimado) | 90% o más | Evento de contacto frente a vencimiento |
| Respuestas recibidas al vencimiento | ~65% (estimado) | 85% o más | Respondieron / total al vencimiento |
| Mensajes enviados por familia y aviso | ~2,5 (estimado) | 1 | Mensajes por familia en el período |
| Adopción: días con la vista abierta, por semana | 0 | 4 de 5 días hábiles | Uso diario en las escuelas piloto |

Las líneas base marcadas como estimadas son supuestos del ICP que deben confirmarse con las escuelas piloto antes de dar la meta por cumplida.
