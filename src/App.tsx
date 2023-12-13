import React, { useState } from 'react';
import wordList from './wordList.json';
import { HangmanDrawing } from './components/HangmanDrawing';
import { HangmanWord } from './components/HangmanWord';
import { Keyboard } from './components/Keyboard';


function App() {

  const [wordToGuess, setWordToGuess] = useState<string>(() => {
    return wordList[Math.floor(Math.random() * wordList.length)]
  })
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

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
        Lose
        Win
      </div>
      <HangmanDrawing/>
      {/* <HangmanWord/>
      <Keyboard/> */}
    </div>
  );
}

export default App;
