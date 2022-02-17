import React, { useState, createContext, useContext, useEffect } from "react";
import { auth } from "../config/firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import axios from "axios";
interface OwnProps {}
const AuthContext = createContext({});
export function useAuth() {
  return useContext(AuthContext);
}

export interface IAuthContext {
  currentUser: User | null;
  logOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<void>;
}

export const AuthProvider: React.FC<OwnProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>({});
  const [loading, setLoading] = useState(true);
  async function signUp(email: string, password: string) {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCred.user.getIdToken();

    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    };

    await axios.post(
      "https://europe-west1-morningstar-dev-b4179.cloudfunctions.net/api/users",
      {},
      options
    );
  }

  function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    try {
      setCurrentUser({});

      return signOut(auth);
    } catch (err) {
      err instanceof Error
        ? console.log(err.message)
        : console.log("sign out error occur");
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsub;
  }, []);

  const value = { currentUser, signUp, signIn, logOut } as IAuthContext;
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
