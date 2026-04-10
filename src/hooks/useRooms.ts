import { useState } from "react";
import { searchAvailableRooms } from "../services/hotelService";
import { ReservationSearchCriteria } from "../types/reservation";
import { Room } from "../types/room";

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function findRooms(criteria: ReservationSearchCriteria): Promise<void> {
    setLoading(true);
    setError("");

    try {
      const results = await searchAvailableRooms(criteria);
      setRooms(results);
    } catch {
      setError("No fue posible consultar las habitaciones en este momento.");
    } finally {
      setLoading(false);
    }
  }

  return {
    rooms,
    loading,
    error,
    findRooms
  };
}
