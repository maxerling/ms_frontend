import axios from "axios";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Container } from "../../common/";
import { Logo, NavBar, NavLink } from "../../components";
import { IAuthContext, useAuth } from "../../contexts/AuthContext";
import { Routine } from "../Routines";
import { Spacer, Flex, Box, Button, Heading } from "@chakra-ui/react";
interface OwnProps {}

export const HomeP: React.FC<OwnProps> = () => {
  const { logOut, currentUser } = useAuth() as IAuthContext;
  const [currentRoutine, setCurrentRoutine] = useState<Routine>();
  const navLinks = [
    {
      id: "1",
      name: "Sign out",
      to: "/login",
      onClick: logOut,
      type: "actionLink",
    },
    {
      id: "0",
      name: "Routines",
      to: "/routines",
      type: "buttonLink",
      typeOfButton: "solid",
    },
  ];

  useEffect(() => {
    (async function () {
      const idToken = await currentUser?.getIdToken();
      const uid = (currentUser as User).uid;
      const options = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      };
      const user = await axios.get(
        `https://europe-west1-morningstar-dev-b4179.cloudfunctions.net/api/users/${uid}`,
        options
      );

      if (!user.data.routineId || user.data.routineId === "") return;
      const userCurrentRoutine = user.data.routineId;
      const routine = await axios.get(
        `https://europe-west1-morningstar-dev-b4179.cloudfunctions.net/api/routines/${userCurrentRoutine}`,
        options
      );
      setCurrentRoutine(routine.data as Routine);
    })();
  }, []);
  return (
    <>
      <NavBar>
        <Logo to="/" />
        <Spacer />
        <NavLink navLinks={navLinks} />
      </NavBar>

      <Container>
        <>
          {currentRoutine !== undefined ? (
            <>
              <div>Current Routine</div>
              <>{currentRoutine.routineName}</>
              {currentRoutine.activities.map((activity) => {
                return (
                  <div>
                    <div>
                      <>{activity.activityName}</>
                      <>{activity.time_HHMM}</>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>No Current Routine</>
          )}
        </>
      </Container>
    </>
  );
};
