import { ReactElement } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Tooltip from "@mui/material/Tooltip";
import { PaymentStatus } from "@/api/types";

export const STATUS_ICON_MAP: Record<PaymentStatus, ReactElement> = {
  failed: (
    <Tooltip title="خطا">
      <ErrorIcon color="error" fontSize="small" />
    </Tooltip>
  ),
  pending: (
    <Tooltip title="در حال انجام">
      <AutorenewIcon color="info" fontSize="small" />
    </Tooltip>
  ),
  success: (
    <Tooltip title="موفق">
      <CheckCircleIcon color="success" fontSize="small" />
    </Tooltip>
  ),
} as const;
