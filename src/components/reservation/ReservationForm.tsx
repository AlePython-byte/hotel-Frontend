import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Guest } from "../../types/guest";
import { createReservation, getSearchCriteria, getSelectedRoom } from "../../services/reservationService";
import { formatCurrency } from "../../utils/currencyUtils";
import { calculateRoomTotal } from "../../utils/priceUtils";
import GuestForm from "./GuestForm";

const initialGuest: Guest = {
  fullName: "",
  documentNumber: "",
  email: "",
  phone: ""
};

function ReservationForm() {
  const navigate = useNavigate();
  const [guest, setGuest] = useState<Guest>(initialGuest);
  const room = getSelectedRoom();
  const criteria = getSearchCriteria();

  if (!room || !criteria) {
    return (
      <div className="card empty-state">
        <p>Primero debes buscar una habitación y seleccionarla.</p>
      </div>
    );
  }

  const estimatedTotal = calculateRoomTotal(room, criteria.checkInDate, criteria.checkOutDate);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const reservation = createReservation(guest, room, criteria.checkInDate, criteria.checkOutDate);
    navigate(`/reservation/${reservation.id}`);
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Formulario de reserva</h3>
      <div className="booking-preview">
        <p><strong>Habitación seleccionada:</strong> {room.name}</p>
        <p><strong>Entrada:</strong> {criteria.checkInDate}</p>
        <p><strong>Salida:</strong> {criteria.checkOutDate}</p>
        <p><strong>Total estimado:</strong> {formatCurrency(estimatedTotal)}</p>
      </div>

      <GuestForm guest={guest} onChange={setGuest} />

      <button className="primary-button" type="submit">
        Confirmar reserva
      </button>
    </form>
  );
}

export default ReservationForm;
