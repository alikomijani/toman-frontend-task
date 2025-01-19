import AppRoutes from "./routes";
import ThemeProvider from "./theme/theme-provider";
import "@fontsource/vazirmatn/300.css"; // Specify weight
import "@fontsource/vazirmatn/400.css"; // Specify weight
import "@fontsource/vazirmatn/500.css"; // Specify weight
import "@fontsource/vazirmatn/700.css"; // Specify weight

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
