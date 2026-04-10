import { useEffect } from "react";
import PageTitle from "../components/common/PageTitle";
import RoomList from "../components/rooms/RoomList";
import { getSearchCriteria } from "../services/reservationService";
import { useRooms } from "../hooks/useRooms";

function RoomsPage() {
  const { rooms, loading, error, findRooms } = useRooms();
  const criteria = getSearchCriteria();

  useEffect(() => {
    if (criteria) {
      void findRooms(criteria);
    }
  }, []);

  return (
    <section>
      <PageTitle
        title="Habitaciones disponibles"
        subtitle="Selecciona la habitación que mejor se ajuste a las fechas de tu estadía."
      />

      {!criteria && (
        <div className="card empty-state">
          <p>No hay filtros guardados. Regresa al inicio para realizar una búsqueda.</p>
        </div>
      )}

      {loading && <div className="card"><p>Cargando habitaciones disponibles...</p></div>}
      {error && <div className="card"><p>{error}</p></div>}
      {criteria && !loading && !error && <RoomList rooms={rooms} criteria={criteria} />}
    </section>
  );
}

export default RoomsPage;
