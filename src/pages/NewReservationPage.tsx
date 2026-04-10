import PageTitle from "../components/common/PageTitle";
import ReservationForm from "../components/reservation/ReservationForm";

function NewReservationPage() {
  return (
    <section>
      <PageTitle
        title="Nueva reserva"
        subtitle="Registra la información del huésped para confirmar la reserva seleccionada."
      />
      <ReservationForm />
    </section>
  );
}

export default NewReservationPage;
