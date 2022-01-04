import React from "react";
import { Container } from "../../common/Container";
import { Logo, NavBar, NavLink } from "../../components";
interface OwnProps {}
const navLinks = [
  {
    name: "Routines",
    to: "/routines",
  },
  {
    name: "Sign out",
    to: "/login",
  },
];
export const Routines: React.FC<OwnProps> = ({}) => {
  return (
    <>
      <NavBar>
        <Logo to="/" />
        <NavLink navLinks={navLinks} />
      </NavBar>
      <Container>
        <h1>ROUTINES</h1>
      </Container>
    </>
  );
};
