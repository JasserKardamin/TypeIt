import { JavaScriptKeywords } from "../src/constants.js";

const LoadPhrase = () => {
  const PhraseSpaceHolder = document.querySelector("#Phrase");
  PhraseSpaceHolder.innerHTML = "";
  for (const letter of WorkingPhrase) {
    const NewLetter = document.createElement("span");
    NewLetter.style.opacity = "0.3";
    NewLetter.textContent = letter;
    NewLetter.classList.add("Phraseletter", "opacity-60");
    PhraseSpaceHolder.appendChild(NewLetter);
    PhraseTable = Array.from(document.querySelectorAll(".Phraseletter"));
  }
};

function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const RandomisePhrase = () => {
  let Phrase = "";
  for (let index = 0; index < 6; index++) {
    const randomIndex = getRandomBetween(0, JavaScriptKeywords.length);
    Phrase += JavaScriptKeywords[randomIndex] + " ";
  }
  return Phrase.trim();
};
let i = 0;
let WorkingPhrase = RandomisePhrase();
let PhraseTable = [];

const HandleTyping = (key) => {
  if (i < WorkingPhrase.length - 1) {
    if (PhraseTable[i].textContent === key) {
      PhraseTable[i].style.color = "white";
      PhraseTable[i].style.opacity = "1";
      i += 1;
    } else {
      PhraseTable[i].style.color = "red";
      PhraseTable[i].style.opacity = "1";
    }
  } else {
    i = 0;
    WorkingPhrase = RandomisePhrase();
    LoadPhrase();
  }
  console.log(WorkingPhrase);
};

document.addEventListener("DOMContentLoaded", () => {
  LoadPhrase();
});

export { HandleTyping };
