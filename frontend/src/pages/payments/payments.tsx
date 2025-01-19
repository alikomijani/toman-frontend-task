import { useGetPaymentsList } from "@/api/payment.api";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  MenuItem,
  Link as MuiLink,
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
  Typography,
} from "@mui/material";
import {
  PAYMENT_TYPE_TRANSLATE_MAP,
  STATUS_ICON_MAP,
  STATUS_TYPE_TRANSLATE_MAP,
} from "./constants";
import { ChangeEvent, useEffect, useState } from "react";
import { PaymentParams, PaymentStatus, PaymentTypes } from "@/api/types";
import { TableLoading } from "@/components/TableLoading";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "@uidotdev/usehooks";
import FilterIcon from "@/components/FilterIcon";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Link, useLocation, useNavigate } from "react-router";
function Payments() {
  const location = useLocation();
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
    setParams((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      page: 1,
    }));
  };
  const hasFilter = params.search || params.type || params.status;
  const clearFilter = () => {
    setParams({
      page: 1,
      limit: 10,
      search: "",
      type: "",
      status: "",
    });
  };
  const nav = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams(
      params as unknown as URLSearchParams
    );
    nav(location.pathname + "?" + searchParams.toString());
  }, [params]);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const [search, type, status, page, limit] = [
      searchParams.get("search"),
      searchParams.get("type"),
      searchParams.get("status"),
      searchParams.get("page"),
      searchParams.get("limit"),
    ];
    setParams({
      search: search ?? "",
      type: (type ?? "") as PaymentTypes,
      status: (status ?? "") as PaymentStatus,
      page: parseInt(page ?? "1"),
      limit: parseInt(limit ?? "10"),
    });
  }, [location.search]);
  return (
    <Box>
      <Box p={1}>
        <Breadcrumbs>
          <MuiLink component={Link} underline="hover" color="inherit" to="/">
            داشبورد
          </MuiLink>

          <Typography sx={{ color: "text.primary" }}>تراکنش ها</Typography>
        </Breadcrumbs>
      </Box>
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
                          <MenuItem key={0} value="">
                            پاک کردن فیلتر
                          </MenuItem>
                          {Object.keys(PAYMENT_TYPE_TRANSLATE_MAP).map(
                            (key) => (
                              <MenuItem key={key} value={key}>
                                {
                                  PAYMENT_TYPE_TRANSLATE_MAP[
                                    key as PaymentTypes
                                  ]
                                }
                              </MenuItem>
                            )
                          )}
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
                {isLoading && (
                  <TableLoading rows={params.limit || 10} cells={7} />
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
    </Box>
  );
}

export default Payments;
