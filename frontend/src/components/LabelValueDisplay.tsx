import { Skeleton, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

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
export default LabelValueDisplay;
