import { useState } from "react";
import { Container, Input, Button } from "../../common/";
import { Logo, NavBar } from "../../components";
import * as S from "./styled";
import { useAuth, IAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
      <S.GContainer>
        <Container>
          E-mail
          <Input
            onChange={(e) => {
              setCurrentEmail(e.target.value);
            }}
          />
          Password
          <Input
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
          />
          <Button
            loading={loading}
            onClick={async () => {
              await signInHandler();
              navigate("/", { replace: true });
            }}
          >
            Login
          </Button>
          <Button
            loading={loading}
            onClick={async () => {
              await signUpHandler();
              navigate("/", { replace: true });
            }}
          >
            Register
          </Button>
        </Container>
      </S.GContainer>
    </>
  );
};
