import React from "react";
import { Container } from "../../common/Container";
import { Logo, NavBar } from "../../components";
import * as S from "./styled";
interface OwnProps {}

export const Login: React.FC<OwnProps> = ({}) => {
  return (
    <>
      <NavBar>
        <Logo to="/login" />
      </NavBar>
      <Container>
        <S.Input />
        <S.Input />
      </Container>
    </>
  );
};
