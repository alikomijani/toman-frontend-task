import { Payment } from "@/api/types";
import LabelValueDisplay from "@/components/LabelValueDisplay";
import {
  PAYMENT_TYPE_TRANSLATE_MAP,
  STATUS_TYPE_TRANSLATE_MAP,
} from "@/modules/payments/constants";
import { STATUS_ICON_MAP } from "@/modules/payments/StatusIconMap";
import {
  Card,
  CardActionArea,
  CardContent,
  CardProps,
  Stack,
  Typography,
} from "@mui/material";

type PaymentCardProps = (
  | {
      payment: Payment;
      isLoading?: false;
    }
  | {
      payment?: undefined;
      isLoading: true;
    }
) &
  CardProps;

export default function PaymentCard({
  payment,
  isLoading,
  ...rest
}: PaymentCardProps) {
  return (
    <Card variant="outlined" {...rest}>
      <CardActionArea>
        <CardContent
          sx={{
            p: 3,
            px: 4,
          }}
        >
          <Typography sx={{ mb: 3 }} textAlign={"center"} variant="h6">
            {"مشخصات تراکنش"}
          </Typography>
          <Stack spacing={1}>
            <LabelValueDisplay
              isLoading={isLoading}
              label="شماره تراکنش"
              value={payment?.id}
            />
            <LabelValueDisplay
              label="مقدار"
              isLoading={isLoading}
              value={payment?.value.toLocaleString("fa")}
            />
            <LabelValueDisplay
              isLoading={isLoading}
              label="تاریخ تراکنش"
              value={
                payment?.paid_at
                  ? new Date(payment.paid_at).toLocaleString("fa")
                  : undefined
              }
            />
            <LabelValueDisplay
              isLoading={isLoading}
              label="نوع پرداخت"
              value={
                payment?.type
                  ? PAYMENT_TYPE_TRANSLATE_MAP[payment.type]
                  : undefined
              }
            />
            <LabelValueDisplay
              isLoading={isLoading}
              label="وضعیت"
              value={
                payment?.status ? (
                  <Stack direction="row" alignItems="center" gap={1}>
                    {STATUS_ICON_MAP[payment.status]}
                    {STATUS_TYPE_TRANSLATE_MAP[payment.status]}
                  </Stack>
                ) : undefined
              }
            />

            <LabelValueDisplay
              isLoading={isLoading}
              label="توضیحات"
              value={payment?.description}
            />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
