//import { Theme } from "./global/theme";
//import GlobalStyles from "./global/globalStyles";
import { MainContainer } from "./components/MainContainer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home, Login, Routines } from "./pages";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    //<Theme>
    <ChakraProvider>
      {/* <GlobalStyles /> */}
      <AuthProvider>
        <MainContainer>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/routines"
                element={
                  <PrivateRoute>
                    <Routines />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Router>
        </MainContainer>
      </AuthProvider>
    </ChakraProvider>
    // </Theme>
  );
}

export default App;
