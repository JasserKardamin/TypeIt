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
  PhraseTable[i].style.borderBottom = "2px solid white";
};

function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const RandomisePhrase = () => {
  let Phrase = "";
  for (let index = 0; index < 6; index++) {
    const randomIndex = getRandomBetween(0, JavaScriptKeywords.length);
    Phrase += JavaScriptKeywords[randomIndex] + "∘";
  }
  Phrase = Phrase.slice(0, -1);
  return Phrase.trim();
};
let i = 0;
let WorkingPhrase = RandomisePhrase();
let PhraseTable = [];
let FalseInputs = [];

const GetBackToTheFirstSpace = () => {
  const lastSpaceIndex = WorkingPhrase.lastIndexOf("∘", i);

  if (lastSpaceIndex !== -1) {
    //original opacity
    for (let index = lastSpaceIndex + 1; index <= i; index++) {
      PhraseTable[index].style.opacity = "0.3";
    }
    if (PhraseTable[i].textContent == "∘") {
      i = lastSpaceIndex;
      PhraseTable[i].style.borderBottom = "2px solid white";
    } else {
      i = lastSpaceIndex + 1;
      PhraseTable[i].style.borderBottom = "2px solid white";
    }
  } else {
    //original opacity
    for (let index = i; index >= 0; index--) {
      PhraseTable[index].style.opacity = "0.3";
    }
    i = 0;
    PhraseTable[i].style.borderBottom = "2px solid white";
  }
};

const HandleTyping = (key) => {
  const KeysToIgnore = ["AltGraph","Alt","Shift","Tab","CapsLock","Control"];
  if (i < WorkingPhrase.length - 1) {
    if (PhraseTable[i].textContent == "∘" && key == " ") {
      PhraseTable[i].style.color = "green";
      PhraseTable[i].style.opacity = "1";
      PhraseTable[i].style.borderBottom = "";
      i += 1;
      PhraseTable[i].style.borderBottom = "2px solid white";
    }else if( KeysToIgnore.includes(key)){

    }else if (PhraseTable[i].textContent === key ) {
      PhraseTable[i].style.color = "white";
      PhraseTable[i].style.opacity = "1";
      PhraseTable[i].style.borderBottom = "";
      i += 1;
      PhraseTable[i].style.borderBottom = "2px solid white";
    } else {
      ClearErrorsAndGoBack(i);
    }
  } else if (
    i == WorkingPhrase.length - 1 &&
    PhraseTable[i].textContent !== key
  ) {
    ClearErrorsAndGoBack(i);
  } else {
    i = 0;
    WorkingPhrase = RandomisePhrase();
    LoadPhrase();
  }
  //console.log(WorkingPhrase);
};

const ClearErrorsAndGoBack = (index) => {
  FalseInputs.forEach((input) => {
    input.style.color = "white";
  });
  PhraseTable[index].style.color = "red";
  PhraseTable[index].style.opacity = "1";
  if (PhraseTable[index].textContent !== "∘") {
    FalseInputs.push(PhraseTable[index]);
  }
  PhraseTable[index].style.borderBottom = "";
  GetBackToTheFirstSpace();
};

document.addEventListener("DOMContentLoaded", () => {
  //LoadPhrase();
});

export { HandleTyping, LoadPhrase };
