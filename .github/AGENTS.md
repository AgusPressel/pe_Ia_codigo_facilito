# Instrucciones generales del proyecto

## Stack

- Aplicación web estática servida desde `public/`.
- JavaScript vanilla sin frameworks ni proceso de compilación.
- HTML semántico, CSS responsivo y renderizado desde `public/app.js`.
- Despliegue en Vercel mediante `vercel.json`.

## Reglas

- Antes de implementar, leer la spec relevante dentro de `specs/`.
- Implementar de acuerdo con el comportamiento de la spec; si una spec no representa el resultado verificable, corregirla antes del código.
- Mantener un feature por iteración y evitar cambios ajenos al alcance.
- Conservar el español como idioma de la interfaz.
- Mantener datos e operaciones como demostración local y no persistente, salvo que una spec indique persistencia.
- No agregar backend, bases de datos, autenticación, SDK o servicios externos sin una especificación explícita.

## Código

- Seguir los patrones existentes de funciones de renderizado y delegación de eventos en `public/app.js`.
- Escapar todo contenido dinámico antes de interpolarlo en HTML.
- Mantener clases CSS y nombres visuales ya existentes.
- No usar inline scripts ni dependencias externas que rompan la CSP actual.
- Agregar comentarios solo cuando una regla no sea evidente.

## Diseño

- Usar la skill `.github/skills/aula-clara-brand/SKILL.md` para cambios visuales o decisiones de marca.
- Conservar los tokens visuales existentes: verde institucional, superficies blancas, fondo gris-verde, bordes suaves y tipografía legible.
- Verificar escritorio, móvil y estados de modal.

## Validación

- Servir la aplicación con `python -m http.server 8080 --directory public`.
- Validar los criterios de aceptación de la feature, preferentemente con Playwright o pruebas manuales reproducibles.
- Revisar errores de consola, accesibilidad básica, navegación con teclado y cierre de modales.
- Ejecutar siempre la validación más pequeña que cubra el cambio.
