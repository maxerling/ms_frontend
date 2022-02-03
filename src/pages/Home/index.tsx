import axios from "axios";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Logo, NavBar, NavLink } from "../../components";
import { IAuthContext, useAuth } from "../../contexts/AuthContext";
import { Routine, Activity } from "../Routines";
import {
  Spacer,
  Flex,
  Box,
  Heading,
  Container,
  Text,
  VStack,
  Badge,
  HStack,
  Tag,
} from "@chakra-ui/react";
import { error } from "@chakra-ui/utils";

interface OwnProps {}

export const HomeP: React.FC<OwnProps> = () => {
  const { logOut, currentUser } = useAuth() as IAuthContext;
  const [currentRoutine, setCurrentRoutine] = useState<Routine>();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(false);
  const [date, setDate] = useState(localStorage.getItem("date"));
  const [totalCount, setTotalCount] = useState<number | null>(
    Number(localStorage.getItem("totalCount"))
  );
  const [hotStreak, setHotStreak] = useState<number>(
    Number(localStorage.getItem("hotStreak") ?? 0)
  );

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
    (async function getUserInfo() {
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

      const userCurrentRoutine = user.data.routineId;
      if (!userCurrentRoutine) {
        setLoading(false);
        return;
      }
      try {
        const routine = await axios.get(
          `https://europe-west1-morningstar-dev-b4179.cloudfunctions.net/api/routines/${userCurrentRoutine}`,
          options
        );

        setCurrentRoutine(routine.data as Routine);
        setState(true);
      } catch {
        await axios.put(
          `https://europe-west1-morningstar-dev-b4179.cloudfunctions.net/api/users/${user.data.id}`,
          {
            ...user,
            routineId: "",
          },
          options
        );
        alert("Something went wrong, try to login again!");
        await logOut();
      }

      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (
      currentRoutine &&
      totalCount != null &&
      date === new Date().toDateString()
    ) {
      for (let i = 0; i < totalCount; i++) {
        currentRoutine.activities[i].isSelected = true;
      }

      setCurrentRoutine({
        ...currentRoutine,
      });
    }

    if (date !== new Date().toDateString()) {
      localStorage.setItem("totalCount", "0");
    }
  }, [state]);

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
            <Container p={2} borderRadius="lg" bg="gray.200" minH={800}>
              <>
                {currentRoutine && (
                  <>
                    <VStack justify={"center"} p={2}>
                      <Text fontWeight={"bold"} fontSize={"lg"}>
                        {currentRoutine.routineName}
                      </Text>
                      {hotStreak > 0 && (
                        <Tag
                          p={1}
                          size="lg"
                          colorScheme={"orange"}
                          borderRadius="lg"
                        >
                          <Text fontSize={"md"}>🔥 {hotStreak}</Text>
                        </Tag>
                      )}
                    </VStack>

                    <Box pt={5}>
                      {currentRoutine.activities.map((activity: Activity) => {
                        return (
                          <Box
                            key={activity.id}
                            p={2}
                            borderRadius="lg"
                            style={{
                              background: activity.isSelected
                                ? "gray "
                                : "white",
                              border: activity.isSelected
                                ? "solid 3px grey"
                                : "",
                            }}
                            m={1}
                            onClick={() => {
                              onClickActivityElement(
                                activity.id,
                                currentRoutine,
                                setCurrentRoutine
                              );
                            }}
                          >
                            <Flex>
                              <Text p={2} fontWeight={"semibold"}>
                                {activity.isSelected ? "✔️ " : "❌ "}
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
                    </Box>
                  </>
                )}
              </>
            </Container>
          </Container>
        </>
      )}
    </>
  );

  function onClickActivityElement(
    elementId: string,
    currentRoutine: Routine,
    setCurrentRoutine: any
  ) {
    const activities = currentRoutine.activities;
    for (let i = 0; i < activities.length; i++) {
      if (activities[i].id === elementId) {
        activities[i].isSelected = !activities[i].isSelected;
        trackActivityStatusAndHotStreakAndLastDate(
          activities[i].isSelected,
          activities.length,
          setHotStreak,
          hotStreak
        );
      }
    }
    setCurrentRoutine({ ...currentRoutine });
  }
};

function trackActivityStatusAndHotStreakAndLastDate(
  currentActivityStatus: boolean,
  totalActivities: number,
  setHotStreak: React.Dispatch<React.SetStateAction<number>>,
  hotStreak: number
) {
  updateTotalActivityCount(currentActivityStatus);
  const updatedTotalCount = localStorage.getItem("totalCount");
  if (Number(updatedTotalCount) === totalActivities) {
    const lsHotStreak = localStorage.getItem("hotStreak");
    if (lsHotStreak == null) {
      createHotStreakAndDate(hotStreak, setHotStreak);
    } else {
      const lastCompletedDate = localStorage.getItem("date");
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastCompletedDate === yesterday.toDateString()) {
        incrementHotStreakAndUpdateDate(hotStreak, setHotStreak);
      } else if (
        lastCompletedDate !== today.toDateString() &&
        lastCompletedDate !== yesterday.toDateString()
      ) {
        clearTotalActiviityCountAndHotStreakAndDate();
      }
    }
  }
}

function incrementTotalActivityCount(totalActivityCount: string | null) {
  if (totalActivityCount === null) {
    localStorage.setItem("totalCount", "1");
  } else {
    const increment = Number(totalActivityCount) + 1;
    localStorage.setItem("totalCount", `${increment}`);
  }
}

function decrementTotalActivityCount(totalCount: string | null) {
  const decrement = Number(totalCount) - 1;
  localStorage.setItem("totalCount", `${decrement}`);
}

function incrementHotStreakAndUpdateDate(
  hotStreak: number,
  setHotStreak: React.Dispatch<React.SetStateAction<number>>
) {
  const currentHotStreak = localStorage.getItem("hotStreak");
  const increment = Number(currentHotStreak) + 1;
  localStorage.setItem("hotStreak", `${increment}`);
  localStorage.setItem("date", new Date().toDateString());
  setHotStreak(hotStreak + 1);
}

function createHotStreakAndDate(
  hotStreak: number,
  setHotStreak: React.Dispatch<React.SetStateAction<number>>
) {
  localStorage.setItem("hotStreak", "1");
  localStorage.setItem("date", new Date().toDateString());
  setHotStreak(hotStreak + 1);
}

function clearTotalActiviityCountAndHotStreakAndDate() {
  localStorage.removeItem("totalCount");
  localStorage.removeItem("hotStreak");
  localStorage.removeItem("date");
}

function updateTotalActivityCount(currentActivityStatus: boolean) {
  const currentTotalCount = localStorage.getItem("totalCount");
  currentActivityStatus == true
    ? incrementTotalActivityCount(currentTotalCount)
    : decrementTotalActivityCount(currentTotalCount);
}
