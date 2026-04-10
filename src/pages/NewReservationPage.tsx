import { FormEvent, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Room } from "../types/room";
import "../styles/reservation.css";

interface SearchData {
  checkInDate?: string;
  checkOutDate?: string;
  roomType?: string;
}

interface ReservationLocationState {
  selectedRoom?: Room;
  searchData?: SearchData;
  totalPrice?: number;
  nights?: number;
  seasonLabel?: string;
  imageUrl?: string;
}

interface GuestFormData {
  fullName: string;
  documentNumber: string;
  email: string;
  phone: string;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(value);
}
function sanitizeNumericValue(value: string): string {
  return value.replace(/\D/g, "");
}

function sanitizeEmailValue(value: string): string {
  return value.replace(/\s/g, "");
}

function sanitizeNameValue(value: string): string {
  return value
    .replace(/^\s+/, "")
    .replace(/\s{2,}/g, " ");
}

function NewReservationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as ReservationLocationState) || {};

  const [guestForm, setGuestForm] = useState<GuestFormData>({
    fullName: "",
    documentNumber: "",
    email: "",
    phone: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedRoom = state.selectedRoom;
  const nights = state.nights || 1;
  const totalPrice = state.totalPrice || 0;
  const seasonLabel = state.seasonLabel || "Temporada baja";
  const imageUrl =
    state.imageUrl ||
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";

  const reservationData = useMemo(() => {
    if (!selectedRoom) return null;

    return {
      id: `RSV-${Date.now().toString().slice(-6)}`,
      guest: guestForm,
      room: selectedRoom,
      checkInDate: state.searchData?.checkInDate || "",
      checkOutDate: state.searchData?.checkOutDate || "",
      nights,
      services: [],
      total: totalPrice,
      status: "CREATED",
      digitalKey: `KEY-${Math.random().toString(36).slice(2, 10).toUpperCase()}`
    };
  }, [guestForm, nights, selectedRoom, state.searchData, totalPrice]);

 function handleChange(
  event: React.ChangeEvent<HTMLInputElement>
): void {
  const { name } = event.target;
  let { value } = event.target;

  if (name === "documentNumber" || name === "phone") {
    value = sanitizeNumericValue(value);
  }

  if (name === "email") {
    value = sanitizeEmailValue(value);
  }

  if (name === "fullName") {
    value = sanitizeNameValue(value);
  }

  setGuestForm((previous) => ({
    ...previous,
    [name]: value
  }));
}

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!selectedRoom || !reservationData) return;

    setIsSubmitting(true);

    setTimeout(() => {
      localStorage.setItem(
        "hotelCurrentReservation",
        JSON.stringify(reservationData)
      );

      navigate(`/reservation/${reservationData.id}`, {
        state: {
          reservation: reservationData
        }
      });
    }, 700);
  }

  if (!selectedRoom) {
    return (
      <section className="reservation-page">
        <div className="reservation-empty-card">
          <h2>No hay una habitación seleccionada</h2>
          <p>
            Primero debes elegir una habitación disponible para continuar con la reserva.
          </p>
          <button
            className="reservation-primary-btn"
            onClick={() => navigate("/rooms")}
          >
            Ir a habitaciones
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="reservation-page">
      <div className="reservation-header">
        <div>
          <h2>Nueva reserva</h2>
          <p>
            Completa los datos del huésped y confirma la habitación seleccionada.
          </p>
        </div>

        <button
          className="reservation-secondary-btn"
          onClick={() => navigate("/rooms")}
        >
          Volver a habitaciones
        </button>
      </div>

      <div className="reservation-grid">
        <form className="reservation-form-card" onSubmit={handleSubmit}>
          <div className="reservation-card-title">
            <h3>Datos del huésped</h3>
            <span>Formulario principal</span>
          </div>

          <div className="reservation-form-grid">
            <div className="reservation-field">
              <label>Nombre completo</label>
              <input
                type="text"
                name="fullName"
                value={guestForm.fullName}
                onChange={handleChange}
                placeholder="Ej. David Cabrera"
                required
              />
            </div>

            <div className="reservation-field">
              <label>Número de documento</label>
             <input
                type="text"
                name="documentNumber"
                value={guestForm.documentNumber}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={12}
                placeholder="Ej. 1234567890"
                required
              />
            </div>

            <div className="reservation-field">
              <label>Correo electrónico</label>
           <input
                type="email"
                name="email"
                value={guestForm.email}
                onChange={handleChange}
                placeholder="Ej. correo@ejemplo.com"
                required
              />
            </div>

            <div className="reservation-field">
              <label>Teléfono</label>
              <input
                type="text"
                name="phone"
                value={guestForm.phone}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={10}
                placeholder="Ej. 3001234567"
                required
              />
            </div>
          </div>

          <div className="reservation-notes">
            <h4>Información importante</h4>
            <ul>
              <li>La tarifa mostrada es estimada según la temporada seleccionada.</li>
              <li>Los servicios adicionales se podrán agregar después.</li>
              <li>El check-in y check-out se gestionan desde el panel de reserva.</li>
            </ul>
          </div>

          <button
            type="submit"
            className="reservation-primary-btn full-width"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Procesando reserva..." : "Confirmar reserva"}
          </button>
        </form>

        <aside className="reservation-summary-card">
          <div className="reservation-summary-image-wrapper">
            <img src={imageUrl} alt={selectedRoom.name} />
            <div className="reservation-summary-badges">
              <span>{seasonLabel}</span>
              <span>{nights} noche(s)</span>
            </div>
          </div>

          <div className="reservation-summary-content">
            <div className="reservation-card-title">
              <h3>Resumen de la habitación</h3>
              <span>Vista previa</span>
            </div>

            <div className="reservation-room-title">
              <h4>{selectedRoom.name}</h4>
              <p>{selectedRoom.description}</p>
            </div>

            <div className="reservation-summary-grid-mini">
              <div className="summary-mini-card">
                <span>Tipo</span>
                <strong>{selectedRoom.type}</strong>
              </div>

              <div className="summary-mini-card">
                <span>Capacidad</span>
                <strong>{selectedRoom.capacity} huésped(es)</strong>
              </div>

              <div className="summary-mini-card">
                <span>Entrada</span>
                <strong>{state.searchData?.checkInDate || "No definida"}</strong>
              </div>

              <div className="summary-mini-card">
                <span>Salida</span>
                <strong>{state.searchData?.checkOutDate || "No definida"}</strong>
              </div>
            </div>

            <div className="reservation-price-box">
              <div>
                <span>Total estimado</span>
                <h3>{formatCurrency(totalPrice)}</h3>
              </div>
              <small>Incluye tarifa dinámica según temporada.</small>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default NewReservationPage;
