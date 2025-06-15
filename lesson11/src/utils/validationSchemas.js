import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Обов'язково"),
  password: z.string().min(6, "Мінімум 6 символів"),
});

export const searchSchema = z.object({
  origin: z.string().min(1, "Вкажіть місто відправлення"),
  destination: z.string().min(1, "Вкажіть місто прибуття"),
  departureDate: z.string().min(1, "Оберіть дату"),
});

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Вкажіть ПІБ"),
  email: z.string().email("Некоректний email"),
  phoneNumber: z.string().optional(),
  confirmAgreement: z.literal(true, { errorMap: () => ({ message: "Потрібна згода" }) }),
});
