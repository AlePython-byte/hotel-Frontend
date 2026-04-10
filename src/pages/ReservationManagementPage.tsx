import { useState } from "react";
import PageTitle from "../components/common/PageTitle";
import ReservationSummary from "../components/reservation/ReservationSummary";
import ServiceSelector from "../components/reservation/ServiceSelector";
import { ReservationStatus } from "../enums/reservationStatus";
import { AdditionalService } from "../types/additionalService";
import { addServiceToReservation, updateReservationStatus } from "../services/reservationService";
import { useReservation } from "../hooks/useReservation";

function ReservationManagementPage() {
  const { reservation, refreshReservation } = useReservation();
  const [message, setMessage] = useState("Administra la reserva agregando servicios o actualizando su estado.");

  function handleAddService(service: AdditionalService) {
    const updatedReservation = addServiceToReservation(service);

    if (updatedReservation) {
      setMessage(`Se agregó el servicio: ${service.name}.`);
      refreshReservation();
    }
  }

  function handleStatusChange(status: ReservationStatus) {
    const updatedReservation = updateReservationStatus(status);

    if (updatedReservation) {
      setMessage(
        status === ReservationStatus.CHECKED_IN
          ? "Check-in realizado correctamente."
          : "Check-out realizado correctamente."
      );
      refreshReservation();
    }
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
              <button className="primary-button" onClick={() => handleStatusChange(ReservationStatus.CHECKED_IN)}>
                Realizar check-in
              </button>
              <button className="secondary-button" onClick={() => handleStatusChange(ReservationStatus.CHECKED_OUT)}>
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
