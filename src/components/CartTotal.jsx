/**
 * CartTotal — calcula y muestra el total a pagar del carrito.
 *
 * Ejemplo clásico de .reduce(): recorre el arreglo cart y va acumulando
 * (precio efectivo x cantidad) de cada item en un único número. No guarda
 * el total en un useState propio porque no hace falta — se recalcula a
 * partir de las props en cada renderizado, así nunca queda desactualizado
 * respecto al contenido real del carrito.
 */
function CartTotal({ cart }) {
  const total = cart.reduce((suma, item) => {
    const precioUnitario =
      item.precioOferta != null && item.precioOferta < item.precioNormal ? item.precioOferta : item.precioNormal
    return suma + precioUnitario * item.cantidad
  }, 0)

  return (
    <div className="d-flex justify-content-between fw-bold border-top pt-3">
      <span>Total</span>
      <span>{formatearPrecio(total)}</span>
    </div>
  )
}

function formatearPrecio(valor) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(
    valor,
  )
}

export default CartTotal
