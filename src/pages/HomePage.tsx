import "../styles/room.css";

const galleryImages = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80"
];

const amenities = [
  {
    icon: "🛏️",
    title: "Dormitorio",
    description: "1 cama king y espacio de descanso"
  },
  {
    icon: "🛋️",
    title: "Sala privada",
    description: "Sofá, mesa auxiliar y vista interior"
  },
  {
    icon: "☕",
    title: "Tecnología",
    description: "TV, Wi-Fi, aire acondicionado y cafetera"
  },
  {
    icon: "🛁",
    title: "Baño",
    description: "Baño privado con agua caliente"
  },
  {
    icon: "🌅",
    title: "Accesibilidad",
    description: "Balcón, vista libre y buena iluminación"
  },
  {
    icon: "🍽️",
    title: "Cocina",
    description: "Mini bar y zona de snacks"
  }
];

const bookings = [
  { name: "María Gómez", date: "12 Ene | 1:30 p. m." },
  { name: "Juan Pérez", date: "20 Ene | 8:45 a. m." },
  { name: "Ana Rodríguez", date: "28 Ene | 7:10 p. m." }
];

const calendarDays = [
  "", "", "", "01", "02", "03", "04",
  "05", "06", "07", "08", "09", "10", "11",
  "12", "13", "14", "15", "16", "17", "18",
  "19", "20", "21", "22", "23", "24", "25",
  "26", "27", "28", "29", "30", "31", ""
];

function HomePage() {
  return (
    <section className="hotel-dashboard">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">HT</div>

        <nav className="sidebar-nav">
          <button className="sidebar-btn active"></button>
          <button className="sidebar-btn">🛎️</button>
          <button className="sidebar-btn">📅</button>
          <button className="sidebar-btn">💳</button>
          <button className="sidebar-btn">⭐</button>
          <button className="sidebar-btn">⚙️</button>
        </nav>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="search-box">
            <span>🔎</span>
            <input
              type="text"
              placeholder="Buscar habitación, reserva o servicio"
            />
          </div>

          <div className="topbar-actions">
            <button className="topbar-icon">🔔</button>
            <button className="topbar-icon">☀️</button>
            <button className="topbar-icon">🌙</button>
            <div className="profile-badge">DC</div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="dashboard-center">
            <div className="section-heading">
              <div>
                <h2>Vista y detalles de la habitación</h2>
                <p>Explora la disponibilidad, características y reservas activas.</p>
              </div>
              <span className="room-number">Habitación No: 244</span>
            </div>

            <div className="hero-card">
              <div className="hero-image-wrapper">
                <img
                  src={galleryImages[0]}
                  alt="Habitación principal"
                  className="hero-image"
                />

                <div className="hero-tags">
                  <span>📐 400 sq. ft</span>
                  <span>🛏️ Doble</span>
                  <span>🏢 Piso 3</span>
                </div>

                <div className="thumb-row">
                  {galleryImages.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Vista ${index + 1}`}
                      className="thumb-image"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="details-grid">
              <div className="info-card large">
                <h3>Detalles, descripción y otros</h3>

                <div className="room-meta">
                  <div>
                    <span className="meta-label">Nombre</span>
                    <p>Suite Deluxe King</p>
                  </div>
                  <div>
                    <span className="meta-label">Tipo</span>
                    <p>Suite con vista interior</p>
                  </div>
                  <div>
                    <span className="meta-label">Capacidad</span>
                    <p>2 adultos, 1 niño</p>
                  </div>
                  <div>
                    <span className="meta-label">Tamaño</span>
                    <p>400 sq. ft</p>
                  </div>
                </div>

                <div className="description-block">
                  <h4>Descripción</h4>
                  <p>
                    Habitación amplia y elegante con cama king, zona de descanso,
                    escritorio de trabajo, baño privado, iluminación cálida y
                    servicios premium. Ideal para una estadía cómoda con experiencia
                    moderna.
                  </p>
                </div>

                <div className="calendar-card">
                  <div className="calendar-header">
                    <h4>Calendario</h4>
                    <span>Enero 2025</span>
                  </div>

                  <div className="calendar-weekdays">
                    <span>Do</span>
                    <span>Lu</span>
                    <span>Ma</span>
                    <span>Mi</span>
                    <span>Ju</span>
                    <span>Vi</span>
                    <span>Sa</span>
                  </div>

                  <div className="calendar-grid">
                    {calendarDays.map((day, index) => (
                      <span
                        key={index}
                        className={`calendar-day ${
                          day === "09" || day === "16" || day === "23"
                            ? "busy"
                            : day === "18"
                            ? "selected"
                            : ""
                        } ${day === "" ? "empty" : ""}`}
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="info-card breakfast-card">
                <img
                  src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80"
                  alt="Desayuno"
                />
                <div className="breakfast-content">
                  <h3>Desayuno incluido</h3>
                  <p>
                    Esta habitación incluye desayuno de cortesía hasta las 12:00 a. m.
                  </p>
                  <button>Ver servicios</button>
                </div>
              </div>
            </div>
          </div>

          <aside className="dashboard-right">
            <div className="side-card">
              <div className="side-card-header">
                <h3>Habitación</h3>
                <span>ⓘ</span>
              </div>

              <div className="amenities-list">
                {amenities.map((item) => (
                  <div key={item.title} className="amenity-item">
                    <div className="amenity-icon">{item.icon}</div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                    <span className="amenity-arrow">›</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="side-card">
              <div className="side-card-header">
                <h3>Reservas próximas</h3>
                <span>🕒</span>
              </div>

              <div className="booking-list">
                {bookings.map((booking) => (
                  <div key={booking.name} className="booking-item">
                    <div className="booking-avatar">
                      {booking.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <h4>{booking.name}</h4>
                      <p>{booking.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="primary-booking-btn">Nueva reserva</button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default HomePage;