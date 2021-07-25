import {
  createTheme,
  ThemeProvider as MThemeProvider,
} from "@material-ui/core/styles";
import { ThemeProvider as SThemeProvider } from "styled-components";
import { FC } from "react";

const materialTheme = createTheme({
  palette: {
    common: {
      black: "#19192B",
      white: "#ffffff",
    },
    primary: {
      light: "#B3E5FC",
      main: "#03A9F4",
      dark: "#0288D1",
      contrastText: "#212121",
    },
  },
});

const styledTheme = {
  breakpoints: {
    sm: "screen and (max-width: 640px)",
    md: "screen and (max-width: 768px)",
    lg: "screen and (max-width: 1024px)",
    xl: "screen and (max-width: 1280px)",
  },
};

export const MainThemeProvider: FC = ({ children }) => {
  return (
    <MThemeProvider theme={materialTheme}>
      <SThemeProvider theme={styledTheme}> {children} </SThemeProvider>
    </MThemeProvider>
  );
};
