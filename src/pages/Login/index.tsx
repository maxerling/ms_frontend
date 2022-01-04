import React from "react";
import { Container, Input } from "../../common/";
import { Logo, NavBar } from "../../components";
interface OwnProps {}

export const Login: React.FC<OwnProps> = ({}) => {
  return (
    <>
      <NavBar>
        <Logo to="/login" />
      </NavBar>
      <Container>
        <Input />
        <Input />
      </Container>
    </>
  );
};
