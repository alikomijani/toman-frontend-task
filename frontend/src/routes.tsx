import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import withSuspenseLoading from "./components/withSuspenseLoading";

const NotFoundPage = withSuspenseLoading(
  React.lazy(() => import("./pages/404"))
);
const Layout = withSuspenseLoading(
  React.lazy(() => import("./components/layout"))
);
const Payments = withSuspenseLoading(
  React.lazy(() => import("./pages/payments/payments"))
);
const PaymentView = withSuspenseLoading(
  React.lazy(() => import("./pages/payments/PaymentView"))
);
const Home = withSuspenseLoading(React.lazy(() => import("./pages/Home")));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/payments/:id" element={<PaymentView />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
