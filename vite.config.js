import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vite para GameZone (Semana 7 - PFY2201).
//
// base: './' usa rutas RELATIVAS para los assets generados (JS, CSS, imágenes).
// Esto es clave para GitHub Pages: como el sitio se publica en un subdirectorio
// (https://<usuario>.github.io/<repositorio>/) y no en la raíz del dominio,
// una base absoluta ("/") rompería la carga de los archivos. Con base relativa,
// el proyecto funciona igual sin importar el nombre del repositorio.
export default defineConfig({
  plugins: [react()],
  base: './',
})
