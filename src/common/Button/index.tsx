import React from "react";
import * as S from "./styled";

interface OwnProps {
  onClick?: any;
  loading?: boolean;
}

export const Button: React.FC<OwnProps> = ({ children, onClick, loading }) => {
  return (
    <S.Button
      disabled={loading}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </S.Button>
  );
};
