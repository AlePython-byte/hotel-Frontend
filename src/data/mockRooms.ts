import { RoomType } from "../enums/roomType";
import { Room } from "../types/room";

export const mockRooms: Room[] = [
  {
    id: 101,
    name: "Habitación Sencilla 101",
    type: RoomType.SINGLE,
    basePrice: 180000,
    available: true,
    description: "Espacio cómodo para una persona con escritorio y vista interior.",
    capacity: 1,
    image: "🛏️"
  },
  {
    id: 202,
    name: "Habitación Doble 202",
    type: RoomType.DOUBLE,
    basePrice: 280000,
    available: true,
    description: "Habitación ideal para dos huéspedes con cama doble y minibar.",
    capacity: 2,
    image: "🏨"
  },
  {
    id: 303,
    name: "Suite 303",
    type: RoomType.SUITE,
    basePrice: 460000,
    available: true,
    description: "Suite premium con sala, vista panorámica y mayor comodidad.",
    capacity: 4,
    image: "✨"
  }
];
