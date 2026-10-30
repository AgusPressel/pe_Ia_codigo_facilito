import "./globals.css"

export const metadata = {
  title: "Aula Clara — Comunicación escolar",
  description: "Organiza las notificaciones de tu escuela, sigue las respuestas de las familias y encuentra rápidamente la información que falta.",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f8f5",
}

export default function RootLayout({ children }) {
  return <html lang="es"><body>{children}</body></html>
}
