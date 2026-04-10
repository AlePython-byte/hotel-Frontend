import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import RoomsPage from "../pages/RoomsPage";
import NewReservationPage from "../pages/NewReservationPage";
import ReservationDetailPage from "../pages/ReservationDetailPage";
import ReservationManagementPage from "../pages/ReservationManagementPage";
import InvoicePage from "../pages/InvoicePage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="reservation/new" element={<NewReservationPage />} />
        <Route path="reservation/:reservationId" element={<ReservationDetailPage />} />
        <Route path="reservation/:reservationId/manage" element={<ReservationManagementPage />} />
        <Route path="reservation/:reservationId/invoice" element={<InvoicePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
