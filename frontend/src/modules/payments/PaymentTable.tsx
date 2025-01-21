import { useGetPaymentsList } from "@/api/payment.api";
import { useSearchParams } from "@/hooks/useSearchParams";
import {
  TableContainer,
  TextField,
  Toolbar,
  Table,
  Tooltip,
  IconButton,
  TableRow,
  TableHead,
  TableCell,
  Stack,
  MenuItem,
  TableBody,
  Button,
  TablePagination,
  Box,
  Typography,
} from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent } from "react";
import { Link } from "react-router";
import FilterIcon from "@/components/FilterIcon";
import {
  DEFAULT_PARAMS,
  PAYMENT_TYPE_TRANSLATE_MAP,
  STATUS_TYPE_TRANSLATE_MAP,
} from "@/modules/payments/constants";
import { PaymentStatus, PaymentTypes } from "@/api/types";
import { TableLoading } from "@/components/TableLoading";
import PageError from "@/components/PageError";
import { STATUS_ICON_MAP } from "./StatusIconMap";

export default function PaymentTable() {
  const { params, setParams, debouncedParams } =
    useSearchParams(DEFAULT_PARAMS);

  const { data, isLoading, error, isError } =
    useGetPaymentsList(debouncedParams);

  function handleChangePage(_: unknown, page: number) {
    setParams((prev) => ({ ...prev, page: page + 1 })); // mui use zero index page number
  }
  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
    const limit = parseInt(e.target.value);
    setParams((prev) => ({ ...prev, page: 1, limit }));
  };
  const handleSearchParams = (e: ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      page: 1,
    }));
  };
  const hasFilter = params.search || params.type || params.status;
  const clearFilter = () => {
    setParams(DEFAULT_PARAMS);
  };
  if (isError) {
    return <PageError error={error} />;
  }
  return (
    <TableContainer
      sx={{
        border: ({ palette }) => `1px solid ${palette.divider}`,
        borderRadius: 1,
      }}
    >
      <Stack direction="row" p={2}>
        <Typography variant="h6">تراکنش ها</Typography>
        <TextField
          size="small"
          name="search"
          slotProps={{
            input: {
              startAdornment: <SearchIcon color="action" />,
            },
          }}
          placeholder="جست‌وجو"
          value={params.search}
          onChange={handleSearchParams}
          sx={{
            mx: 2,
            width: 300,
          }}
        />
        {hasFilter && (
          <Tooltip title="پاک کردن فیلترها">
            <IconButton onClick={clearFilter}>
              <FilterAltOffIcon />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>شناسه</TableCell>
            <TableCell>مقدار</TableCell>
            <TableCell>توضیحات</TableCell>
            <TableCell>
              <Stack direction="row" alignItems={"center"}>
                <FilterIcon>
                  <TextField
                    value={params.type}
                    onChange={handleSearchParams}
                    name="type"
                    select
                    label="نوع پرداخت"
                    sx={{ width: 200 }}
                  >
                    <MenuItem key={0} value="">
                      پاک کردن فیلتر
                    </MenuItem>
                    {Object.keys(PAYMENT_TYPE_TRANSLATE_MAP).map((key) => (
                      <MenuItem key={key} value={key}>
                        {PAYMENT_TYPE_TRANSLATE_MAP[key as PaymentTypes]}
                      </MenuItem>
                    ))}
                  </TextField>
                </FilterIcon>
                نوع پرداخت
              </Stack>
            </TableCell>
            <TableCell>
              <Stack direction="row" alignItems={"center"}>
                <FilterIcon>
                  <TextField
                    value={params.status}
                    onChange={handleSearchParams}
                    name="status"
                    select
                    sx={{ width: 200 }}
                    label="وضعیت"
                  >
                    <MenuItem key={1} value="">
                      پاک کردن فیلتر
                    </MenuItem>
                    {Object.keys(STATUS_TYPE_TRANSLATE_MAP).map((key) => (
                      <MenuItem key={key} value={key}>
                        {STATUS_TYPE_TRANSLATE_MAP[key as PaymentStatus]}
                      </MenuItem>
                    ))}
                  </TextField>
                </FilterIcon>
                وضعیت
              </Stack>
            </TableCell>
            <TableCell>تاریخ</TableCell>
            <TableCell sx={{ width: 150 }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && <TableLoading rows={+params.limit || 10} cells={7} />}
          {data?.entities.map((payment) => (
            <TableRow
              key={payment.id}
              hover
              sx={{
                ":hover": {
                  a: {
                    display: "block",
                  },
                },
              }}
            >
              <TableCell scope="row" component="th">
                {payment.id}
              </TableCell>
              <TableCell>{payment.value.toLocaleString("fa")}</TableCell>
              <TableCell>{payment.description}</TableCell>
              <TableCell sx={{ pl: 7 }}>
                {PAYMENT_TYPE_TRANSLATE_MAP[payment.type]}
              </TableCell>
              <TableCell sx={{ pl: 6 }}>
                {STATUS_ICON_MAP[payment.status]}
              </TableCell>
              <TableCell>
                {new Date(payment.paid_at).toLocaleDateString("fa")}
              </TableCell>
              <TableCell>
                <Button
                  component={Link}
                  to={"/payments/" + payment.id}
                  size="small"
                  color="info"
                  variant="outlined"
                  sx={{
                    display: "none",
                  }}
                >
                  مشاهده تراکنش
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        labelDisplayedRows={({ from, to, count }) =>
          `نمایش ${from} - ${to} از ${count}`
        }
        labelRowsPerPage="تعداد تراکنش در هر صفحه"
        count={data?.total || 0}
        rowsPerPage={+(params.limit || 10)}
        page={+((params.page || 1) - 1)} // mui use zero page number
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
