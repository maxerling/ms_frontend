import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle<{ theme: any }>`
* {
 
}

body {
  background: ${({ theme }) => theme.color.background};
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.xs};
  display: block;
  margin: 0;
  padding: 0;
  
}
`;

export default GlobalStyles;
