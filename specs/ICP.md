# ICP y user persona — Aula Clara

## Problema que atacamos

Las escuelas saben qué avisos enviaron, pero no saben con claridad qué familias no respondieron ni a quién contactar primero. El seguimiento se hace a mano (planillas, chats sueltos, llamadas) y se descubren los faltantes cuando el plazo ya venció.

## ICP (cliente ideal)

| Dimensión | Definición |
|---|---|
| Tipo de organización | Colegio privado o subvencionado de nivel Inicial y Primaria |
| Tamaño | 150 a 600 alumnos, 8 a 30 docentes, 1 a 3 personas en administración |
| Región | Argentina y Latinoamérica hispanohablante |
| Canal actual | WhatsApp (grupos y mensajes individuales), cuaderno de comunicaciones, planillas de cálculo |
| Disparador de compra | Una salida educativa, un acto o un trámite de vacunas donde faltaron firmas o respuestas |
| Presupuesto | Bajo; adopta herramientas con prueba gratuita y sin instalación |
| Madurez técnica | Baja: no tiene área de sistemas, decide la dirección |
| Quién decide | Dirección o gerencia administrativa |
| Quién usa | Administración, a diario |

### Señales de que NO es ICP

- Universidades o colegios con más de 2.000 alumnos y un sistema de gestión propio.
- Escuelas que ya usan un LMS con mensajería y seguimiento de respuestas.

## User persona: Mariana Ruiz

**Rol:** administradora del Colegio Horizonte (Primaria y Jardín, ~300 alumnos).
**Edad:** 41 años. **Experiencia:** 12 años en la escuela.

**Contexto de trabajo**
- Gestiona avisos, autorizaciones, vacunas y retiros para 12 grupos.
- Usa WhatsApp desde el celular entre tareas y la computadora de administración en horario de oficina.
- Atiende a las familias en puerta, por teléfono y por mensajes, con interrupciones constantes.

**Objetivos**
- Llegar al vencimiento de cada aviso con todas las respuestas y firmas.
- Contactar a cada familia una sola vez, con un mensaje claro.
- Poder decirle a Dirección, sin armar una planilla, cómo va cada aviso.

**Frustraciones**
- Revisa aviso por aviso para saber quién falta.
- Una misma familia le debe tres cosas y termina escribiéndole tres veces.
- No tiene registro de a quién ya contactó, así que repite o se olvida.
- Se entera de que faltan firmas el mismo día de la salida.

**Comportamiento y herramientas**
- Dedica entre 30 y 40 minutos por día a perseguir respuestas.
- Prioriza por vencimiento: lo que vence hoy o mañana va primero.
- Valora herramientas simples: si requiere capacitación, no la usa.

**Frase que la define**
"No necesito más avisos. Necesito saber a quién llamar hoy."

## Cómo se refleja en el producto

| Necesidad de Mariana | Respuesta del producto |
|---|---|
| Saber a quién contactar hoy | Vista **Seguimiento de hoy** con familias ordenadas por vencimiento |
| Contactar una vez por familia | Pendientes agrupados por familia, con un mensaje que reúne todos los avisos |
| No repetir ni olvidar | Estado Contactada, con hora y opción de deshacer |
| Reportar a Dirección | Resumen del día: por contactar, contactadas y vencen en 48 h |
