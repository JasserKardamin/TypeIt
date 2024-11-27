import { HandleKeyApply } from "../utils/handlekey.js";
import { RenderAZERTY } from "../utils/RenderKeyboard.js";
import { HandleTyping, LoadPhrase } from "../utils/HandleTyping.js";

document.addEventListener("DOMContentLoaded", () => {
  const MyArrayOfButtons = Array.from(document.querySelectorAll(".keycap"));
  const KeyBoardsLayout = document.querySelector("#keyboardlayout");
  KeyBoardsLayout.value = "QWERTY";
  const buttonMap = {};
  const activeKeys = new Set();

  const ClearButtonMap = () => {
    Object.keys(buttonMap).forEach((key) => {
      delete buttonMap[key];
    });
  };
  const BuildButtonMap = () => {
    ClearButtonMap();
    MyArrayOfButtons.forEach((button) => {
      const content = button.textContent.toLowerCase();
      const parentId = button.parentElement.id;
      buttonMap[content] = button;
      buttonMap[parentId] = button;
      if (content.length == 2) {
        for (const char of content) {
          buttonMap[char] = button;
        }
      }
    });
  };

  LoadPhrase();
  BuildButtonMap();

  KeyBoardsLayout.addEventListener("change", () => {
    if (KeyBoardsLayout.value == "AZERTY") {
      RenderAZERTY();
      BuildButtonMap();
    } else {
      window.location.href = window.location.href;
    }
  });

  const ActivateKey = (key) => {
    const button = buttonMap[key.toLowerCase()];
    console.log(key, "=", button.textContent);

    if (!button) return;

    const modifierKeys = ["Shift", "Ctrl", "Enter"];
    if (modifierKeys.includes(button.textContent)) {
      HandleKeyApply(button, "enable");
    } else {
      button.parentElement.classList.add("active");
    }
    activeKeys.add(key.toLowerCase());
  };

  const DisableKey = (key) => {
    const button = buttonMap[key.toLowerCase()];
    if (!button) return;

    const modifierKeys = ["Shift", "Ctrl", "Enter"];
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
      AltGraph: "AltG",
      "#": "3",
      Escape: "ESC",
      Control: "Ctrl",
    };
    key = keyMap[key] || key;

    //if (!activeKeys.has(key.toLowerCase())) {
    ActivateKey(key);
    HandleTyping(event.key);
    //}
  });

  document.addEventListener("keyup", (event) => {
    event.preventDefault();
    let key = event.key;
    const keyMap = {
      Dead: "^",
      " ": "Space",
      AltGraph: "AltG",
      "#": "3",
      Escape: "ESC",
      Control: "Ctrl",
    };
    key = keyMap[key] || key;

    if (event.key == "AltGraph") {
      Array.from(activeKeys).forEach((cap) => {
        DisableKey(cap);
        activeKeys.delete(cap.toLowerCase());
      });
    } else {
      DisableKey(key);
    }
  });
});
