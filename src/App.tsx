import { Route, Routes } from "react-router";
import MainMenu from "./features/mainMenu/MainMenu";
import HowToPlay from "./features/howToPlay/HowToPlay";
import CategoryPick from "./features/categoryPick/CategoryPick";
import Game from "./features/game/Game";
import DifficultyPick from "./features/difficultyPick/DifficultyPick";

function App() {
  return (
    <div className="min-h-dvh bg-[url('../assets/images/background-mobile.svg')] bg-cover bg-center bg-no-repeat md:bg-[url('../assets/images/background-tablet.svg')] lg:bg-[url('../assets/images/background-desktop.svg')]">
      <Routes>
        <Route index path="/" element={<MainMenu />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/category-pick" element={<CategoryPick />} />
        <Route path="/difficulty" element={<DifficultyPick />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
