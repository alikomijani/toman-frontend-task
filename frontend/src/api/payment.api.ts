import { AxiosRequestConfig } from "axios";
import api from "./base";
import { PaginatedServerApi, Payment, PaymentParams } from "./types";
import { useQuery } from "@tanstack/react-query";

async function getPaymentsList(config?: AxiosRequestConfig) {
  const res = await api.get<PaginatedServerApi<Payment>>("/payments", config);
  return res.data;
}

async function getPaymentById(id: string, config?: AxiosRequestConfig) {
  const res = await api.get<Payment>("/payments/" + id, config);
  return res.data;
}
export function useGetPaymentsList(params: PaymentParams) {
  return useQuery({
    queryKey: ["payments", params],
    queryFn: () => getPaymentsList({ params }),
  });
}

export function useGetPaymentById(id: string) {
  return useQuery({
    queryKey: ["payments", id],
    queryFn: () => getPaymentById(id),
  });
}
