import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFlightById, useBookFlight } from "../../api/flightService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "../../utils/validationSchemas";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import styles from "./FlightDetailsPage.module.css";

export default function FlightDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: flight, isLoading, isError, error } = useFlightById(id);
  const bookMutation = useBookFlight();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(bookingSchema)
  });

  const onSubmit = () => {
    if (flight.availableSeats < 1) {
      alert("Немає вільних місць");
      return;
    }
    bookMutation.mutate(
      { id, availableSeats: flight.availableSeats - 1 },
      {
        onSuccess: () => {
          alert("Бронювання успішне!");
          navigate("/flights");
        },
        onError: () => alert("Помилка бронювання, спробуйте ще раз"),
      }
    );
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className={styles.error}>Не вдалося отримати дані: {error?.message}</div>;
  if (!flight) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>Рейс № {flight.flightNumber}</h2>
        <div><b>{flight.origin} — {flight.destination}</b></div>
        <div>Виліт: {flight.departureDate} {flight.departureTime}</div>
        <div>Приліт: {flight.arrivalTime}</div>
        <div>Авіалінія: {flight.airline}</div>
        <div>Ціна: <b>{flight.price} $</b></div>
        <div>Доступно місць: {flight.availableSeats}</div>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h3>Бронювання</h3>
        <label>
          Повне ім'я
          <input {...register("fullName")} />
          {errors.fullName && <span>{errors.fullName.message}</span>}
        </label>
        <label>
          Email
          <input type="email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </label>
        <label>
          Телефон (необов'язково)
          <input {...register("phoneNumber")} />
        </label>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("confirmAgreement")} />
          <span>Я погоджуюсь з умовами бронювання</span>
        </label>
        {errors.confirmAgreement && <span>{errors.confirmAgreement.message}</span>}
        <button type="submit" disabled={bookMutation.isLoading || flight.availableSeats < 1}>
          {bookMutation.isLoading ? "Бронювання..." : "Підтвердити"}
        </button>
      </form>
    </div>
  );
}
