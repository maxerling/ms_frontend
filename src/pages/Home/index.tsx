import { Container } from "../../common/";
import { Logo, NavBar, NavLink } from "../../components";
import { IAuthContext, useAuth } from "../../contexts/AuthContext";

interface OwnProps {}

export const Home: React.FC<OwnProps> = () => {
  const { logOut } = useAuth() as IAuthContext;
  const navLinks = [
    {
      id: "0",
      name: "Routines",
      to: "/routines",
      type: "link",
    },
    {
      id: "1",
      name: "Sign out",
      to: "/login",
      onClick: logOut,
      type: "button",
    },
  ];
  return (
    <>
      <NavBar>
        <Logo to="/" />
        <NavLink navLinks={navLinks} />
      </NavBar>
      <Container>
        <h1>HOME</h1>
      </Container>
    </>
  );
};
