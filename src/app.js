// Import Statements
import { HandleKeyApply } from "../utils/handlekey.js";
import { RenderAZERTY, RenderQWERTY } from "../utils/RenderKeyboard.js";
import { HandleTyping, LoadPhrase } from "../utils/HandleTyping.js";
import { keyMap } from "./constants.js";
import {
  SpecialBackground,
  StandardBackground,
  StandardTextColor,
  SpecialTextColor,
  RefreshDefault,
} from "../utils/customizations.js";

// Customization Palette Toggle
document.querySelector("#Palette").addEventListener("click", () => {
  const customizationsDiv = document.getElementById("customizations");
  customizationsDiv.classList.toggle("flex");
  customizationsDiv.classList.toggle("hidden");
});

// Theme Customization
const applyTheme = () => {
  const specialButton = document.querySelector("#Special-keys");
  const standardButton = document.querySelector("#Standard-keys");
  const standardText = document.querySelector("#Standard-text");
  const specialText = document.querySelector("#Special-text");

  specialText.addEventListener("input", (event) =>
    SpecialTextColor(event.target.value)
  );
  standardText.addEventListener("input", (event) =>
    StandardTextColor(event.target.value)
  );
  standardButton.addEventListener("input", (event) =>
    StandardBackground(event.target.value)
  );
  specialButton.addEventListener("input", (event) =>
    SpecialBackground(event.target.value)
  );
};

// Refresh Theme Colors
const refreshTheme = () => {
  const specialTextColor = document.querySelector("#Special-text").value;
  const standardTextColor = document.querySelector("#Standard-text").value;
  const standardBackgroundColor =
    document.querySelector("#Standard-keys").value;
  const specialBackgroundColor = document.querySelector("#Special-keys").value;

  SpecialTextColor(specialTextColor);
  StandardTextColor(standardTextColor);
  StandardBackground(standardBackgroundColor);
  SpecialBackground(specialBackgroundColor);
};

// Key Management
const manageKeys = () => {
  const myArrayOfButtons = Array.from(document.querySelectorAll(".keycap"));
  const buttonMap = {};
  let windowsBug = [];
  const activeKeys = new Set();

  const clearButtonMap = () =>
    Object.keys(buttonMap).forEach((key) => delete buttonMap[key]);

  const buildButtonMap = () => {
    clearButtonMap();
    myArrayOfButtons.forEach((button) => {
      const content = button.textContent.toLowerCase();
      const parentId = button.parentElement.id;
      buttonMap[content] = button;
      buttonMap[parentId] = button;
      if (content.length === 2) {
        [...content].forEach((char) => (buttonMap[char] = button));
      }
    });
  };

  const activateKey = (key) => {

    const button = buttonMap[key.toLowerCase()];
    if (!button) return;

    if(key === "Ctrl") {
      if(windowsBug.includes("AltG")) {
        windowsBug = [];
        return;
      }
    }

    const modifierKeys = ["Shift", "Ctrl", "Enter"];
    if (modifierKeys.includes(button.textContent)) {
      HandleKeyApply(button, "enable");
    } else {
      button.parentElement.classList.add("active");
    }
	  if (key === "AltG") {
      windowsBug.push(key);
	  }
    activeKeys.add(key.toLowerCase());
  };

  const disableKey = (key) => {
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
    if (["INPUT", "TEXTAREA"].includes(event.target.tagName)) return;
    event.preventDefault();

    const key = keyMap[event.key] || event.key;
    activateKey(key);
    HandleTyping(event.key);
  });

  document.addEventListener("keyup", (event) => {
    let key;
    if (["INPUT", "TEXTAREA"].includes(event.target.tagName)) return;
    event.preventDefault();

     key = keyMap[event.key] || event.key;

    if (event.key === "AltGraph") {
      activeKeys.forEach((cap) => {
        disableKey(cap);
        activeKeys.delete(cap.toLowerCase());
      });
    } else {
      disableKey(key);
    }
  });

  return { buildButtonMap };
};

// Main Function
document.addEventListener("DOMContentLoaded", () => {
  const keyboardLayout = document.querySelector("#keyboardlayout");
  keyboardLayout.value = "QWERTY";

  const { buildButtonMap } = manageKeys();

  LoadPhrase();
  buildButtonMap();

  keyboardLayout.addEventListener("change", () => {
    RefreshDefault();
    keyboardLayout.value === "AZERTY" ? RenderAZERTY() : RenderQWERTY();
    refreshTheme();
    buildButtonMap();
  });

  applyTheme();
});
