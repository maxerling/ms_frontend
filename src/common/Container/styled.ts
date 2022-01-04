import styled from "styled-components";
import { OwnProps } from ".";
export const Container = styled.div<OwnProps>`
  padding: ${({ padding }) => padding};
`;
