import { HandleKeyApply } from "../utils/handlekey.js";
import { RenderAZERTY } from "../utils/RenderKeyboard.js";
import { HandleTyping, LoadPhrase } from "../utils/HandleTyping.js";

document.addEventListener("DOMContentLoaded", () => {
  const KeyboardButtons = document.querySelectorAll(".keycap");
  const MyArrayOfButtons = Array.from(KeyboardButtons);
  const KeyBoardsLayout = document.querySelector("#keyboardlayout");
  const buttonMap = {};

  KeyBoardsLayout.value = "QWERTY";
  LoadPhrase();
  KeyBoardsLayout.addEventListener("change", () => {
    if (KeyBoardsLayout.value == "AZERTY") {
      RenderAZERTY();
    } else {
      window.location.href = window.location.href;
    }
  });

  // fasten the search pace
  MyArrayOfButtons.forEach((button) => {
    const key = button.textContent.toLowerCase();
    const parentId = button.parentElement.id;
    buttonMap[key] = button;
    buttonMap[parentId] = button;
  });

  const ActivateKey = (key) => {
    const button = buttonMap[key.toLowerCase()];
    if (!button) return;

    const modifierKeys = ["Shift", "Ctrl", "Alt", "Enter"];
    if (modifierKeys.includes(button.textContent)) {
      HandleKeyApply(button, "enable");
    } else {
      button.parentElement.classList.add("active");
    }
  };

  const DisableKey = (key) => {
    const button = buttonMap[key.toLowerCase()];
    if (!button) return;

    const modifierKeys = ["Shift", "Ctrl", "Alt", "Enter"];
    if (modifierKeys.includes(button.textContent)) {
      HandleKeyApply(button, "disable");
    } else {
      button.parentElement.classList.remove("active");
    }
  };

  document.addEventListener("keydown", (event) => {
    event.preventDefault();
    let key = event.key;
    const keyMap = {
      Dead: "^",
      " ": "Space",
      "#": "3",
      Escape: "ESC",
      Control: "Ctrl",
    };
    key = keyMap[key] || key;

    ActivateKey(key);
    HandleTyping(event.key);
  });

  document.addEventListener("keyup", (event) => {
    event.preventDefault();
    let key = event.key;
    const keyMap = {
      Dead: "^",
      " ": "Space",
      "#": "3",
      Escape: "ESC",
      Control: "Ctrl",
    };
    key = keyMap[key] || key;
    DisableKey(key);
  });
});
