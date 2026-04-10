import { ChangeEvent } from "react";
import { Guest } from "../../types/guest";

interface GuestFormProps {
  guest: Guest;
  onChange: (guest: Guest) => void;
}

function GuestForm({ guest, onChange }: GuestFormProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    onChange({
      ...guest,
      [name]: value
    });
  }

  return (
    <div className="form-grid">
      <div className="form-group">
        <label htmlFor="fullName">Nombre completo</label>
        <input id="fullName" name="fullName" value={guest.fullName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="documentNumber">Documento</label>
        <input id="documentNumber" name="documentNumber" value={guest.documentNumber} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Correo electrónico</label>
        <input id="email" name="email" type="email" value={guest.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Teléfono</label>
        <input id="phone" name="phone" value={guest.phone} onChange={handleChange} required />
      </div>
    </div>
  );
}

export default GuestForm;
