import React from "react";
import * as S from "./styled";

interface OwnProps {}

export const NavBar: React.FC<OwnProps> = ({ children }) => {
  return <S.NavBar>{children}</S.NavBar>;
};
