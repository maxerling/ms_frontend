import styled from "styled-components";
import { Container } from "../../common/Container/styled";

export const NavLink = styled(Container)`
  justify-content: space-evenly;
  display: flex;
  a {
    color: black;
    font-weight: 700;
    text-decoration: none;
    font-size: ${({ theme }) => theme.font.size.xs};
  }
  width: 8%;
`;
