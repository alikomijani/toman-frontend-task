import { lazy } from "react";
import withSuspense from "./components/withSuspense";
const ThemeProvider = withSuspense(
  lazy(() => import("./providers/theme-provider")),
  <>...Loading</>
);
const QueryProvider = lazy(() => import("./providers/query-provider"));
const AppRoutes = lazy(() => import("./routes"));

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AppRoutes />
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
