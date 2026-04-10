import { ReservationStatus } from "../enums/reservationStatus";
import { Invoice } from "../types/invoice";
import { Reservation } from "../types/reservation";

export function generateInvoice(reservation: Reservation): Invoice {
  const items = [
    {
      description: `Hospedaje - ${reservation.room.name} (${reservation.nights} noches)`,
      amount: reservation.roomTotal
    },
    ...reservation.services.map((service) => ({
      description: `Servicio adicional - ${service.name}`,
      amount: service.price
    }))
  ];

  const statusLabel =
    reservation.status === ReservationStatus.CHECKED_OUT
      ? "Finalizada"
      : reservation.status === ReservationStatus.CHECKED_IN
        ? "Activa"
        : "Pendiente";

  return {
    reservationId: reservation.id,
    guestName: reservation.guest.fullName,
    roomName: reservation.room.name,
    items,
    total: reservation.total,
    statusLabel
  };
}
