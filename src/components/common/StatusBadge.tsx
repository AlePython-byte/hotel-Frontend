import { ReservationStatus } from "../../enums/reservationStatus";

interface StatusBadgeProps {
  status: ReservationStatus;
}

const labels: Record<ReservationStatus, string> = {
  [ReservationStatus.CREATED]: "Creada",
  [ReservationStatus.CHECKED_IN]: "Check-in realizado",
  [ReservationStatus.CHECKED_OUT]: "Check-out realizado",
  [ReservationStatus.CANCELLED]: "Cancelada"
};

function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge status-${status.toLowerCase()}`}>{labels[status]}</span>;
}

export default StatusBadge;
