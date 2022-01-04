import { Theme } from "./global/theme";
import GlobalStyles from "./global/globalStyles";
import { MainContainer } from "./components/MainContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Routines } from "./pages/Routines";
import { Login } from "./pages/Login";

function App() {
  return (
    <Theme>
      <GlobalStyles />
      <MainContainer>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/routines" element={<Routines />} />
          </Routes>
        </Router>
      </MainContainer>
    </Theme>
  );
}

export default App;
