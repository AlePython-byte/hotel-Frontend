export function calculateNights(checkInDate: string, checkOutDate: string): number {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const timeDifference = checkOut.getTime() - checkIn.getTime();
  const nights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 0;
}

export function isHighSeason(checkInDate: string): boolean {
  const month = new Date(checkInDate).getMonth() + 1;
  return [6, 7, 12].includes(month);
}

export function validateSearchDates(checkInDate: string, checkOutDate: string): string {
  if (!checkInDate || !checkOutDate) {
    return "Debes seleccionar la fecha de entrada y la fecha de salida.";
  }

  if (new Date(checkOutDate) <= new Date(checkInDate)) {
    return "La fecha de salida debe ser posterior a la fecha de entrada.";
  }

  return "";
}
