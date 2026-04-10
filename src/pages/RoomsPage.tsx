import { useLocation, useNavigate } from "react-router-dom";
import RoomCard from "../components/rooms/RoomCard";
import { mockRooms } from "../data/mockRooms";
import { Room } from "../types/room";
import "../styles/room.css";

interface SearchData {
  checkInDate?: string;
  checkOutDate?: string;
  roomType?: string;
}

interface RoomsLocationState {
  rooms?: Room[];
  searchData?: SearchData;
}

function calculateNights(checkInDate?: string, checkOutDate?: string): number {
  if (!checkInDate || !checkOutDate) return 1;

  const start = new Date(checkInDate);
  const end = new Date(checkOutDate);
  const diff = end.getTime() - start.getTime();
  const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return nights > 0 ? nights : 1;
}

function getSeasonMultiplier(checkInDate?: string): number {
  if (!checkInDate) return 1;

  const month = new Date(checkInDate).getMonth() + 1;

  if ([6, 7, 12, 1].includes(month)) {
    return 1.5;
  }

  return 1;
}

function getSeasonLabel(checkInDate?: string): string {
  return getSeasonMultiplier(checkInDate) === 1.5
    ? "Temporada alta"
    : "Temporada baja";
}

function getRoomImage(roomType: string): string {
  const images: Record<string, string> = {
    SINGLE:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    DOUBLE:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    SUITE:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
  };

  return images[roomType] || images.SINGLE;
}

function RoomsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as RoomsLocationState) || {};

  const rooms = state.rooms && state.rooms.length > 0 ? state.rooms : mockRooms;
  const searchData = state.searchData || {};

  const nights = calculateNights(searchData.checkInDate, searchData.checkOutDate);
  const multiplier = getSeasonMultiplier(searchData.checkInDate);
  const seasonLabel = getSeasonLabel(searchData.checkInDate);

  function handleSelectRoom(room: Room) {
    const totalPrice = room.basePrice * multiplier * nights;

    navigate("/reservation/new", {
      state: {
        selectedRoom: room,
        searchData,
        totalPrice,
        nights,
        seasonLabel,
        imageUrl: getRoomImage(room.type)
      }
    });
  }

  return (
    <section className="rooms-dashboard-page">
      <div className="rooms-page-header">
        <div>
          <h2>Habitaciones disponibles</h2>
          <p>
            Selecciona una habitación según disponibilidad, tipo y precio dinámico.
          </p>
        </div>

        <button
          className="secondary-action-btn"
          onClick={() => navigate("/")}
        >
          Volver al inicio
        </button>
      </div>

      <div className="rooms-summary-grid">
        <div className="rooms-summary-card">
          <span>Fechas</span>
          <h3>
            {searchData.checkInDate || "No definida"} →{" "}
            {searchData.checkOutDate || "No definida"}
          </h3>
        </div>

        <div className="rooms-summary-card">
          <span>Noches</span>
          <h3>{nights}</h3>
        </div>

        <div className="rooms-summary-card">
          <span>Temporada</span>
          <h3>{seasonLabel}</h3>
        </div>

        <div className="rooms-summary-card">
          <span>Resultados</span>
          <h3>{rooms.length} habitaciones</h3>
        </div>
      </div>

      <div className="rooms-list-grid">
        {rooms.map((room) => {
          const totalPrice = room.basePrice * multiplier * nights;

          return (
            <RoomCard
              key={room.id}
              room={room}
              nights={nights}
              seasonLabel={seasonLabel}
              totalPrice={totalPrice}
              imageUrl={getRoomImage(room.type)}
              onSelect={() => handleSelectRoom(room)}
            />
          );
        })}
      </div>
    </section>
  );
}

export default RoomsPage;
