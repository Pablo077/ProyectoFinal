import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./router/AppRouter";
import { ThemeProvider } from "@mui/material/styles";
import { themeDriver } from "./theme/theme";
import { VehiculoProvider } from "./context/VehiculoProvider";

function App() {
  return (
    <>
      <ThemeProvider theme={themeDriver}>
        <VehiculoProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </VehiculoProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
