import { Invoice } from "../../types/invoice";
import { formatCurrency } from "../../utils/currencyUtils";

interface InvoiceDetailProps {
  invoice: Invoice;
}

function InvoiceDetail({ invoice }: InvoiceDetailProps) {
  return (
    <section className="card">
      <h3>Detalle de cobros</h3>
      <div className="invoice-list">
        {invoice.items.map((item) => (
          <div key={`${item.description}-${item.amount}`} className="invoice-row">
            <span>{item.description}</span>
            <strong>{formatCurrency(item.amount)}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InvoiceDetail;
