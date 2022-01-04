import styled from "styled-components";
import { Container } from "../../common/Container/styled";

export const Logo = styled(Container)`
  a {
    color: black;
    font-weight: 700;
    text-decoration: none;
    font-size: ${({ theme }) => theme.font.size.xs};
  }
`;
