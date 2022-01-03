import React from "react";
import { ThemeProvider } from "styled-components";
interface OwnProps {}
const themeStyles = {
  color: {
    primary: "#000",
    secondary: "grey",
    background: "#fff",
    link: "#9AB87A",
  },
  font: {
    size: {
      xxxs: "12px",
      xxs: "14px",
      xs: "16px",
      s: "18px",
      m: "20px",
      xm: "24px",
      xxm: "30px",
      l: "36px",
      xl: "48px",
      xxl: "60px",
      xxxl: "72px",
    },
    family: "Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue",
  },
  breakpoint: {
    mobile: "375px",
    tablet: "600px",
    laptop: "1200px",
    desktop: "1600px",
  },
};
export const Theme: React.FC<OwnProps> = ({ children }) => {
  return <ThemeProvider theme={themeStyles}>{children}</ThemeProvider>;
};
