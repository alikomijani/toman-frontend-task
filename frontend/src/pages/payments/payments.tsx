import { lazy } from "react";
import { Link } from "react-router";
import withSuspenseLoading from "@/components/withSuspenseLoading";
import useIsMobile from "@/hooks/useIsMobile";
import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Typography,
  Link as MuiLink,
} from "@mui/material";
const PaymentInfiniteView = withSuspenseLoading(
  lazy(() => import("@/modules/payments/PaymentInfiniteView"))
);

const PaymentTable = withSuspenseLoading(
  lazy(() => import("@/modules/payments/PaymentTable"))
);
function Payments() {
  const isMobile = useIsMobile();
  return (
    <Box>
      <Box p={1} pt={0}>
        <Breadcrumbs>
          <MuiLink component={Link} underline="hover" color="inherit" to="/">
            داشبورد
          </MuiLink>
          <Typography sx={{ color: "text.primary" }}>تراکنش ها</Typography>
        </Breadcrumbs>
      </Box>
      <Card sx={{ border: "none" }} variant="outlined">
        <CardContent sx={{ p: { xs: 0, md: 2 } }}>
          {isMobile ? <PaymentInfiniteView /> : <PaymentTable />}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Payments;
