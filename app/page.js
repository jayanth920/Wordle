"use client";

import { useState, useEffect } from "react";
import "./styles.css";

const API_URL = "http://localhost:3000/wordle";
const WORD_LENGTH = 5;

export default function Home() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [fadeIn, setFadeIn] = useState(false);
  const [keyInfo, setKeyInfo] = useState("");
  const [curr,setCurr] = useState(0)

  async function fetcher() {
    const res = await fetch(API_URL);
    const words = await res.json();
    const list = words.results;
    const randomWord = list[Math.floor(Math.random() * words.results.length)];
    setSolution(randomWord);
    setFadeIn(true);
  }

  // Handler for key down event
  const handleKeyDown = (e) => {
    setKeyInfo(`Key down: ${e.key}`);

    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses];

        if (e.key == "Enter") {
          console.log(newGuesses[curr],solution)
          if (newGuesses[curr].toLowerCase() === solution.toLowerCase()){
            console.log("CORRECT")
            fetcher()
            setCurr(0)
            setGuesses(["","","","","",""])
          } else {
            console.log("WRONG")
            if (curr<0 || curr>5){
              return
            }
              setCurr(curr+1)
              console.log("prev curr", curr)
          }
        }

      else if (e.key === "Backspace") {
        newGuesses[curr] = newGuesses[curr].slice(0, -1);
      } else if (
        e.key.match(/^[a-zA-Z]$/) &&
        newGuesses[curr].length < WORD_LENGTH
      ) {
        newGuesses[curr] += e.key;
        console.log(newGuesses)
      }
      return newGuesses;
    });
  };

  useEffect(() => {
    if (solution) {
      const timer = setTimeout(() => setFadeIn(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [solution]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [solution]);

  return (
    <div className="board">
      {guesses.map((guess, index) => (
        <Line key={index} guess={guess ?? ""} />
      ))}
      <button onClick={fetcher}>CLICK ME</button>
      {solution && (
        <h1 className={fadeIn ? "fade-in" : ""}>SOLUTION: {solution}</h1>
      )}
      <p>{keyInfo}</p>
      <p>{guesses[curr]}</p>
      <p>{curr}</p>
    </div>
  );
}

function Line({ guess }) {
  const tiles = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    let char = guess[i];
    tiles.push(
      <div key={i} className="tile">
        {char}
      </div>
    );
  }
  return <div className="line">{tiles}</div>;
}
