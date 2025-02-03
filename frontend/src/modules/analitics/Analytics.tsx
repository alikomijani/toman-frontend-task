import { Card, CardContent, Stack } from "@mui/material";
import AugmentedPaymentCard from "./StatusSummeryCard";
import LinearChart from "./LinearChart";
import useAugmentedPaymentData from "@/hooks/useAgumentedData";

type AnalyticsProps = {};

const Analytics = (props: AnalyticsProps) => {
  const data = useAugmentedPaymentData();
  return (
    <Card>
      <CardContent>
        <Stack direction="row-reverse">
          <Stack direction="row-reverse" gap={2}>
            <AugmentedPaymentCard
              color="success"
              title="success"
              paymentCount={data.success.count}
              totalPayment={data.success.amount}
            />
            <AugmentedPaymentCard
              color="warning"
              title="pending"
              paymentCount={data.pending.count}
              totalPayment={data.pending.amount}
            />
            <AugmentedPaymentCard
              color="error"
              title="failed"
              paymentCount={data.failed.count}
              totalPayment={data.failed.amount}
            />
          </Stack>
          <Stack flexGrow={1}>
            <LinearChart
              title="Count"
              m={2}
              values={[
                { value: data.failed.count, color: "error" },
                { value: data.pending.count, color: "warning" },
                { value: data.success.count, color: "success" },
              ]}
            />
            <LinearChart
              title="amount"
              m={2}
              values={[
                { value: data.failed.amount, color: "error" },
                { value: data.pending.amount, color: "warning" },
                { value: data.success.amount, color: "success" },
              ]}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default Analytics;
