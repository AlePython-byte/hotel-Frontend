import { ServiceType } from "../../enums/serviceType";
import { AdditionalService } from "../../types/additionalService";
import { formatCurrency } from "../../utils/currencyUtils";

interface ServiceSelectorProps {
  onAddService: (service: AdditionalService) => void;
}

const serviceOptions: AdditionalService[] = [
  { type: ServiceType.BREAKFAST, name: "Desayuno buffet", price: 45000 },
  { type: ServiceType.SPA, name: "Acceso al spa", price: 95000 },
  { type: ServiceType.TRANSPORT, name: "Transporte al aeropuerto", price: 70000 }
];

function ServiceSelector({ onAddService }: ServiceSelectorProps) {
  return (
    <section className="card">
      <h3>Servicios adicionales</h3>
      <div className="service-grid">
        {serviceOptions.map((service) => (
          <div key={service.type} className="service-card">
            <p><strong>{service.name}</strong></p>
            <p>{formatCurrency(service.price)}</p>
            <button className="secondary-button" onClick={() => onAddService(service)}>
              Agregar servicio
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServiceSelector;
