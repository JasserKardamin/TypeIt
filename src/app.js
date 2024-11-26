import { HandleKeyApply } from "../utils/handlekey.js";
import { RenderAZERTY } from "../utils/RenderKeyboard.js";
import { HandleTyping, LoadPhrase } from "../utils/HandleTyping.js";

document.addEventListener("DOMContentLoaded", () => {
  const KeyboardButtons = document.querySelectorAll(".keycap");
  const MyArrayOfButtons = Array.from(KeyboardButtons);
  const KeyBoardsLayout = document.querySelector("#keyboardlayout");
  KeyBoardsLayout.value = "QWERTY";
  LoadPhrase();
  KeyBoardsLayout.addEventListener("change", () => {
    if (KeyBoardsLayout.value == "AZERTY") {
      RenderAZERTY();
    } else {
      window.location.href = window.location.href;
    }
  });

  const ActivateKey = (key) => {
    const modifierKeys = ["Shift", "Ctrl", "Alt", "Enter"];

    for (let i = 0; i < MyArrayOfButtons.length; i++) {
      const button = MyArrayOfButtons[i];
      const buttonText = button.textContent.toLowerCase();
      const buttonParentId = button.parentElement.id;

      if (buttonText === key.toLowerCase() || buttonParentId === key) {
        if (modifierKeys.includes(button.textContent)) {
          HandleKeyApply(button, "enable");
        } else {
          button.parentElement.classList.add("active");
        }
        return;
      }
    }
  };

  const DisableKey = (key) => {
    const modifierKeys = ["Shift", "Ctrl", "Alt", "Enter"];

    for (let i = 0; i < MyArrayOfButtons.length; i++) {
      const button = MyArrayOfButtons[i];
      const buttonText = button.textContent.toLowerCase();
      const buttonParentId = button.parentElement.id;

      if (buttonText === key.toLowerCase() || buttonParentId === key) {
        if (
          modifierKeys.includes(button.textContent) &&
          button.classList.contains("keycap")
        ) {
          HandleKeyApply(button, "disable");
        } else {
          button.parentElement.classList.remove("active");
        }
        return;
      }
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
