import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../common";
import * as S from "./styled";
interface INavLink {
  id: string;
  name: string;
  to: string;
  onClick?: () => void;
  type: string;
}
interface OwnProps {
  navLinks: INavLink[];
}

export const NavLink: React.FC<OwnProps> = ({ navLinks }) => {
  return (
    <S.NavLink padding="30px">
      {navLinks.map((ele) =>
        ele.type === "button" ? (
          <Button
            key={ele.id}
            onClick={() => {
              if (ele.onClick !== undefined) {
                ele.onClick();
              } else {
                console.log("this button does nothing");
              }
            }}
          >
            {ele.name}
          </Button>
        ) : (
          <Link key={ele.id} to={ele.to}>
            {ele.name}
          </Link>
        )
      )}
    </S.NavLink>
  );
};
