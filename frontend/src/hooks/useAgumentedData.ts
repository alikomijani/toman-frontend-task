import { useGetPaymentsList } from "@/api/payment.api";
import { PaymentStatus } from "@/api/types";
import { useMemo } from "react";

export type AugmentedPaymentData = Record<
  PaymentStatus,
  {
    count: number;
    amount: number;
  }
>;

export default function useAugmentedPaymentData() {
  const { data } = useGetPaymentsList({
    limit: 100,
    page: 1,
    search: "",
    status: "",
    type: "",
  });
  const augmentedData = useMemo(() => {
    const augmentedPaymentData: AugmentedPaymentData = {
      success: {
        count: 0,
        amount: 0,
      },
      failed: {
        count: 0,
        amount: 0,
      },
      pending: {
        count: 0,
        amount: 0,
      },
    };
    data?.entities.forEach((item) => {
      augmentedPaymentData[item.status].count++;
      augmentedPaymentData[item.status].amount += item.value;
    });
    return augmentedPaymentData;
  }, [data]);
  return augmentedData;
}
