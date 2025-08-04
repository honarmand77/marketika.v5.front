import { createTheme, ThemeProvider } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: "#393E46", // رنگ اصلی
    },
    secondary: {
      main: '#393E4690', // رنگ ثانویه با شفافیت
    },
  },
});