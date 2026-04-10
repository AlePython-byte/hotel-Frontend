import { useNavigate } from "react-router-dom";
import { Room } from "../../types/room";
import { ReservationSearchCriteria } from "../../types/reservation";
import { calculateRoomTotal } from "../../utils/priceUtils";
import { calculateNights, isHighSeason } from "../../utils/dateUtils";
import { formatCurrency } from "../../utils/currencyUtils";
import PricePreview from "./PricePreview";
import { saveSearchCriteria, saveSelectedRoom } from "../../services/reservationService";

interface RoomCardProps {
  room: Room;
  criteria: ReservationSearchCriteria;
}

function RoomCard({ room, criteria }: RoomCardProps) {
  const navigate = useNavigate();
  const nights = calculateNights(criteria.checkInDate, criteria.checkOutDate);
  const total = calculateRoomTotal(room, criteria.checkInDate, criteria.checkOutDate);
  const highSeason = isHighSeason(criteria.checkInDate);

  function handleSelectRoom() {
    saveSelectedRoom(room);
    saveSearchCriteria(criteria);
    navigate("/reservation/new");
  }

  return (
    <article className="card room-card">
      <div className="room-icon">{room.image}</div>
      <h3>{room.name}</h3>
      <p>{room.description}</p>
      <p><strong>Capacidad:</strong> {room.capacity} huésped(es)</p>
      <p><strong>Precio base por noche:</strong> {formatCurrency(room.basePrice)}</p>
      <PricePreview nights={nights} total={total} isHighSeason={highSeason} />
      <button className="primary-button" onClick={handleSelectRoom}>
        Seleccionar habitación
      </button>
    </article>
  );
}

export default RoomCard;
