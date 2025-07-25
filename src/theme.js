import { createTheme, ThemeProvider } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FFA05C", // رنگ اصلی
    },
    secondary: {
      main: '#ffa05c50', // رنگ ثانویه با شفافیت
    },
  },
});