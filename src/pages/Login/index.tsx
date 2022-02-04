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
  Heading,
  Container,
  AlertIcon,
  AlertTitle,
  Alert,
  AlertDescription,
  CloseButton,
  Center,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
interface OwnProps {}
interface firebaseErrors {
  [key: string]: string | undefined;
}

const firebaseErrors: firebaseErrors = {
  "auth/user-not-found": "No user corresponding to this email",
  "auth/email-already-in-use": "The email address is already in use",
  "auth/invalid-password":
    "Invalid password, password needs to be atleast 6 characters",
  "auth/invalid-email": "Invalid email, try again",
  "auth/internal-error": "Unexpected error, try again",
};
export const LoginP: React.FC<OwnProps> = () => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser, signUp, signIn } = useAuth() as IAuthContext;
  const navigate = useNavigate();

  useEffect(() => {
    currentUser && navigate("/", { replace: true });
  }, []);

  async function signUpHandler() {
    setLoading(true);
    try {
      await signUp(currentEmail, currentPassword);
      navigate("/", { replace: true });
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(firebaseErrors[err.code] ?? err.code);
      }
    }
    setLoading(false);
  }

  async function signInHandler() {
    setLoading(true);
    try {
      await signIn(currentEmail, currentPassword);
      navigate("/", { replace: true });
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(firebaseErrors[err.code] ?? err.code);
      }
    }

    setLoading(false);
  }

  return (
    <>
      <NavBar>
        <Logo to="/login" />
      </NavBar>
      <Flex justify={"center"} alignItems={"center"} minH={"60gitvh"}>
        <VStack>
          {error && (
            <Box p={5}>
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </Box>
          )}
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
              colorScheme={"yellow"}
              onClick={signInHandler}
            >
              Login
            </Button>
          </Box>
          <Box p={1}>
            <Button
              width="200px"
              isLoading={loading}
              colorScheme={"yellow"}
              onClick={signUpHandler}
            >
              Register
            </Button>
          </Box>
        </VStack>
      </Flex>
    </>
  );
};
