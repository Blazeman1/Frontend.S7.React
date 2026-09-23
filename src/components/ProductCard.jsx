import { useEffect, useState } from 'react'

/**
 * ProductCard — tarjeta de un único producto.
 *
 * Es un componente funcional "tonto" (presentacional): recibe todos sus
 * datos por props (producto) y una función (onAddToCart) que ejecuta al
 * hacer clic, pero no conoce ni modifica el carrito directamente. Esto es
 * clave para la reutilización y la modularidad: ProductCard no sabe si lo
 * usa una lista de 9 productos o de 900, ni cómo está implementado el
 * carrito — solo expone un evento hacia arriba.
 *
 * También mantiene un estadito propio y efímero (agregado) que NO necesita
 * vivir en App porque a nadie más le importa: solo controla el feedback
 * visual "✓ Agregado" durante un segundo tras el clic.
 */
function ProductCard({ producto, onAddToCart }) {
  const [agregado, setAgregado] = useState(false)

  // Renderizado condicional temporizado: cuando agregado pasa a true,
  // programamos que vuelva a false 1 segundo después.
  useEffect(() => {
    if (!agregado) return
    const temporizador = setTimeout(() => setAgregado(false), 1000)
    return () => clearTimeout(temporizador)
  }, [agregado])

  // Un producto está "en oferta" solo si tiene un precioOferta definido Y
  // ese precio es efectivamente menor al normal. Esta condición se evalúa
  // una vez y se reutiliza en el JSX de abajo (evita repetir la lógica).
  const tieneOferta = producto.precioOferta != null && producto.precioOferta < producto.precioNormal

  function manejarClicAgregar() {
    onAddToCart(producto)
    setAgregado(true)
  }

  return (
    <div className="col-12 col-sm-6 col-xl-4">
      <div className="card producto-card shadow-sm h-100">
        <div className="position-relative">
          <img src={producto.imagen} alt={producto.nombre} className="card-img-top" loading="lazy" />
          {/* Renderizado condicional: la insignia "Oferta" solo aparece si tieneOferta es true */}
          {tieneOferta && <span className="badge bg-danger badge-oferta">Oferta</span>}
        </div>

        <div className="card-body d-flex flex-column">
          <span className="badge text-bg-secondary align-self-start mb-2">{producto.categoria}</span>
          <h3 className="h6">{producto.nombre}</h3>
          <p className="text-secondary small mb-2">{producto.descripcion}</p>

          {/* Renderizado condicional de precios: con oferta muestra ambos precios,
              sin oferta solo muestra el precio normal. */}
          <div className="mb-2">
            {tieneOferta ? (
              <>
                <span className="precio-anterior me-2">{formatearPrecio(producto.precioNormal)}</span>
                <span className="precio-oferta">{formatearPrecio(producto.precioOferta)}</span>
              </>
            ) : (
              <span className="precio-normal">{formatearPrecio(producto.precioNormal)}</span>
            )}
          </div>

          {/* onClick: evento de usuario que dispara handleAddToCart en App a través de props.
              data-testid es un identificador ESTABLE (no cambia aunque el texto del botón
              sí lo haga con el feedback "✓ Agregado"), útil tanto para pruebas automatizadas
              como para accesibilidad si más adelante se necesita apuntar este botón. */}
          <button
            type="button"
            className="btn btn-warning mt-auto btn-agregar-carrito"
            data-testid={`agregar-${producto.id}`}
            onClick={manejarClicAgregar}
          >
            {agregado ? '✓ Agregado' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </div>
  )
}

/** Formatea un número como precio en pesos chilenos (CLP). Función pura y reutilizable. */
function formatearPrecio(valor) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(
    valor,
  )
}

export default ProductCard
