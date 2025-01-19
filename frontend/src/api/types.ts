export enum PaymentStatus {
  SUCCESS = "success",
  PENDING = "pending",
  FAILED = "failed",
}
export enum PaymentTypes {
  SALARY = "salary",
  BONUS = "bonus",
  COMMISSION = "commission",
  TRANSPORTATION = "transportation",
  OVERTIME = "overtime",
}
export interface Payment {
  id: string;
  type: PaymentTypes;
  value: number;
  paid_at: string;
  status: PaymentStatus;
  description: string;
}
export interface PaginatedServerApi<T> {
  entities: T[];
  limit: number;
  page: number;
  total: number;
}
export interface PaginationParams {
  page: number;
  limit: number;
}
export interface PaymentParams extends PaginationParams {
  search: string;
  type: PaymentTypes | "";
  status: PaymentStatus | "";
}
