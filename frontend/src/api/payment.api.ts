import { AxiosRequestConfig } from "axios";
import api from "./base";
import { PaginatedServerApi, Payment, PaymentParams } from "./types";
import { useQuery } from "react-query";

async function getPaymentsList(config?: AxiosRequestConfig) {
  const data = await api.get<PaginatedServerApi<Payment>>("/payments", config);
  return data;
}

async function getPaymentById(id: string, config?: AxiosRequestConfig) {
  const data = await api.get<Payment>("/payments/" + id, config);
  return data;
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
