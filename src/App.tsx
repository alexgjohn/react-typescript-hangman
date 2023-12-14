import React, { useCallback, useEffect, useState } from 'react';
import wordList from './wordList.json';
import { HangmanDrawing } from './components/HangmanDrawing';
import { HangmanWord } from './components/HangmanWord';
import { Keyboard } from './components/Keyboard';


function App() {

  const [wordToGuess, setWordToGuess] = useState<string>(() => {
    return wordList[Math.floor(Math.random() * wordList.length)]
  })
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(letter => 
    !wordToGuess.includes(letter));

    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess
      .split("")
      .every(letter => guessedLetters.includes(letter));

    const addGuessedLetter = useCallback((letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner){
        return
      } else {
        setGuessedLetters(prev => [...prev, letter]);
      }
    }, [guessedLetters, isWinner, isLoser])

  

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z]$/)) {
        return
      } else {
        e.preventDefault();
        addGuessedLetter(key);
      }
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  const handleReplay = () => {
    window.location.reload()
  }

  return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center"
    }}>
      <div style={{ 
        fontSize: "2rem",
        textAlign: "center"
      }}>
        {isWinner && <h2>You win!</h2>}
        {isLoser && <h2>Better luck next time!</h2>}
        {isWinner || isLoser ? 
          <button onClick={handleReplay}
            style={{
              height: "70px",
              width: "70px",
              borderRadius: "100%",
              textTransform: "uppercase",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Play again
          </button>
          : null
        }
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
      <div style={{
        alignSelf: "stretch"
      }}>
        <Keyboard 
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
