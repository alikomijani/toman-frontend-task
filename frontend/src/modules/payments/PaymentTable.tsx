import { useGetPaymentsList } from "@/api/payment.api";
import { useSearchParams } from "@/hooks/useSearchParams";
import {
  TableContainer,
  TextField,
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
  Typography,
} from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, lazy } from "react";
import { Link } from "react-router";
import FilterIcon from "@/components/FilterIcon";
import {
  PAYMENT_DEFAULT_PARAMS,
  PAYMENT_TYPE_TRANSLATE_MAP,
  STATUS_TYPE_TRANSLATE_MAP,
} from "@/modules/payments/constants";
import { PaymentStatus, PaymentTypes } from "@/api/types";
import { TableLoading } from "@/components/TableLoading";
import { STATUS_ICON_MAP } from "./StatusIconMap";
import withSuspenseLoading from "@/components/withSuspenseLoading";
import TablePagination from "@/components/TablePagination";

const PageError = withSuspenseLoading(
  lazy(() => import("@/components/PageError"))
);
export default function PaymentTable() {
  const { params, setParams, debouncedParams } = useSearchParams(
    PAYMENT_DEFAULT_PARAMS
  );

  const { data, isLoading, error, isError } =
    useGetPaymentsList(debouncedParams);

  const handleSearchParams = (e: ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      page: 1,
    }));
  };
  const hasFilter = params.search || params.type || params.status;
  const clearFilter = () => {
    setParams(PAYMENT_DEFAULT_PARAMS);
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
      <Stack direction="row" p={2} alignItems="center">
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
                    visibility: "visible",
                  },
                },
              }}
            >
              <TableCell scope="row" component="th">
                {payment.id}
              </TableCell>
              <TableCell>
                <Typography>{payment.value.toLocaleString("fa")}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption">{payment.description}</Typography>
              </TableCell>
              <TableCell sx={{ pl: 7 }}>
                <Typography variant="caption">
                  {PAYMENT_TYPE_TRANSLATE_MAP[payment.type]}
                </Typography>
              </TableCell>
              <TableCell sx={{ pl: 6 }}>
                <Typography>{STATUS_ICON_MAP[payment.status]}</Typography>
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
                    visibility: "hidden",
                  }}
                >
                  مشاهده تراکنش
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination count={data?.total} />
    </TableContainer>
  );
}
