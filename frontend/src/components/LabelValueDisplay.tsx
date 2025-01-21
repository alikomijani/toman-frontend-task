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
    <Typography
      variant="body2"
      sx={{
        color: (theme) => theme.palette.text.secondary,
      }}
    >
      {label}
    </Typography>
    <Typography component={"div"} variant="body2">
      {value ? value : <Skeleton width={50} />}
    </Typography>
  </Stack>
);
export default LabelValueDisplay;
