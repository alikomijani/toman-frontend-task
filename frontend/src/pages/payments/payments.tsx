type Props = {};
import { useGetPaymentsList } from "@/api/payment.api";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
} from "@mui/material";
import {
  PAYMENT_TYPE_TRANSLATE_MAP,
  STATUS_ICON_MAP,
  STATUS_TYPE_TRANSLATE_MAP,
} from "./constants";
import { ChangeEvent, useState } from "react";
import { PaymentParams, PaymentStatus, PaymentTypes } from "@/api/types";
import { TableLoading } from "@/components/TableLoading";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "@uidotdev/usehooks";
import FilterIcon from "@/components/FilterIcon";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Link } from "react-router";
function Payments({}: Props) {
  const [params, setParams] = useState<PaymentParams>({
    page: 1,
    limit: 10,
    search: "",
    type: "",
    status: "",
  });
  const debouncedSearch = useDebounce(params.search, 500);

  const { data, isLoading } = useGetPaymentsList({
    ...params,
    search: debouncedSearch,
  });

  function handleChangePage(_: unknown, page: number) {
    setParams((prev) => ({ ...prev, page: page + 1 }));
  }
  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
    const limit = parseInt(e.target.value);
    setParams((prev) => ({ ...prev, limit }));
  };
  const handleSearchParams = (e: ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const hasFilter = params.search || params.type || params.status;
  const clearFilter = () => {
    setParams((prev) => ({ ...prev, search: "", type: "", status: "" }));
  };
  return (
    <Card>
      <CardContent>
        <CardHeader title="مدیریت پرداخت ها" />
        <TableContainer>
          <Toolbar>
            <TextField
              size="small"
              name="search"
              slotProps={{
                input: {
                  startAdornment: <SearchIcon />,
                },
              }}
              placeholder="جست‌وجو"
              value={params.search}
              onChange={handleSearchParams}
              sx={{
                width: 400,
              }}
            />
            {hasFilter && (
              <Tooltip title="پاک کردن فیلترها">
                <IconButton onClick={clearFilter}>
                  <FilterAltOffIcon />
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
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
                        <MenuItem value="">پاک کردن فیلتر</MenuItem>
                        {Object.keys(PAYMENT_TYPE_TRANSLATE_MAP).map((key) => (
                          <MenuItem value={key}>
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
                        <MenuItem value="">پاک کردن فیلتر</MenuItem>
                        {Object.keys(STATUS_TYPE_TRANSLATE_MAP).map((key) => (
                          <MenuItem value={key}>
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
              {isLoading && (
                <TableLoading rows={params.limit || 10} cells={6} />
              )}
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
                  <TableCell>
                    {PAYMENT_TYPE_TRANSLATE_MAP[payment.type]}
                  </TableCell>
                  <TableCell>{STATUS_ICON_MAP[payment.status]}</TableCell>
                  <TableCell>
                    {new Date(payment.paid_at).toLocaleDateString("fa")}
                  </TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={"/payments/" + payment.id}
                      size="small"
                      color="info"
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
            rowsPerPage={params.limit || 10}
            page={(params.page || 1) - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default Payments;
