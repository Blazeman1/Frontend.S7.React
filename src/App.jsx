import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import ProductList from './components/ProductList.jsx'
import ShoppingCart from './components/ShoppingCart.jsx'
import Footer from './components/Footer.jsx'
import productos from './data/productos.js'

/**
 * App — componente raíz de GameZone.
 *
 * Aquí vive el estado del CARRITO (cart), en el ancestro común más cercano
 * entre quien lo modifica (ProductList / ProductCard, con el botón "Agregar")
 * y quien lo consume (ShoppingCart, que lo lista y calcula el total). Este
 * patrón se llama "lifting state up" (elevar el estado): en vez de que cada
 * componente maneje su propia copia del carrito, App es la única fuente de
 * verdad y la pasa hacia abajo como props, junto con las funciones que saben
 * cómo modificarla.
 *
 * cart es un arreglo de objetos { ...producto, cantidad }, uno por producto
 * distinto agregado (si se agrega dos veces el mismo producto, solo sube su
 * cantidad en vez de duplicar la fila).
 */
function App() {
  const [cart, setCart] = useState([])

  /** Agrega un producto al carrito, o incrementa su cantidad si ya estaba. */
  function handleAddToCart(producto) {
    setCart((carritoActual) => {
      const yaExiste = carritoActual.find((item) => item.id === producto.id)
      if (yaExiste) {
        return carritoActual.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        )
      }
      return [...carritoActual, { ...producto, cantidad: 1 }]
    })
  }

  /** Quita por completo un producto del carrito, dado su id. */
  function handleRemoveFromCart(idProducto) {
    setCart((carritoActual) => carritoActual.filter((item) => item.id !== idProducto))
  }

  /** Vacía el carrito completo (botón "Vaciar carrito"). */
  function handleClearCart() {
    setCart([])
  }

  // Derivamos el contador de unidades directamente del estado en cada
  // renderizado, en vez de guardarlo en otro useState: así nunca puede
  // desincronizarse del contenido real del carrito.
  const totalUnidades = cart.reduce((suma, item) => suma + item.cantidad, 0)

  return (
    <>
      <Navbar totalUnidades={totalUnidades} />
      <main id="contenido-principal" className="container my-4">
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <ProductList productos={productos} onAddToCart={handleAddToCart} />
          </div>
          <div className="col-12 col-lg-4">
            <ShoppingCart
              cart={cart}
              onRemoveFromCart={handleRemoveFromCart}
              onClearCart={handleClearCart}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
