import { useState } from "react";

import { Logo, NavBar } from "../../components";
import * as S from "./styled";
import { useAuth, IAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Input,
  Button,
  Box,
  VStack,
  Heading,
  Container,
} from "@chakra-ui/react";
interface OwnProps {}

interface Routine {
  id: string;
  routineName: string;
  activities: Activity[];
}

interface Activity {
  activityName: string;
  description: string;
  time_HHMM: string;
}

export const LoginP: React.FC<OwnProps> = () => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, signUp, signIn } = useAuth() as IAuthContext;
  const navigate = useNavigate();

  useEffect(() => {
    currentUser && navigate("/", { replace: true });
  }, []);
  async function signUpHandler() {
    try {
      setLoading(true);
      await signUp(currentEmail, currentPassword);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  async function signInHandler() {
    try {
      setLoading(true);
      await signIn(currentEmail, currentPassword);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <>
      <NavBar>
        <Logo to="/login" />
      </NavBar>
      <Container centerContent>
        <Box w="300px" p={2}>
          <Heading as="h4" size="sm">
            E-mail
          </Heading>
          <Input
            onChange={(e) => {
              setCurrentEmail(e.target.value);
            }}
          />
        </Box>
        <Box w="300px" p={2}>
          <Heading as="h4" size="sm">
            Password
          </Heading>
          <Input
            type={"password"}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
          />
        </Box>

        <Box p={2}>
          <Button
            width="200px"
            border="10px"
            isLoading={loading}
            colorScheme={"blue"}
            onClick={async () => {
              await signInHandler();
              navigate("/", { replace: true });
            }}
          >
            Login
          </Button>
        </Box>
        <Box p={3}>
          <Button
            width="180px"
            isLoading={loading}
            colorScheme={"blue"}
            loading={loading}
            onClick={async () => {
              await signUpHandler();
              navigate("/", { replace: true });
            }}
          >
            Register
          </Button>
        </Box>
      </Container>
    </>
  );
};
