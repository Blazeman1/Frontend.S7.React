import { useState } from 'react'

/**
 * Navbar — barra de navegación superior.
 *
 * Recibe totalUnidades como prop (dato de solo lectura que viene de App) y
 * lo muestra en la insignia del carrito. El menú móvil NO usa el JavaScript
 * de Bootstrap (data-bs-toggle="collapse"): en su lugar mantiene su propio
 * estado local (menuAbierto) con useState y decide qué clases CSS aplicar
 * mediante renderizado condicional. Es el equivalente "a la React" del
 * comportamiento que Bootstrap resuelve con JS puro.
 */
function Navbar({ totalUnidades }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  function alternarMenu() {
    setMenuAbierto((abierto) => !abierto)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary-gz sticky-top shadow-sm">
      <div className="container-fluid px-3 px-lg-4">
        <a className="navbar-brand fw-bold" href="#contenido-principal">
          🎮 GameZone
        </a>

        {/* onClick: evento de usuario que alterna el estado del menú móvil */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={alternarMenu}
          aria-controls="navGameZone"
          aria-expanded={menuAbierto}
          aria-label="Abrir menú de navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Renderizado condicional: la clase "show" solo se agrega si menuAbierto es true */}
        <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`} id="navGameZone">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#catalogo">
                Catálogo
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#carrito">
                Carrito
              </a>
            </li>
          </ul>

          <a href="#carrito" className="btn btn-warning position-relative">
            🛒 Carrito
            <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
              {totalUnidades}
            </span>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
