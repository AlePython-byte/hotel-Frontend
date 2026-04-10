import { ChangeEvent, FormEvent, useState } from "react";
import { RoomType } from "../../enums/roomType";
import { ReservationSearchCriteria } from "../../types/reservation";

interface SearchFormProps {
  onSearch: (criteria: ReservationSearchCriteria) => void;
}

const initialState: ReservationSearchCriteria = {
  checkInDate: "",
  checkOutDate: "",
  roomType: ""
};

function SearchForm({ onSearch }: SearchFormProps) {
  const [formData, setFormData] = useState<ReservationSearchCriteria>(initialState);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(formData);
  }

  return (
    <form className="card form-grid" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="checkInDate">Fecha de entrada</label>
        <input
          id="checkInDate"
          type="date"
          name="checkInDate"
          value={formData.checkInDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="checkOutDate">Fecha de salida</label>
        <input
          id="checkOutDate"
          type="date"
          name="checkOutDate"
          value={formData.checkOutDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="roomType">Tipo de habitación</label>
        <select id="roomType" name="roomType" value={formData.roomType} onChange={handleChange}>
          <option value="">Todas</option>
          <option value={RoomType.SINGLE}>Sencilla</option>
          <option value={RoomType.DOUBLE}>Doble</option>
          <option value={RoomType.SUITE}>Suite</option>
        </select>
      </div>

      <button className="primary-button search-button" type="submit">
        Buscar disponibilidad
      </button>
    </form>
  );
}

export default SearchForm;
