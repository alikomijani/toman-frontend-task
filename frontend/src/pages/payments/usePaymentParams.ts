import { PaymentParams, PaymentStatus, PaymentTypes } from "@/api/types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export function usePaymentParams(): [
  PaymentParams,
  React.Dispatch<React.SetStateAction<PaymentParams>>
] {
  const [params, setParams] = useState<PaymentParams>({
    page: 1,
    limit: 10,
    search: "",
    type: "",
    status: "",
  });
  const location = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams(
      params as unknown as URLSearchParams
    );
    nav(location.pathname + "?" + searchParams.toString());
  }, [params]);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const [search, type, status, page, limit] = [
      searchParams.get("search"),
      searchParams.get("type"),
      searchParams.get("status"),
      searchParams.get("page"),
      searchParams.get("limit"),
    ];
    setParams({
      search: search ?? "",
      type: (type ?? "") as PaymentTypes,
      status: (status ?? "") as PaymentStatus,
      page: parseInt(page ?? "1"),
      limit: parseInt(limit ?? "10"),
    });
  }, [location.search]);
  return [params, setParams];
}
