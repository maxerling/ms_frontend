import React from "react";
import * as S from "./styled";

export interface OwnProps {}

export const GridContainer: React.FC<OwnProps> = ({ children }) => {
  return <S.GridContainer>{children}</S.GridContainer>;
};
