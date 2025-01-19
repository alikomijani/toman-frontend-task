import React from "react";
import { Route, Routes } from "react-router";
import { WithSuspense } from "./components/WithSuspense";

const Payments = WithSuspense(
  React.lazy(() => import("./pages/payments/payments"))
);
const PaymentView = WithSuspense(
  React.lazy(() => import("./pages/payments/PaymentView"))
);
const Home = WithSuspense(React.lazy(() => import("./pages/Home")));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="payments">
        <Route index element={<Payments />} />
        <Route path=":id" element={<PaymentView />} />
      </Route>
    </Routes>
  );
}
