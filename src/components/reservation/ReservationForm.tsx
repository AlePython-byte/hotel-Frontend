import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Guest } from "../../types/guest";
import {
  getSearchCriteria,
  getSelectedRoom,
  createReservation
} from "../../services/reservationService";

function ReservationForm() {
  const navigate = useNavigate();
  const room = getSelectedRoom();
  const criteria = getSearchCriteria();

  const [guest, setGuest] = useState<Guest>({
    fullName: "",
    documentNumber: "",
    email: "",
    phone: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    setGuest((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!room || !criteria) {
      return;
    }

    setIsSubmitting(true);

    try {
      const reservation = await createReservation(
        guest,
        room,
        criteria.checkInDate,
        criteria.checkOutDate
      );

      navigate(`/reservation/${reservation.id}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!room || !criteria) {
    return (
      <div className="card empty-state">
        <p>No hay datos suficientes para crear la reserva.</p>
      </div>
    );
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h3>Datos del huésped</h3>

      <div className="form-group">
        <label>Nombre completo</label>
        <input type="text" name="fullName" value={guest.fullName} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Número de documento</label>
        <input
          type="text"
          name="documentNumber"
          value={guest.documentNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Correo electrónico</label>
        <input type="email" name="email" value={guest.email} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Teléfono</label>
        <input type="text" name="phone" value={guest.phone} onChange={handleChange} required />
      </div>

      <button type="submit" className="primary-button" disabled={isSubmitting}>
        {isSubmitting ? "Procesando..." : "Confirmar reserva"}
      </button>
    </form>
  );
}

export default ReservationForm;