import { ReservationSearchCriteria } from "../../types/reservation";
import { Room } from "../../types/room";
import RoomCard from "./RoomCard";

interface RoomListProps {
  rooms: Room[];
  criteria: ReservationSearchCriteria;
}

function RoomList({ rooms, criteria }: RoomListProps) {
  if (rooms.length === 0) {
    return (
      <div className="card empty-state">
        <p>No hay habitaciones disponibles con esos filtros.</p>
      </div>
    );
  }

  return (
    <div className="room-grid">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} criteria={criteria} />
      ))}
    </div>
  );
}

export default RoomList;
