import { Invoice } from "../../types/invoice";
import { formatCurrency } from "../../utils/currencyUtils";

interface InvoiceSummaryProps {
  invoice: Invoice;
}

function InvoiceSummary({ invoice }: InvoiceSummaryProps) {
  return (
    <section className="card">
      <h3>Resumen de factura</h3>
      <p><strong>Reserva:</strong> {invoice.reservationId}</p>
      <p><strong>Huésped:</strong> {invoice.guestName}</p>
      <p><strong>Habitación:</strong> {invoice.roomName}</p>
      <p><strong>Estado:</strong> {invoice.statusLabel}</p>
      <p className="total-text"><strong>Total:</strong> {formatCurrency(invoice.total)}</p>
    </section>
  );
}

export default InvoiceSummary;
