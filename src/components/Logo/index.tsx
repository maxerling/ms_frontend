import React from "react";
import * as S from "./styled";
import { Link } from "react-router-dom";
interface OwnProps {
  to: string;
}

export const Logo: React.FC<OwnProps> = ({ to }) => {
  return (
    <S.Logo padding="30px">
      <Link to={to}>Morning Star</Link>
    </S.Logo>
  );
};
