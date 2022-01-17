import React from "react";
import * as S from "./styled";

export interface OwnProps {}

export const FlexContainer: React.FC<OwnProps> = ({ children }) => {
  return <S.FlexContainer>{children}</S.FlexContainer>;
};
