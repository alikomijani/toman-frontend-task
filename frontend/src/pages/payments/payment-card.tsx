import { Payment } from "@/api/types";
import LabelValueDisplay from "@/components/LabelValueDisplay";
import {
  PAYMENT_TYPE_TRANSLATE_MAP,
  STATUS_TYPE_TRANSLATE_MAP,
} from "@/modules/payments/constants";
import { STATUS_ICON_MAP } from "@/modules/payments/StatusIconMap";
import { Card, CardContent, CardProps, Stack, Typography } from "@mui/material";

interface PaymentCardProps extends CardProps {
  payment?: Payment;
}

export default function PaymentCard({ payment, ...rest }: PaymentCardProps) {
  return (
    <Card variant="outlined" {...rest}>
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
          <LabelValueDisplay label="شماره تراکنش" value={payment?.id} />
          <LabelValueDisplay
            label="مقدار"
            value={payment?.value.toLocaleString("fa")}
          />
          <LabelValueDisplay
            label="تاریخ تراکنش"
            value={
              payment?.paid_at
                ? new Date(payment.paid_at).toLocaleString("fa")
                : undefined
            }
          />
          <LabelValueDisplay
            label="نوع پرداخت"
            value={
              payment?.type
                ? PAYMENT_TYPE_TRANSLATE_MAP[payment.type]
                : undefined
            }
          />
          <LabelValueDisplay
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

          <LabelValueDisplay label="توضیحات" value={payment?.description} />
        </Stack>
      </CardContent>
    </Card>
  );
}
