import { Room } from "../../types/room";

interface RoomCardProps {
  room: Room;
  nights: number;
  seasonLabel: string;
  totalPrice: number;
  imageUrl: string;
  onSelect: () => void;
}

function translateRoomType(type: string): string {
  const types: Record<string, string> = {
    SINGLE: "Sencilla",
    DOUBLE: "Doble",
    SUITE: "Suite"
  };

  return types[type] || type;
}

function RoomCard({
  room,
  nights,
  seasonLabel,
  totalPrice,
  imageUrl,
  onSelect
}: RoomCardProps) {
  return (
    <article className="modern-room-card">
      <div className="modern-room-image-wrapper">
        <img src={imageUrl} alt={room.name} className="modern-room-image" />

        <div className="modern-room-badges">
          <span className="room-badge available">Disponible</span>
          <span className="room-badge type">{translateRoomType(room.type)}</span>
        </div>
      </div>

      <div className="modern-room-content">
        <div className="modern-room-heading">
          <div>
            <h3>{room.name}</h3>
            <p>{room.description}</p>
          </div>
          <div className="price-per-night">
            <span>Base</span>
            <strong>${room.basePrice}</strong>
          </div>
        </div>

        <div className="modern-room-info-grid">
          <div className="room-info-item">
            <span>Capacidad</span>
            <strong>{room.capacity} huéspedes</strong>
          </div>

          <div className="room-info-item">
            <span>Estadía</span>
            <strong>{nights} noche(s)</strong>
          </div>

          <div className="room-info-item">
            <span>Temporada</span>
            <strong>{seasonLabel}</strong>
          </div>

          <div className="room-info-item highlight">
            <span>Total estimado</span>
            <strong>${totalPrice}</strong>
          </div>
        </div>

        <div className="modern-room-footer">
          <button className="room-outline-btn">Ver detalles</button>
          <button className="room-primary-btn" onClick={onSelect}>
            Seleccionar habitación
          </button>
        </div>
      </div>
    </article>
  );
}

export default RoomCard;