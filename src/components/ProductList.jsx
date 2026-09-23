import { useEffect, useState } from 'react'
import ProductCard from './ProductCard.jsx'

/**
 * ProductList — sección de catálogo.
 *
 * Recibe el arreglo completo de productos como prop (viene de App, que a su
 * vez lo importa desde data/productos.js) y la función onAddToCart a pasar
 * hacia cada ProductCard. Internamente maneja DOS estados propios:
 *
 *  1. cargando (useState + useEffect): simula una carga inicial del
 *     catálogo. Es una demostración intencional de useEffect con un array
 *     de dependencias vacío ([]) — se ejecuta UNA SOLA VEZ, justo después
 *     del primer renderizado, tal como describe la guía de la semana.
 *
 *  2. busqueda (useState, controlado por un <input onChange>): filtra el
 *     catálogo por nombre en tiempo real, sin recargar nada.
 *
 * Ambos estados alimentan renderizado condicional: mientras cargando es
 * true se muestra un spinner; si la búsqueda no encuentra coincidencias se
 * muestra un mensaje en vez de una grilla vacía.
 */
function ProductList({ productos, onAddToCart }) {
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    // Simula la latencia real de un catálogo cargado desde un servidor.
    // El array de dependencias vacío [] asegura que esto corra solo al
    // montar el componente, no en cada re-render.
    const temporizador = setTimeout(() => setCargando(false), 600)

    // Función de limpieza: cancela el temporizador si el componente se
    // desmonta antes de que termine (buena práctica con useEffect).
    return () => clearTimeout(temporizador)
  }, [])

  // Evento onChange: se ejecuta en cada tecleo del input de búsqueda.
  function manejarCambioBusqueda(evento) {
    setBusqueda(evento.target.value)
  }

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  )

  return (
    <section id="catalogo" aria-labelledby="tituloCatalogo">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h2 id="tituloCatalogo" className="mb-0">
          Catálogo de productos
        </h2>
        <span className="badge text-bg-secondary">{productosFiltrados.length} producto(s)</span>
      </div>

      <div className="mb-3">
        <label htmlFor="inputBusqueda" className="visually-hidden">
          Buscar productos
        </label>
        <input
          id="inputBusqueda"
          type="search"
          className="form-control"
          placeholder="Buscar productos por nombre..."
          value={busqueda}
          onChange={manejarCambioBusqueda}
        />
      </div>

      {/* Renderizado condicional #1: catálogo "cargando" vs. catálogo listo */}
      {cargando ? (
        <div className="d-flex align-items-center gap-2 text-secondary py-4">
          <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
          <span>Cargando catálogo...</span>
        </div>
      ) : productosFiltrados.length === 0 ? (
        // Renderizado condicional #2: sin resultados de búsqueda
        <p className="text-secondary">No se encontraron productos para "{busqueda}".</p>
      ) : (
        <div className="row g-3">
          {productosFiltrados.map((producto) => (
            // key es obligatorio en listas de React: le permite identificar
            // qué elemento cambió, se agregó o se eliminó sin recrear todo.
            <ProductCard key={producto.id} producto={producto} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductList
