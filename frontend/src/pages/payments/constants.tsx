import { ReactElement } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { PaymentStatus, PaymentTypes } from "@/api/types";
import { Tooltip } from "@mui/material";

const STATUS_ICON_MAP: Record<PaymentStatus, ReactElement> = {
  failed: (
    <Tooltip title="خطا">
      <ErrorIcon color="error" />
    </Tooltip>
  ),
  pending: (
    <Tooltip title="در حال انجام">
      <AutorenewIcon color="info" />
    </Tooltip>
  ),
  success: (
    <Tooltip title="موفق">
      <CheckCircleIcon color="success" />
    </Tooltip>
  ),
} as const;
const STATUS_TYPE_TRANSLATE_MAP: Record<PaymentStatus, string> = {
  failed: "خطا",
  success: "موفق",
  pending: "درحال انجام",
};
const PAYMENT_TYPE_TRANSLATE_MAP: Record<PaymentTypes, string> = {
  bonus: "پاداش",
  commission: "کمیسیون",
  overtime: "اضافه کاری",
  salary: "حقوق",
  transportation: "هزینه جابه‌جایی",
} as const;

export {
  STATUS_ICON_MAP,
  PAYMENT_TYPE_TRANSLATE_MAP,
  STATUS_TYPE_TRANSLATE_MAP,
};
