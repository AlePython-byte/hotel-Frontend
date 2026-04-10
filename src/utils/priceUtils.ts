import { AdditionalService } from "../types/additionalService";
import { Room } from "../types/room";
import { calculateNights, isHighSeason } from "./dateUtils";

export function calculateRoomTotal(room: Room, checkInDate: string, checkOutDate: string): number {
  const nights = calculateNights(checkInDate, checkOutDate);
  const multiplier = isHighSeason(checkInDate) ? 1.2 : 1;
  return Math.round(room.basePrice * multiplier * nights);
}

export function calculateServicesTotal(services: AdditionalService[]): number {
  return services.reduce((total, service) => total + service.price, 0);
}

export function calculateReservationTotal(
  room: Room,
  checkInDate: string,
  checkOutDate: string,
  services: AdditionalService[]
): { roomTotal: number; servicesTotal: number; total: number; nights: number } {
  const nights = calculateNights(checkInDate, checkOutDate);
  const roomTotal = calculateRoomTotal(room, checkInDate, checkOutDate);
  const servicesTotal = calculateServicesTotal(services);

  return {
    roomTotal,
    servicesTotal,
    total: roomTotal + servicesTotal,
    nights
  };
}
