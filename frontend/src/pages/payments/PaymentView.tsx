import { useGetPaymentById } from "@/api/payment.api";
import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { ReactNode } from "react";
import { Link, useParams } from "react-router";
import {
  PAYMENT_TYPE_TRANSLATE_MAP,
  STATUS_ICON_MAP,
  STATUS_TYPE_TRANSLATE_MAP,
} from "./constants";

type Props = {};

export default function PaymentView({}: Props) {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetPaymentById(id!);
  return (
    <Box>
      <Box p={1}>
        <Breadcrumbs>
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
          <Typography sx={{ color: "text.primary" }}>{data?.id}</Typography>
        </Breadcrumbs>
      </Box>
      <Card
        sx={{
          maxWidth: 500,
        }}
      >
        <CardContent>
          <CardHeader title="مشخصات تراکنش" />
          <Stack spacing={2}>
            <LabelValueDisplay label="شماره تراکنش" value={data?.id} />
            <LabelValueDisplay
              label="مقدار"
              value={data?.value.toLocaleString("fa")}
            />
            <LabelValueDisplay label="توضیحات" value={data?.description} />
            <LabelValueDisplay
              label="نوع پرداخت"
              value={
                data?.type ? PAYMENT_TYPE_TRANSLATE_MAP[data.type] : undefined
              }
            />
            <LabelValueDisplay
              label="وضعیت"
              value={
                data?.status ? (
                  <Stack direction="row" alignItems="center" gap={1}>
                    {STATUS_TYPE_TRANSLATE_MAP[data.status]}{" "}
                    {STATUS_ICON_MAP[data.status]}
                  </Stack>
                ) : undefined
              }
            />
            <LabelValueDisplay
              label="تاریخ تراکنش"
              value={
                data?.paid_at
                  ? new Date(data.paid_at).toLocaleString("fa")
                  : undefined
              }
            />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

const LabelValueDisplay = ({
  label,
  value,
}: {
  label: string;
  value: ReactNode | undefined;
}) => (
  <Stack direction="row" justifyContent={"space-between"} alignItems={"center"}>
    <Typography>{label}:</Typography>
    <Typography>{value ? value : <Skeleton width={50} />}</Typography>
  </Stack>
);
