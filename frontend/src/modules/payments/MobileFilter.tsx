import { Grid2, MenuItem, TextField } from "@mui/material";
import {
  PAYMENT_DEFAULT_PARAMS,
  PAYMENT_TYPE_TRANSLATE_MAP,
  STATUS_TYPE_TRANSLATE_MAP,
} from "./constants";
import { PaymentStatus, PaymentTypes } from "@/api/types";
import { useSearchParams } from "@/hooks/useSearchParams";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent } from "react";

const MobileFilter = () => {
  const { params, setParams } = useSearchParams(PAYMENT_DEFAULT_PARAMS);
  const handleSearchParams = (e: ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      page: 1,
    }));
  };
  return (
    <Grid2 container spacing={2} my={1}>
      <Grid2 size={12}>
        <TextField
          name="search"
          fullWidth
          slotProps={{
            input: {
              startAdornment: <SearchIcon color="action" />,
            },
          }}
          placeholder="جست‌وجو"
          value={params.search}
          onChange={handleSearchParams}
        />
      </Grid2>
      <Grid2 size={6}>
        <TextField
          value={params.type}
          onChange={handleSearchParams}
          name="type"
          fullWidth
          select
          label="نوع پرداخت"
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
      </Grid2>
      <Grid2 size={6}>
        <TextField
          fullWidth
          value={params.status}
          onChange={handleSearchParams}
          name="status"
          select
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
      </Grid2>
    </Grid2>
  );
};
export default MobileFilter;
