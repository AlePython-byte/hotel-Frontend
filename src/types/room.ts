import { RoomType } from "../enums/roomType";

export interface Room {
  id: number;
  name: string;
  type: RoomType;
  basePrice: number;
  available: boolean;
  description: string;
  capacity: number;
  image: string;
}
