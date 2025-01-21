import type { PaymentParams, PaymentStatus, PaymentTypes } from "@/api/types";

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

const PAYMENT_DEFAULT_PARAMS: PaymentParams = {
  limit: 10,
  page: 1,
  search: "",
  status: "",
  type: "",
};

export {
  PAYMENT_TYPE_TRANSLATE_MAP,
  STATUS_TYPE_TRANSLATE_MAP,
  PAYMENT_DEFAULT_PARAMS,
};
