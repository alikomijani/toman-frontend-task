import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { WithSuspense } from "./components/WithSuspense";

const Layout = WithSuspense(React.lazy(() => import("./components/layout")));
const Payments = WithSuspense(
  React.lazy(() => import("./pages/payments/payments"))
);
const PaymentView = WithSuspense(
  React.lazy(() => import("./pages/payments/PaymentView"))
);
const Home = WithSuspense(React.lazy(() => import("./pages/Home")));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/payments/:id" element={<PaymentView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
