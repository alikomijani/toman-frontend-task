import { useInfinitePaymentList } from "@/api/payment.api";
import { useSearchParams } from "@/hooks/useSearchParams";
import { PAYMENT_DEFAULT_PARAMS } from "./constants";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  Typography,
} from "@mui/material";
import PaymentCard from "@/pages/payments/payment-card";
import FetchNextPage from "@/components/FetchNextPage";
import { useNavigate } from "react-router";
import MobileFilter from "./MobileFilter";
import NotFou from "@assets/404-error.jpg";
import withSuspenseLoading from "@/components/withSuspenseLoading";
import { lazy } from "react";

const PageError = withSuspenseLoading(
  lazy(() => import("@/components/PageError"))
);

export default function PaymentInfiniteView() {
  const { debouncedParams, setParams } = useSearchParams(
    PAYMENT_DEFAULT_PARAMS
  );
  const navigate = useNavigate();
  const { data, hasNextPage, fetchNextPage, isLoading, error, isError } =
    useInfinitePaymentList(debouncedParams);
  if (isError) {
    return <PageError error={error} />;
  }
  return (
    <Box>
      <MobileFilter />
      <Grid2 spacing={1} container>
        {data?.pages[0].total === 0 && (
          <Grid2 size={12} textAlign="center">
            <Card variant="outlined">
              <CardContent>
                <img src={NotFou} width={"100%"} />
                <Typography gutterBottom>
                  با فیلترهای موجود داده ای یافت نشد!
                </Typography>
                <Button onClick={() => setParams(PAYMENT_DEFAULT_PARAMS)}>
                  پاک کردن فیلترها
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        )}
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
            hasNextPage={hasNextPage || isLoading}
            fetch={fetchNextPage}
          >
            <PaymentCard isLoading />
          </FetchNextPage>
        </Grid2>
      </Grid2>
    </Box>
  );
}
