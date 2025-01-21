import { lazy } from "react";
import withSuspense from "./components/withSuspense";
import { ErrorBoundary } from "react-error-boundary";

const ThemeProvider = withSuspense(
  lazy(() => import("./providers/theme-provider")),
  <>...Loading</>
);
const QueryProvider = lazy(() => import("./providers/query-provider"));
const AppRoutes = lazy(() => import("./routes"));

function App() {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <ThemeProvider>
        <QueryProvider>
          <AppRoutes />
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
