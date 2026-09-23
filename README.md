# GameZone — Semana 7 (PFY2201)

Componentes funcionales en React para un eCommerce interactivo. Reconstruye el catálogo y carrito de GameZone (trabajado en semanas anteriores con HTML/JS/Bootstrap) como una SPA de **React 18 + Vite**.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación y ejecución local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` en el navegador. Los cambios en el código se reflejan al instante (Hot Module Replacement de Vite).

## Build de producción

```bash
npm run build
npm run preview   # para probar el build localmente antes de publicarlo
```

Genera la carpeta `dist/` con los archivos estáticos finales, listos para publicar en cualquier hosting estático (incluido GitHub Pages).

## Publicar en GitHub Pages (rama `gh-pages`)

Este proyecto ya incluye el paquete [`gh-pages`](https://www.npmjs.com/package/gh-pages) como dependencia de desarrollo y el script `deploy` en `package.json`. Pasos:

1. Crea el repositorio en GitHub y sube el proyecto (ver más abajo).
2. Ejecuta:
   ```bash
   npm run deploy
   ```
   Esto compila el proyecto (`predeploy` corre `npm run build` automáticamente) y publica el contenido de `dist/` en una rama `gh-pages` real del repositorio.
3. En GitHub → *Settings → Pages*, confirma que la fuente sea la rama `gh-pages` (carpeta raíz `/`).
4. El sitio queda disponible en `https://<tu-usuario>.github.io/<nombre-del-repositorio>/`.

`vite.config.js` usa `base: './'` (rutas relativas), así que este flujo funciona sin importar el nombre exacto del repositorio.

## Subir el proyecto a GitHub (primera vez)

```bash
git init
git add .
git commit -m "Componentes funcionales en React - Semana 7 PFY2201"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/<tu-repositorio>.git
git push -u origin main
npm run deploy
```

> `node_modules/` y `dist/` están en `.gitignore` — nunca se suben al repositorio. `npm install` los regenera.

## Estructura del proyecto

```
FernandoFuentes_ComponentesFuncionalesReact_S7/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── img/                  # imágenes de productos
├── src/
│   ├── main.jsx               # punto de entrada de React
│   ├── App.jsx                 # estado del carrito (lifting state up)
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProductList.jsx     # catálogo, búsqueda (onChange), carga simulada (useEffect)
│   │   ├── ProductCard.jsx     # tarjeta de producto, oferta condicional, onClick
│   │   ├── ShoppingCart.jsx    # panel del carrito, renderizado condicional
│   │   ├── CartItem.jsx        # fila individual del carrito
│   │   ├── CartTotal.jsx       # cálculo del total (.reduce())
│   │   └── Footer.jsx
│   ├── data/
│   │   └── productos.js        # catálogo de productos (nombre, precio, oferta, descripción, imagen)
│   └── styles/
│       └── app.css
└── docs/
    └── FernandoFuentes_PFY2201_EXP3_S7.docx   # evidencia visual de todas las funcionalidades
```

## Funcionalidades implementadas

- Listado de productos con nombre, precio normal, precio de oferta (cuando aplica), descripción e imagen.
- Carrito de compras: agregar, eliminar, contador de unidades y total, con precios de oferta aplicados automáticamente.
- Componentes funcionales modulares y reutilizables (`ProductCard`, `CartItem`, `CartTotal`, etc.), cada uno con una única responsabilidad.
- Eventos de usuario: `onClick` (agregar/quitar del carrito, vaciar carrito, menú móvil) y `onChange` (búsqueda de productos).
- Renderizado condicional: estado de carga inicial, carrito vacío, insignia de oferta, mensaje de "sin resultados" en la búsqueda, y menú móvil colapsable.
- Código organizado en funciones y componentes reutilizables, comentado explicando el propósito de cada bloque.

## Autor

Fernando Fuentes Allende — Desarrollo Frontend I (PFY2201) — Duoc UC
