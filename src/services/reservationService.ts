import { API_BASE_URL } from "./api";
import { ReservationStatus } from "../enums/reservationStatus";
import { ServiceType } from "../enums/serviceType";
import { AdditionalService } from "../types/additionalService";
import { Guest } from "../types/guest";
import { Reservation, ReservationSearchCriteria } from "../types/reservation";
import { Room } from "../types/room";
import { getFromStorage, saveToStorage } from "../utils/storageUtils";

const RESERVATION_ID_STORAGE_KEY = "hotel_current_reservation_id";
const SEARCH_STORAGE_KEY = "hotel_search_criteria";
const ROOM_STORAGE_KEY = "hotel_selected_room";

interface InvoiceItemResponse {
  description: string;
  amount: number;
}

interface InvoiceResponse {
  reservationId: number;
  items: InvoiceItemResponse[];
  total: number;
}

interface ReservationResponse {
  reservationId: number;
  guestName: string;
  guestEmail: string;
  roomNumber: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  seasonType: string;
  status: ReservationStatus;
  additionalServices: string[];
  totalPrice: number;
  digitalKeyCode?: string;
  invoice?: InvoiceResponse;
}

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

function mapServiceNameToType(name: string): AdditionalService["type"] {
  const normalized = name.toUpperCase();

  if (normalized.includes("SPA")) {
    return ServiceType.SPA;
  }

  if (normalized.includes("BREAKFAST")) {
    return ServiceType.BREAKFAST;
  }

  return ServiceType.TRANSPORT;
}

function mapReservationResponseToFrontend(data: ReservationResponse): Reservation {
  const selectedRoom = getSelectedRoom();
  const invoiceItems = data.invoice?.items ?? [];

  const roomCharge =
    invoiceItems.find((item) => item.description === "Room charge")?.amount ?? data.totalPrice;

  const services = data.additionalServices.map((name) => ({
    type: mapServiceNameToType(name),
    name,
    price: invoiceItems.find((item) => item.description === name)?.amount ?? 0
  }));

  const servicesTotal = invoiceItems
    .filter((item) => item.description !== "Room charge")
    .reduce((sum, item) => sum + item.amount, 0);

  return {
    id: String(data.reservationId),
    guest: {
      fullName: data.guestName ?? "",
      documentNumber: "",
      email: data.guestEmail ?? "",
      phone: ""
    },
    room:
      selectedRoom ??
      {
        id: Number(data.roomNumber) || 0,
        name: `Habitación ${data.roomNumber ?? ""}`,
        type: data.roomType as Room["type"],
        basePrice: 0,
        available: true,
        description: "",
        capacity: 1,
        image: ""
      },
    checkInDate: data.checkInDate,
    checkOutDate: data.checkOutDate,
    nights: data.nights,
    roomTotal: roomCharge,
    services,
    servicesTotal,
    total: data.totalPrice,
    status: data.status,
    digitalKey: data.digitalKeyCode
  };
}

export async function createReservation(
  guest: Guest,
  room: Room,
  checkInDate: string,
  checkOutDate: string
): Promise<Reservation> {
  const payload = {
    guestName: guest.fullName,
    guestEmail: guest.email,
    roomType: room.type,
    checkInDate,
    checkOutDate
  };

  const response = await fetch(`${API_BASE_URL}/reservar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to create reservation");
  }

  const data: ReservationResponse = await response.json();
  saveToStorage(RESERVATION_ID_STORAGE_KEY, String(data.reservationId));

  return mapReservationResponseToFrontend(data);
}

export async function getReservation(): Promise<Reservation | null> {
  const reservationId = getFromStorage<string>(RESERVATION_ID_STORAGE_KEY);

  if (!reservationId) {
    return null;
  }

  const response = await fetch(`${API_BASE_URL}/reserva/${reservationId}`);

  if (!response.ok) {
    return null;
  }

  const data: ReservationResponse = await response.json();
  return mapReservationResponseToFrontend(data);
}

export async function addServiceToReservation(
  service: AdditionalService
): Promise<Reservation | null> {
  const reservationId = getFromStorage<string>(RESERVATION_ID_STORAGE_KEY);

  if (!reservationId) {
    return null;
  }

  const response = await fetch(`${API_BASE_URL}/servicios/${reservationId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      serviceType: service.type
    })
  });

  if (!response.ok) {
    return null;
  }

  const data: ReservationResponse = await response.json();
  return mapReservationResponseToFrontend(data);
}

export async function updateReservationStatus(
  status: ReservationStatus
): Promise<Reservation | null> {
  const reservationId = getFromStorage<string>(RESERVATION_ID_STORAGE_KEY);

  if (!reservationId) {
    return null;
  }

  const endpoint = status === ReservationStatus.CHECKED_IN ? "checkin" : "checkout";

  const response = await fetch(`${API_BASE_URL}/${endpoint}/${reservationId}`, {
    method: "PUT"
  });

  if (!response.ok) {
    return null;
  }

  const data: ReservationResponse = await response.json();
  return mapReservationResponseToFrontend(data);
}