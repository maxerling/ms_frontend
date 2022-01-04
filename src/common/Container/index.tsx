import React from "react";
import * as S from "./styled";

export interface OwnProps {
  padding?: string;
}

export const Container: React.FC<OwnProps> = ({ children, padding }) => {
  return <S.Container padding={padding}>{children}</S.Container>;
};
