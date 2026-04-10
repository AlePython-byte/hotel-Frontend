import { RoomType } from "../enums/roomType";
import { mockRooms } from "../data/mockRooms";
import { ReservationSearchCriteria } from "../types/reservation";
import { Room } from "../types/room";

export async function searchAvailableRooms(criteria: ReservationSearchCriteria): Promise<Room[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let rooms = mockRooms.filter((room) => room.available);

      if (criteria.roomType) {
        rooms = rooms.filter((room) => room.type === criteria.roomType as RoomType);
      }

      resolve(rooms);
    }, 400);
  });
}

export function getRoomById(roomId: number): Room | undefined {
  return mockRooms.find((room) => room.id === roomId);
}
