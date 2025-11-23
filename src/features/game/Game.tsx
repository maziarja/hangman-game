import { useSearchParams } from "react-router-dom";
import data from "../../../data.json";
import { getWords } from "./getWords";
import { getRandomWord } from "./getRandomWord";
import { useEffect, useState } from "react";
import { invisibleRandomLetters } from "./invisibleRandomLetters";
import PlayerHealth from "../../UI/PlayerHealth";
import PageContainer from "../../UI/PageContainer";
import GameHeader from "./GameHeader";
import MenuModal from "./MenuModal";
import Letter from "../../UI/Letter";
import Keyboard from "./Keyboard";
import { useKeyInput } from "../../contexts/KeyInputContext";
import ResultModal from "./ResultModal";

function Game() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const category =
    categoryParam === "movies" ||
    categoryParam === "tv_shows" ||
    categoryParam === "countries" ||
    categoryParam === "capital_cities" ||
    categoryParam === "animals" ||
    categoryParam === "sports"
      ? categoryParam
      : "movies";

  const difficultyParam = searchParams.get("difficulty");

  const difficulty =
    difficultyParam === "easy" ||
    difficultyParam === "medium" ||
    difficultyParam === "hard"
      ? difficultyParam
      : "easy";

  const categories = data.categories;
  const words = getWords(categories, category);
  const totalHealth = 8;
  const [currentHealth, setCurrentHealth] = useState(totalHealth);
  const [openWinModal, setOpenWinModal] = useState(false);
  const [openLoseModal, setOpenLoseModal] = useState(false);
  const [randomWordState, setRandomWordState] = useState(() => {
    if (words) {
      const randomWord = getRandomWord(words);
      randomWord.selected = true;
      return randomWord;
    }
  });
  const { setKeyInputState } = useKeyInput();
  const [letters, setLetters] = useState(() => {
    if (randomWordState) {
      const letter = invisibleRandomLetters(randomWordState, difficulty);
      if (letter) return letter;
    }
  });
  useEffect(() => {
    if (letters?.every((letter) => letter.show)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpenWinModal(true);
    }
  }, [letters]);

  useEffect(() => {
    if (currentHealth <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpenLoseModal(true);
    }
  }, [currentHealth]);

  function handleNextWord() {
    if (words) {
      const randomWord = getRandomWord(words);
      const letters = invisibleRandomLetters(randomWord, difficulty);
      setRandomWordState(randomWord);
      setLetters(letters);
      // CLOSE MODALS
      setOpenWinModal(false);
      setOpenLoseModal(false);
      // RESET HEALTH
      setCurrentHealth(totalHealth);
      // REACTIVATE KEYS
      setKeyInputState((inputs) =>
        inputs.map((input) => ({ ...input, active: true })),
      );
    }
  }

  return (
    <>
      <MenuModal />
      {openWinModal && (
        <ResultModal type="win" handleNextWord={handleNextWord} />
      )}
      {openLoseModal && (
        <ResultModal type="lose" handleNextWord={handleNextWord} />
      )}
      <PageContainer>
        <div className="mb-19.5 flex items-center justify-between">
          <GameHeader>{category.replaceAll("_", " ")}</GameHeader>
          <PlayerHealth
            currentHealth={currentHealth}
            totalHealth={totalHealth}
          />
        </div>
        <div className="flex flex-col gap-29.5">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
            {letters?.map((letter, i) => (
              <Letter key={i} letter={letter} />
            ))}
          </div>

          <Keyboard
            setLetters={setLetters}
            letters={letters}
            setCurrentHealth={setCurrentHealth}
          />
        </div>
      </PageContainer>
    </>
  );
}

export default Game;
