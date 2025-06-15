import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import LoginPage from "./pages/LoginPage/LoginPage";
import FlightsPage from "./pages/FlightsPage/FlightsPage";
import FlightDetailsPage from "./pages/FlightDetailsPage/FlightDetailsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/flights" element={<PrivateRoute><FlightsPage /></PrivateRoute>} />
        <Route path="/flights/:id" element={<PrivateRoute><FlightDetailsPage /></PrivateRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
