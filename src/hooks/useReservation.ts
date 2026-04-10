import { useEffect, useState } from "react";
import { Reservation } from "../types/reservation";
import { getReservation } from "../services/reservationService";

export function useReservation() {
  const [reservation, setReservation] = useState<Reservation | null>(null);

  async function refreshReservation(): Promise<void> {
    const data = await getReservation();
    setReservation(data);
  }

  useEffect(() => {
    void refreshReservation();
  }, []);

  return {
    reservation,
    refreshReservation
  };
}
