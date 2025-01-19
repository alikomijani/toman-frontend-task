import { lazy, Suspense } from "react";
import ThemeProvider from "./theme/theme-provider";
import "@fontsource/vazirmatn/arabic-300.css";
import "@fontsource/vazirmatn/arabic-400.css";
import "@fontsource/vazirmatn/arabic-500.css";
import "@fontsource/vazirmatn/arabic-700.css";
import { QueryClient, QueryClientProvider } from "react-query";
const AppRoutes = lazy(() => import("./routes"));
const queryClient = new QueryClient();
function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback="درحال بارگزاری">
          <AppRoutes />
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
