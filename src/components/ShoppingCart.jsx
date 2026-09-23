import CartItem from './CartItem.jsx'
import CartTotal from './CartTotal.jsx'

/**
 * ShoppingCart — panel del carrito de compras.
 *
 * Recibe el arreglo cart y dos funciones (onRemoveFromCart, onClearCart)
 * desde App, que es quien realmente posee el estado. ShoppingCart solo
 * ORQUESTA: decide qué mostrar según el contenido de cart (renderizado
 * condicional) y delega el detalle de cada fila a CartItem, y el cálculo
 * del total a CartTotal — modularidad y responsabilidad única.
 */
function ShoppingCart({ cart, onRemoveFromCart, onClearCart }) {
  const carritoVacio = cart.length === 0

  return (
    <aside id="carrito" aria-labelledby="tituloCarrito">
      <div className="card carrito-card sticky-lg-top">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0" id="tituloCarrito">
            🛒 Mi carrito
          </h2>
          {/* Renderizado condicional: el botón "Vaciar" solo tiene sentido si hay algo que vaciar */}
          {!carritoVacio && (
            <button type="button" className="btn btn-sm btn-outline-light" onClick={onClearCart}>
              Vaciar
            </button>
          )}
        </div>
        <div className="card-body">
          {carritoVacio ? (
            <p className="text-secondary mb-0">Tu carrito está vacío. Agrega productos desde el catálogo.</p>
          ) : (
            <>
              <ul className="list-group list-group-flush mb-3">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} onRemove={onRemoveFromCart} />
                ))}
              </ul>
              <CartTotal cart={cart} />
            </>
          )}
        </div>
      </div>
    </aside>
  )
}

export default ShoppingCart
