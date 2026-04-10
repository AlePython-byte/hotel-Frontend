import { Room } from "../../types/room";
import { ReservationSearchCriteria } from "../../types/reservation";
import RoomCard from "./RoomCard";

interface RoomListProps {
  rooms: Room[];
  criteria: ReservationSearchCriteria;
}

function RoomList({ rooms }: RoomListProps) {
  if (rooms.length === 0) {
    return (
      <div className="card empty-state">
        <p>No hay habitaciones disponibles para los filtros seleccionados.</p>
      </div>
    );
  }

  return (
    <div className="room-list">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}

export default RoomList;