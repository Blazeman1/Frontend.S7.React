/**
 * CartItem — una fila del carrito de compras.
 *
 * Componente puramente presentacional: recibe el item (producto + cantidad)
 * y la función onRemove a ejecutar cuando el usuario hace clic en "✕". No
 * tiene estado propio — todo lo que necesita mostrar viene de sus props.
 */
function CartItem({ item, onRemove }) {
  // Precio efectivo: si el producto tenía oferta vigente, el carrito debe
  // cobrar el precio de oferta, no el normal.
  const precioUnitario = item.precioOferta != null && item.precioOferta < item.precioNormal
    ? item.precioOferta
    : item.precioNormal

  return (
    <li className="list-group-item item-carrito">
      <div>
        <div className="nombre-item">{item.nombre}</div>
        <small className="text-secondary">
          {item.cantidad} x {formatearPrecio(precioUnitario)}
        </small>
      </div>
      <button
        type="button"
        className="btn btn-sm btn-outline-danger"
        aria-label={`Quitar ${item.nombre} del carrito`}
        data-testid={`quitar-${item.id}`}
        onClick={() => onRemove(item.id)}
      >
        ✕
      </button>
    </li>
  )
}

function formatearPrecio(valor) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(
    valor,
  )
}

export default CartItem
