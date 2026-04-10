import PageTitle from "../components/common/PageTitle";
import InvoiceDetail from "../components/invoice/InvoiceDetail";
import InvoiceSummary from "../components/invoice/InvoiceSummary";
import { useReservation } from "../hooks/useReservation";
import { useInvoice } from "../hooks/useInvoice";

function InvoicePage() {
  const { reservation } = useReservation();
  const invoice = useInvoice(reservation);

  return (
    <section>
      <PageTitle
        title="Factura final"
        subtitle="Consulta el resumen y el detalle de los cobros generados por la reserva."
      />

      {!invoice ? (
        <div className="card empty-state">
          <p>No hay una factura disponible porque aún no existe una reserva activa.</p>
        </div>
      ) : (
        <div className="invoice-layout">
          <InvoiceSummary invoice={invoice} />
          <InvoiceDetail invoice={invoice} />
        </div>
      )}
    </section>
  );
}

export default InvoicePage;
