import StatusBadge from "../common/StatusBadge";
import { Reservation } from "../../types/reservation";
import { formatCurrency } from "../../utils/currencyUtils";

interface ReservationSummaryProps {
  reservation: Reservation;
}

function ReservationSummary({ reservation }: ReservationSummaryProps) {
  return (
    <section className="card summary-card">
      <div className="summary-header">
        <h3>Resumen de la reserva</h3>
        <StatusBadge status={reservation.status} />
      </div>

      <div className="summary-grid">
        <p><strong>Código:</strong> {reservation.id}</p>
        <p><strong>Huésped:</strong> {reservation.guest.fullName}</p>
        <p><strong>Habitación:</strong> {reservation.room.name}</p>
        <p><strong>Entrada:</strong> {reservation.checkInDate}</p>
        <p><strong>Salida:</strong> {reservation.checkOutDate}</p>
        <p><strong>Noches:</strong> {reservation.nights}</p>
        <p><strong>Total habitación:</strong> {formatCurrency(reservation.roomTotal)}</p>
        <p><strong>Total servicios:</strong> {formatCurrency(reservation.servicesTotal)}</p>
        <p className="total-text"><strong>Total general:</strong> {formatCurrency(reservation.total)}</p>
      </div>

      {reservation.digitalKey && <p><strong>Llave digital:</strong> {reservation.digitalKey}</p>}
    </section>
  );
}

export default ReservationSummary;
