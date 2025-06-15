import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema } from "../../utils/validationSchemas";
import { useFlights } from "../../api/flightService";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import styles from "./FlightsPage.module.css";
import { CITIES, DATES } from "../../utils/constants";

export default function FlightsPage() {
  const [params, setParams] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(searchSchema),
  });

  const { data: flights, isLoading, isError, error } = useFlights(params);

  const onSubmit = (data) => {
  setParams({
    ...data,
    origin: data.origin.trim(),
    destination: data.destination.trim(),
    departureDate: data.departureDate?.trim ? data.departureDate.trim() : data.departureDate,
     });
    };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Пошук рейсів</h2>
        <label>
          Місто відправлення
          <input
            {...register("origin")}
            placeholder={`Напр.: ${CITIES[0]}`}
            autoComplete="off"
          />
          {errors.origin && <span>{errors.origin.message}</span>}
        </label>
        <label>
          Місто прибуття
          <input
            {...register("destination")}
            placeholder={`Напр.: ${CITIES[1]}`}
            autoComplete="off"
          />
          {errors.destination && <span>{errors.destination.message}</span>}
        </label>
        <label>
          Дата відправлення
          <input
            type="date"
            {...register("departureDate")}
            placeholder={DATES[0]}
            min={DATES[0]}
            max={DATES[DATES.length - 1]}
          />
          {errors.departureDate && <span>{errors.departureDate.message}</span>}
        </label>
        <button type="submit">Знайти</button>
        <div className={styles.hint}>
            <b>Підказка:</b> пошук міст можливий тільки англійською.<br />
            Наприклад: {CITIES.slice(0, 7).join(", ")}...<br />
            Дати: {DATES.slice(0, 5).join(", ")}...
        </div>

        <div className={styles.toursBlock}>
        <b>Рекомендуємо до пошуку:</b>
        <ul>
            <li>New York &rarr; London — 2025-08-10</li>
            <li>London &rarr; Paris — 2025-08-11</li>
            <li>Frankfurt &rarr; Rome — 2025-08-12</li>
            <li>Paris &rarr; Madrid — 2025-08-13</li>
            <li>Dubai &rarr; Singapore — 2025-08-14</li>
            <li>Doha &rarr; Bangkok — 2025-08-15</li>
            <li>Atlanta &rarr; Miami — 2025-08-10</li>
            <li>Toronto &rarr; Vancouver — 2025-08-11</li>
            <li>London &rarr; New York — 2025-08-10</li>
            <li>Berlin &rarr; Milan — 2025-08-14</li>
            <li>Tokyo &rarr; Seoul — 2025-08-17</li>
            <li>Moscow &rarr; St. Petersburg — 2025-08-11</li>
        </ul>
        </div>

      </form>
      {isLoading && <LoadingSpinner />}
      {isError && <div className={styles.error}>Помилка: {error?.message || "Не вдалося отримати дані"}</div>}
      {flights && !isLoading && (
        <div className={styles.list}>
          {flights.length === 0 ? (
            <div className={styles.empty}>Нічого не знайдено</div>
          ) : (
            flights.map(flight => (
              <div key={flight.id} className={styles.card}>
                <div className={styles.info}>
                  <strong>№ {flight.flightNumber}</strong> | {flight.origin} — {flight.destination}
                  <div>Виліт: {flight.departureDate} {flight.departureTime}</div>
                  <div>Приліт: {flight.arrivalTime}</div>
                  <div>Авіалінія: {flight.airline}</div>
                  <div>Ціна: <b>{flight.price} $</b></div>
                  <div>Доступно місць: {flight.availableSeats}</div>
                </div>
                <button
                  className={styles.book}
                  onClick={() => navigate(`/flights/${flight.id}`)}
                  disabled={flight.availableSeats < 1}
                >
                  Забронювати
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
