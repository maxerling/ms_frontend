import React from "react";
import { Link } from "react-router-dom";
import * as S from "./styled";
interface NavLink {
  name: string;
  to: string;
}
interface OwnProps {
  navLinks: NavLink[];
}

export const NavLink: React.FC<OwnProps> = ({ navLinks }) => {
  return (
    <S.NavLink padding="30px">
      {navLinks.map((ele) => (
        <Link to={ele.to}>{ele.name}</Link>
      ))}
    </S.NavLink>
  );
};
