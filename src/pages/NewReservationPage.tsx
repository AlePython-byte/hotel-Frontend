import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Room } from "../types/room";
import "../styles/reservation.css";

function ReservationManagementPage() {
  const { reservation, refreshReservation } = useReservation();
  const [message, setMessage] = useState(
    "Administra la reserva agregando servicios o actualizando su estado."
  );

  function handleAddService(service: AdditionalService): void {
    void (async () => {
      const updatedReservation = await addServiceToReservation(service);

      if (updatedReservation) {
        setMessage(`Se agregó el servicio: ${service.name}.`);
        await refreshReservation();
      }
    })();
  }

  function handleStatusChange(status: ReservationStatus): void {
    void (async () => {
      const updatedReservation = await updateReservationStatus(status);

      if (updatedReservation) {
        setMessage(
          status === ReservationStatus.CHECKED_IN
            ? "Check-in realizado correctamente."
            : "Check-out realizado correctamente."
        );
        await refreshReservation();
      }
    })();
  }

  return (
    <section>
      <PageTitle
        title="Gestión de reserva"
        subtitle="Agrega servicios adicionales, realiza check-in y finaliza la estadía con check-out."
      />

      {!reservation ? (
        <div className="card empty-state">
          <p>No existe una reserva activa para gestionar.</p>
        </div>
      ) : (
        <>
          <ReservationSummary reservation={reservation} />
          <ServiceSelector onAddService={handleAddService} />

          <div className="card">
            <h3>Acciones de estado</h3>
            <div className="button-group">
              <button
                className="primary-button"
                onClick={() => handleStatusChange(ReservationStatus.CHECKED_IN)}
              >
                Realizar check-in
              </button>
              <button
                className="secondary-button"
                onClick={() => handleStatusChange(ReservationStatus.CHECKED_OUT)}
              >
                Realizar check-out
              </button>
            </div>
            <p className="management-message">{message}</p>
          </div>
        </>
      )}
    </section>
  );
}

export default ReservationManagementPage;