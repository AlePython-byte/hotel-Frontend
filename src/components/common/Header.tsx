import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div>
        <p className="brand-label">Hotel Aurora</p>
        <h1>Sistema de Reservas de Hotel</h1>
        <p className="brand-subtitle">Frontend académico con React + TypeScript</p>
      </div>

      <nav className="nav">
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="/rooms">Habitaciones</NavLink>
        <NavLink to="/reservation/new">Nueva reserva</NavLink>
        <NavLink to="/reservation/demo/manage">Gestión</NavLink>
        <NavLink to="/reservation/demo/invoice">Factura</NavLink>
      </nav>
    </header>
  );
}

export default Header;
