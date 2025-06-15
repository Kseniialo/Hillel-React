import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../utils/constants";

export function useFlights(params) {
  return useQuery({
    queryKey: ["flights", params],
    queryFn: async () => {
      if (!params) return [];
      const query = [];
      if (params.origin) query.push(`origin=${encodeURIComponent(params.origin)}`);
      if (params.destination) query.push(`destination=${encodeURIComponent(params.destination)}`);
      if (params.departureDate) query.push(`departureDate=${params.departureDate}`);
      const url = query.length ? `${API_URL}?${query.join("&")}` : API_URL;
      const { data } = await axios.get(url);
      return data.filter(
        f =>
          (!params.origin || f.origin.toLowerCase() === params.origin.toLowerCase()) &&
          (!params.destination || f.destination.toLowerCase() === params.destination.toLowerCase()) &&
          (!params.departureDate || f.departureDate === params.departureDate)
      );
    },
    enabled: !!params,
    staleTime: 1 * 60 * 1000,
  });
}

export function useFlightById(id) {
  return useQuery({
    queryKey: ["flights", id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useBookFlight() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, availableSeats }) => {
      const { data } = await axios.put(`${API_URL}/${id}`, { availableSeats });
      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(["flights", variables.id]);
      queryClient.invalidateQueries(["flights"]);
    },
  });
}
