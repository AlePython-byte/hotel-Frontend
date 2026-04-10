import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="card empty-state">
      <h2>Página no encontrada</h2>
      <p>La ruta solicitada no existe dentro del sistema.</p>
      <Link className="primary-button inline-button" to="/">
        Volver al inicio
      </Link>
    </section>
  );
}

export default NotFoundPage;
