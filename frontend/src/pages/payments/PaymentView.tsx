import { useGetPaymentById } from "@/api/payment.api";
import { Box, Breadcrumbs, Typography, Link as MuiLink } from "@mui/material";
import { Link, useParams } from "react-router";
import PaymentCard from "./payment-card";
import withSuspenseLoading from "@/components/withSuspenseLoading";
import { lazy } from "react";

const PageError = withSuspenseLoading(
  lazy(() => import("@/components/PageError"))
);

type Props = {};

export default function PaymentView({}: Props) {
  const { id } = useParams<{ id: string }>();
  const { data, isError, error } = useGetPaymentById(id!);
  if (isError) {
    return <PageError error={error} />;
  }
  return (
    <Box>
      <Box p={1}>
        <Breadcrumbs
          sx={{
            fontSize: 14,
          }}
        >
          <MuiLink component={Link} underline="hover" color="inherit" to="/">
            داشبورد
          </MuiLink>
          <MuiLink
            component={Link}
            underline="hover"
            color="inherit"
            to="/payments"
          >
            تراکنش ها
          </MuiLink>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            {id}
          </Typography>
        </Breadcrumbs>
      </Box>
      {data ? (
        <PaymentCard
          payment={data}
          sx={{
            maxWidth: 400,
          }}
        />
      ) : (
        <PaymentCard
          isLoading
          sx={{
            maxWidth: 400,
          }}
        />
      )}
    </Box>
  );
}
