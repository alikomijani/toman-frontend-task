import { AxiosError } from "axios";
import { lazy } from "react";
import withSuspenseLoading from "./withSuspenseLoading";

const ServerErrorPage = withSuspenseLoading(lazy(() => import("@/pages/500")));
const NotFoundPage = withSuspenseLoading(lazy(() => import("@/pages/404")));

type Props = {
  error: AxiosError;
};

export default function PageError({ error }: Props) {
  if (error.status === 404) {
    return <NotFoundPage />;
  }
  return <ServerErrorPage />;
}
