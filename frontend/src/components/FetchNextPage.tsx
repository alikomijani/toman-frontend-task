import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useIntersectionObserver } from "usehooks-ts";

type FetchNextPageProps = { hasNextPage: boolean; fetch: () => void };

const FetchNextPage = ({ hasNextPage, fetch }: FetchNextPageProps) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });
  useEffect(() => {
    if (hasNextPage && isIntersecting) {
      fetch();
    }
  }, [isIntersecting]);
  return (
    <Box ref={ref}>
      {hasNextPage ? (
        <Typography>درحال بارگزاری...</Typography>
      ) : (
        <Typography>پایان محتوا</Typography>
      )}
    </Box>
  );
};
export default FetchNextPage;
