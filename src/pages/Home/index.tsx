import axios from "axios";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Logo, NavBar, NavLink } from "../../components";
import { IAuthContext, useAuth } from "../../contexts/AuthContext";
import { Routine } from "../Routines";
import {
  Spacer,
  Flex,
  Box,
  Button,
  Heading,
  Container,
  Text,
  VStack,
} from "@chakra-ui/react";
interface OwnProps {}

export const HomeP: React.FC<OwnProps> = () => {
  const { logOut, currentUser } = useAuth() as IAuthContext;
  const [currentRoutine, setCurrentRoutine] = useState<Routine>();
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
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
      setLoading(false);
    })();
  }, []);
  return (
    <>
      {!loading && (
        <>
          <NavBar>
            <Logo to="/" />
            <Spacer />
            <NavLink navLinks={navLinks} />
          </NavBar>

          <Container>
            <VStack p={4}>
              <Heading>
                {currentRoutine ? "CURRENT ROUTINE" : "NO ROUTINE SELECTED "}
              </Heading>
            </VStack>
            <Container p={2} borderRadius="lg" bg="gray.100" minH={800}>
              <>
                {currentRoutine && (
                  <>
                    <VStack p={2}>
                      <Text fontWeight={"bold"} fontSize={"lg"}>
                        {currentRoutine.routineName}
                      </Text>
                    </VStack>

                    {currentRoutine.activities.map((activity) => {
                      return (
                        <Box
                          p={2}
                          borderRadius="lg"
                          style={{ background: "white" }}
                          m={1}
                        >
                          <Flex>
                            <Text p={2} fontWeight={"semibold"}>
                              {activity.activityName}
                            </Text>
                            <Spacer />
                            <Text p={2} fontWeight={"semibold"}>
                              {activity.time_HHMM}
                            </Text>
                          </Flex>
                        </Box>
                      );
                    })}
                  </>
                )}
              </>
            </Container>
          </Container>
        </>
      )}
    </>
  );
};
