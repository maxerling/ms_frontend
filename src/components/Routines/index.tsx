import React, { useState } from "react";
import { Container } from "../../common/";
import { Routine } from "../../pages/Routines";

interface OwnProps {
  routines: Routine[];
}

export const Routines: React.FC<OwnProps> = ({ routines }) => {
  return (
    <Container>
      {routines.map((routine: Routine) => {
        return <div key={routine.id}>{routine.routineName}</div>;
      })}
    </Container>
  );
};
