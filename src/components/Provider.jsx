import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { CssBaseline } from "@mui/material";
import { HashRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack';

const theme = createTheme({
  palette: {
    grey: {
      main: grey[200],
    }
  }
});

const Provider = ({ children }) => (
  <HashRouter>
    <ThemeProvider {...{ theme }}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', timeout: 500 }}>
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  </HashRouter>
);
export default Provider;