import { useSearchParams } from "@/hooks/useSearchParams";
import { PAYMENT_DEFAULT_PARAMS } from "@/modules/payments/constants";
import { TablePagination as MuiTablePagination } from "@mui/material";
import { ChangeEvent } from "react";

type TablePaginationProps = {
  count?: number;
};
export default function TablePagination({ count = 0 }: TablePaginationProps) {
  const { params, setParams } = useSearchParams(PAYMENT_DEFAULT_PARAMS);
  function handleChangePage(_: unknown, page: number) {
    setParams((prev) => ({ ...prev, page: page + 1 })); // mui use zero index page number
  }
  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
    const limit = parseInt(e.target.value);
    setParams((prev) => ({ ...prev, page: 1, limit }));
  };
  return (
    <MuiTablePagination
      rowsPerPageOptions={[10, 15, 20]}
      component="div"
      labelDisplayedRows={({ from, to, count }) =>
        `نمایش ${from} - ${to} از ${count}`
      }
      labelRowsPerPage="تعداد تراکنش در هر صفحه"
      count={count}
      rowsPerPage={+(params.limit || 10)}
      page={+((params.page || 1) - 1)} // mui use zero page number
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
