import { Card, CardContent, Typography, TypographyProps } from "@mui/material";

export type AugmentedPaymentCardProps = {
  title: string;
  color: TypographyProps["color"];
  paymentCount: number;
  totalPayment: number;
};

const AugmentedPaymentCard = ({
  title,
  color,
  paymentCount,
  totalPayment,
}: AugmentedPaymentCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" color={color}>
          {title}
        </Typography>
        <Typography variant="h6">{paymentCount} payment</Typography>
        <Typography variant="h6">{totalPayment.toLocaleString()}$</Typography>
      </CardContent>
    </Card>
  );
};
export default AugmentedPaymentCard;
