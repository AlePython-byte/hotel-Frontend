import { ReservationStatus } from "../enums/reservationStatus";
import { AdditionalService } from "../types/additionalService";
import { Guest } from "../types/guest";
import { Reservation, ReservationSearchCriteria } from "../types/reservation";
import { Room } from "../types/room";
import { calculateReservationTotal } from "../utils/priceUtils";
import { getFromStorage, saveToStorage } from "../utils/storageUtils";

const RESERVATION_STORAGE_KEY = "hotel_current_reservation";
const SEARCH_STORAGE_KEY = "hotel_search_criteria";
const ROOM_STORAGE_KEY = "hotel_selected_room";

export function saveSearchCriteria(criteria: ReservationSearchCriteria): void {
  saveToStorage(SEARCH_STORAGE_KEY, criteria);
}

export function getSearchCriteria(): ReservationSearchCriteria | null {
  return getFromStorage<ReservationSearchCriteria>(SEARCH_STORAGE_KEY);
}

export function saveSelectedRoom(room: Room): void {
  saveToStorage(ROOM_STORAGE_KEY, room);
}

export function getSelectedRoom(): Room | null {
  return getFromStorage<Room>(ROOM_STORAGE_KEY);
}

export function createReservation(
  guest: Guest,
  room: Room,
  checkInDate: string,
  checkOutDate: string
): Reservation {
  const totals = calculateReservationTotal(room, checkInDate, checkOutDate, []);

  const reservation: Reservation = {
    id: `RSV-${Date.now()}`,
    guest,
    room,
    checkInDate,
    checkOutDate,
    nights: totals.nights,
    roomTotal: totals.roomTotal,
    services: [],
    servicesTotal: totals.servicesTotal,
    total: totals.total,
    status: ReservationStatus.CREATED
  };

  saveToStorage(RESERVATION_STORAGE_KEY, reservation);
  return reservation;
}

export function getReservation(): Reservation | null {
  return getFromStorage<Reservation>(RESERVATION_STORAGE_KEY);
}

export function addServiceToReservation(service: AdditionalService): Reservation | null {
  const reservation = getReservation();

  if (!reservation) {
    return null;
  }

  const updatedServices = [...reservation.services, service];
  const totals = calculateReservationTotal(
    reservation.room,
    reservation.checkInDate,
    reservation.checkOutDate,
    updatedServices
  );

  const updatedReservation: Reservation = {
    ...reservation,
    services: updatedServices,
    roomTotal: totals.roomTotal,
    servicesTotal: totals.servicesTotal,
    total: totals.total
  };

  saveToStorage(RESERVATION_STORAGE_KEY, updatedReservation);
  return updatedReservation;
}

export function updateReservationStatus(status: ReservationStatus): Reservation | null {
  const reservation = getReservation();

  if (!reservation) {
    return null;
  }

  const updatedReservation: Reservation = {
    ...reservation,
    status,
    digitalKey: status === ReservationStatus.CHECKED_IN ? `KEY-${reservation.id}` : reservation.digitalKey
  };

  saveToStorage(RESERVATION_STORAGE_KEY, updatedReservation);
  return updatedReservation;
}
