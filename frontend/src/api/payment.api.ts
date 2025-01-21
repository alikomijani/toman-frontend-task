import { AxiosError, AxiosRequestConfig } from "axios";
import api from "./base";
import { PaginatedServerApi, Payment, PaymentParams } from "./types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

async function getPaymentsList(config?: AxiosRequestConfig) {
  const res = await api.get<PaginatedServerApi<Payment>>("/payments", config);
  return res.data;
}

async function getPaymentById(id: string, config?: AxiosRequestConfig) {
  const res = await api.get<Payment>("/payments/" + id, config);
  return res.data;
}

export function useGetPaymentById(id: string) {
  return useQuery<Payment, AxiosError>({
    queryKey: ["payments", id],
    queryFn: () => getPaymentById(id),
  });
}

export function useGetPaymentsList(params: PaymentParams) {
  return useQuery<PaginatedServerApi<Payment>, AxiosError>({
    queryKey: ["payments", params],
    queryFn: () => getPaymentsList({ params }),
  });
}

export function useInfinitePaymentList(params: PaymentParams) {
  return useInfiniteQuery<PaginatedServerApi<Payment>, AxiosError>({
    queryKey: ["infinite-payments", params],
    queryFn: ({ pageParam }) => getPaymentsList({ params: pageParam }),
    initialPageParam: {
      page: 1,
      limit: 10,
    },
    getNextPageParam: (lastPage) => ({
      ...params,
      page: lastPage.page + 1,
    }),
  });
}
