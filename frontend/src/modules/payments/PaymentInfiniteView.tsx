import { useInfinitePaymentList } from "@/api/payment.api";
import { useSearchParams } from "@/hooks/useSearchParams";
import { DEFAULT_PARAMS } from "./constants";
import { Grid2 } from "@mui/material";
import PaymentCard from "@/pages/payments/payment-card";
import FetchNextPage from "@/components/FetchNextPage";

type Props = {};

export default function PaymentInfiniteView({}: Props) {
  const { debouncedParams } = useSearchParams(DEFAULT_PARAMS);
  const { data, hasNextPage, fetchNextPage, isLoading } =
    useInfinitePaymentList(debouncedParams);
  return (
    <Grid2 spacing={1} container>
      {data?.pages.map((page) =>
        page.entities.map((payment) => (
          <Grid2 size={{ xs: 12, md: 6 }} key={payment.id}>
            <PaymentCard
              payment={payment}
              elevation={0}
              sx={{ borderBottom: 1 }}
            />
          </Grid2>
        ))
      )}

      <Grid2 size={12}>
        <FetchNextPage
          hasNextPage={hasNextPage || isLoading}
          fetch={fetchNextPage}
        />
      </Grid2>
    </Grid2>
  );
}
