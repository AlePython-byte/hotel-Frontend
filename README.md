# Hotel Reservation Frontend

Frontend desarrollado con React + TypeScript + Vite para el caso de estudio de reservas de hotel.

## Características

- Búsqueda de habitaciones por fechas y tipo.
- Visualización de disponibilidad.
- Selección de habitación con vista previa de precio.
- Registro de datos del huésped.
- Gestión de reserva con servicios adicionales.
- Simulación de check-in y check-out.
- Factura final.
- Código en inglés y textos visibles en español.

## Tecnologías

- React
- TypeScript
- Vite
- React Router DOM
- CSS modular por secciones

## Cómo ejecutar

```bash
npm install
npm run dev
```

## Estructura principal

- `pages/`: vistas principales
- `components/`: componentes reutilizables
- `services/`: comunicación y lógica de negocio simulada
- `types/` y `enums/`: tipado del proyecto
- `utils/`: utilidades de fechas, dinero y almacenamiento local

## Nota

El proyecto usa datos simulados y `localStorage` para mostrar el flujo completo mientras se conecta con el backend en Spring Boot.
