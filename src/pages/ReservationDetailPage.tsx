import { Link } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";
import ReservationSummary from "../components/reservation/ReservationSummary";
import { useReservation } from "../hooks/useReservation";

function ReservationDetailPage() {
  const { reservation } = useReservation();

  return (
    <section>
      <PageTitle
        title="Detalle de la reserva"
        subtitle="Revisa la información confirmada antes de administrar servicios o cambios de estado."
      />

      {!reservation ? (
        <div className="card empty-state">
          <p>No existe una reserva activa en este momento.</p>
        </div>
      ) : (
        <>
          <ReservationSummary reservation={reservation} />
          <div className="button-group">
            <Link className="primary-button inline-button" to={`/reservation/${reservation.id}/manage`}>
              Ir a gestión de reserva
            </Link>
            <Link className="secondary-button inline-button" to={`/reservation/${reservation.id}/invoice`}>
              Ver factura
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default ReservationDetailPage;
