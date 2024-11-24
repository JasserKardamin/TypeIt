import HandleKeyApply from "../utils/handlekey.js";

document.addEventListener("DOMContentLoaded", () => {
  const KeyboardButtons = document.querySelectorAll("span");
  const MyArrayOfButtons = Array.from(KeyboardButtons);

  var IndexOfButton = 0;

  const ActivateKey = (key) => {
    const modifierKeys = ["Shift", "Ctrl", "Alt"];

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
    const modifierKeys = ["Shift", "Ctrl", "Alt"];

    for (let i = 0; i < MyArrayOfButtons.length; i++) {
      const button = MyArrayOfButtons[i];
      const buttonText = button.textContent.toLowerCase();
      const buttonParentId = button.parentElement.id;

      if (buttonText === key.toLowerCase() || buttonParentId === key) {
        if (modifierKeys.includes(button.textContent)) {
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
    if (key == " ") {
      key = "Space";
    }
    if (key == "Escape") {
      key = "ESC";
    }
    if (key == "Control") {
      key = "Ctrl";
    }
    console.log(key);

    ActivateKey(key);
  });

  document.addEventListener("keyup", (event) => {
    event.preventDefault();
    let key = event.key;
    if (key == " ") {
      key = "Space";
    }
    if (key == "Escape") {
      key = "ESC";
    }
    if (key == "Control") {
      key = "Ctrl";
    }
    DisableKey(key);
  });
});
