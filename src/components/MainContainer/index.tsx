import React from "react";
import * as S from "./styled";

interface OwnProps {}

export const MainContainer: React.FC<OwnProps> = ({ children }) => {
  return <S.MainContainer>{children}</S.MainContainer>;
};
