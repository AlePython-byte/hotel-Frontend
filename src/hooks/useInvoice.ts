import { useMemo } from "react";
import { generateInvoice } from "../services/invoiceService";
import { Reservation } from "../types/reservation";

export function useInvoice(reservation: Reservation | null) {
  return useMemo(() => {
    if (!reservation) {
      return null;
    }

    return generateInvoice(reservation);
  }, [reservation]);
}
