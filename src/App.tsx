import { Theme } from "./global/theme";
import { NavBar } from "./components/NavBar";
import GlobalStyles from "./global/globalStyles";
import { MainContainer } from "./components/MainContainer";

function App() {
  return (
    <Theme>
      <GlobalStyles />
      <MainContainer>
        <NavBar />
      </MainContainer>
    </Theme>
  );
}

export default App;
