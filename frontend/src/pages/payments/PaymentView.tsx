import { useGetPaymentById } from "@/api/payment.api";
import { Box, Breadcrumbs, Typography, Link as MuiLink } from "@mui/material";

import { Link, useParams } from "react-router";

import PageError from "@/components/PageError";
import PaymentCard from "./payment-card";

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
      <PaymentCard
        payment={data}
        sx={{
          maxWidth: 400,
        }}
      />
    </Box>
  );
}
