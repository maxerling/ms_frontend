import React from "react";
import * as S from "./styled";

interface OwnProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<OwnProps> = ({ onChange }) => {
  return <S.Input onChange={onChange} />;
};
