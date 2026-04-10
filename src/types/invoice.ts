export interface InvoiceItem {
  description: string;
  amount: number;
}

export interface Invoice {
  reservationId: string;
  guestName: string;
  roomName: string;
  items: InvoiceItem[];
  total: number;
  statusLabel: string;
}
