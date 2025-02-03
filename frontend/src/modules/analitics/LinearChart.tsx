import {
  Box,
  BoxProps,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

export interface LinearChartProps extends BoxProps {
  title: string;
  values: { value: number; color: LinearProgressProps["color"] }[];
}

const LinearChart = ({ title, values, ...boxProps }: LinearChartProps) => {
  const sum = useMemo(() => {
    return values.reduce((prev, item) => prev + item.value, 0);
  }, [values]);

  return (
    <Box {...boxProps}>
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {values.map((item, index) => (
          <LinearProgress
            key={index}
            color={item.color}
            variant="determinate"
            value={100}
            sx={{
              height: 20,
              width: `${(item.value / sum) * 100}%`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LinearChart;
