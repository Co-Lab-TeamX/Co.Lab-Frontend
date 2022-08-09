import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import ContextProvider from "./context/contextProvider";
import './style/index.scss';
import { createTheme, ThemeProvider, } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      md: 1024,
      lg: 1280
    },
  },
  palette: {
    primary: {
      main: '#02A7A7',
      contrastText:"#fff"
    },
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </ContextProvider>
);