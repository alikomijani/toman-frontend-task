import { useInfinitePaymentList } from "@/api/payment.api";
import { useSearchParams } from "@/hooks/useSearchParams";
import { DEFAULT_PARAMS } from "./constants";
import { Grid2 } from "@mui/material";
import PaymentCard from "@/pages/payments/payment-card";
import FetchNextPage from "@/components/FetchNextPage";
import { useNavigate } from "react-router";

type Props = {};

export default function PaymentInfiniteView({}: Props) {
  const { debouncedParams } = useSearchParams({ ...DEFAULT_PARAMS, page: 1 });
  const navigate = useNavigate();
  const { data, hasNextPage, fetchNextPage, isFetching } =
    useInfinitePaymentList(debouncedParams);
  return (
    <Grid2 spacing={1} container>
      {data?.pages.map((page) =>
        page.entities.map((payment) => (
          <Grid2 size={{ xs: 12, md: 6 }} key={payment.id}>
            <PaymentCard
              onClick={() => navigate("/payments/" + payment.id)}
              payment={payment}
            />
          </Grid2>
        ))
      )}
      <Grid2 size={12}>
        <FetchNextPage
          hasNextPage={hasNextPage || isFetching}
          fetch={fetchNextPage}
        >
          <PaymentCard isLoading />
        </FetchNextPage>
      </Grid2>
    </Grid2>
  );
}
