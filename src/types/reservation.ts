import { ReservationStatus } from "../enums/reservationStatus";
import { Guest } from "./guest";
import { Room } from "./room";
import { AdditionalService } from "./additionalService";

export interface ReservationSearchCriteria {
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
}

export interface Reservation {
  id: string;
  guest: Guest;
  room: Room;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  roomTotal: number;
  services: AdditionalService[];
  servicesTotal: number;
  total: number;
  status: ReservationStatus;
  digitalKey?: string;
}
