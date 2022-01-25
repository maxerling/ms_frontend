import { useEffect, useState } from "react";
import { Button, Container } from "../../common/";
import { Logo, NavBar, NavLink, Routines } from "../../components";
import { IAuthContext, useAuth } from "../../contexts/AuthContext";
import { User } from "firebase/auth";
import axios from "axios";
import * as S from "./styled";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface OwnProps {}
export interface Routine {
  id: string;
  routineName: string;
  activities: Activity[];
  isSelected: boolean;
}

interface Activity {
  activityName: string;
  description: string;
  time_HHMM: string;
}

export const RoutinesP: React.FC<OwnProps> = () => {
  const { logOut, currentUser } = useAuth() as IAuthContext;
  const [currentRoutine, setCurrentRoutine] = useState("");
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inactive, setInactive] = useState(false);
  const navigate = useNavigate();
  const navLinks = [
    {
      id: "0",
      name: "Routines",
      to: "/routines",
      type: "link",
    },
    {
      id: "1",
      name: "Sign out",
      to: "/login",
      onClick: logOut,
      type: "button",
    },
  ];

  useEffect(() => {
    setLoading(true);
    (async function () {
      const accessToken = await (currentUser as User).getIdToken();
      const options = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const result = await axios.get(
        "https://europe-west1-morningstar-dev-b4179.cloudfunctions.net/api/routines",
        options
      );
      setRoutines(result.data);
    })();

    setLoading(false);
  }, []);

  return (
    <>
      {!loading && routines.length > 0 && (
        <>
          <NavBar>
            <Logo to="/" />
            <NavLink navLinks={navLinks} />
          </NavBar>
          <Container>
            <h1>ROUTINES</h1>
            {routines.map((routine: Routine) => {
              return (
                <S.Routine
                  style={
                    routine.isSelected
                      ? { background: "yellow" }
                      : { background: "blue" }
                  }
                  onClick={(e) => {
                    handleSelectElement(e, routine.id, setInactive);
                  }}
                  key={routine.id}
                >
                  {routine.routineName}
                </S.Routine>
              );
            })}
            <Button
              loading={inactive}
              onClick={() => {
                if (currentUser === null) {
                  return;
                }
                handleSelectButton(
                  currentRoutine,
                  setInactive,
                  currentUser,
                  navigate
                );
              }}
            >
              Select
            </Button>
          </Container>
        </>
      )}
    </>
  );

  function handleSelectElement(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    routineId: string,
    setInactive: any
  ) {
    routines.forEach((r: Routine) => {
      const alreadySelected = r.id === routineId && r.isSelected === true;
      if (alreadySelected) {
        r.isSelected = false;
        setCurrentRoutine("");
      } else if (r.id === routineId) {
        r.isSelected = true;
        setCurrentRoutine(routineId);
        setInactive(false);
      } else {
        r.isSelected = false;
      }
    });
  }
};

async function handleSelectButton(
  currentRoutine: string,
  setInactive: any,
  currentUser: User,
  navigate: NavigateFunction
) {
  if (currentRoutine === "") {
    setInactive(true);
    return;
  }

  const accessToken = await currentUser?.getIdToken();

  const options = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  await axios.put(
    `https://europe-west1-morningstar-dev-b4179.cloudfunctions.net/api/users/${currentUser.uid}`,
    {
      routineId: currentRoutine,
    },
    options
  );
  navigate("/", { replace: true });
}
