import { useEffect, useState } from "react";
import { Reservation } from "../types/reservation";
import { getReservation } from "../services/reservationService";

export function useReservation() {
  const [reservation, setReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    setReservation(getReservation());
  }, []);

  return {
    reservation,
    refreshReservation: () => setReservation(getReservation())
  };
}
