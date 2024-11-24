import HandleKeyApply from "../utils/handlekey.js";

document.addEventListener("DOMContentLoaded", () => {
  const KeyboardButtons = document.querySelectorAll("span");
  const MyArrayOfButtons = Array.from(KeyboardButtons);

  var IndexOfButton = 0;

  const ActivateKey = (key, index) => {
    if (
      MyArrayOfButtons[IndexOfButton].textContent.toLowerCase() ===
        key.toLowerCase() ||
      MyArrayOfButtons[IndexOfButton].parentElement.id == key
    ) {
      if (
        MyArrayOfButtons[IndexOfButton].textContent == "Shift" ||
        MyArrayOfButtons[IndexOfButton].textContent == "Ctrl" ||
        MyArrayOfButtons[IndexOfButton].textContent == "Alt"
      ) {
        HandleKeyApply(MyArrayOfButtons[IndexOfButton], "enable");
        IndexOfButton = 0;
      } else {
        MyArrayOfButtons[IndexOfButton].parentElement.classList.add("active");
        IndexOfButton = 0;
      }
      IndexOfButton = 0;
      return;
    } else {
      IndexOfButton = IndexOfButton + 1;
      ActivateKey(key, IndexOfButton);
    }
  };

  const DisableKey = (key, index) => {
    if (
      MyArrayOfButtons[IndexOfButton].textContent.toLowerCase() ===
        key.toLowerCase() ||
      MyArrayOfButtons[IndexOfButton].parentElement.id == key
    ) {
      // optimizable
      if (
        MyArrayOfButtons[IndexOfButton].textContent == "Shift" ||
        MyArrayOfButtons[IndexOfButton].textContent == "Ctrl" ||
        MyArrayOfButtons[IndexOfButton].textContent == "Alt"
      ) {
        HandleKeyApply(MyArrayOfButtons[IndexOfButton], "disable");
        IndexOfButton = 0;
      } else {
        MyArrayOfButtons[IndexOfButton].parentElement.classList.remove(
          "active"
        );
        IndexOfButton = 0;
      }
      return;
    } else {
      IndexOfButton = IndexOfButton + 1;
      DisableKey(key, IndexOfButton);
    }
  };

  /*
  const ActivateKey = (key) => {
    let ButtonNeeded = Array.from(KeyboardButtons).filter((item) => {
      return (
        item.textContent.toLowerCase() === key.toLowerCase() ||
        item.parentElement.id == key
      );
    });
    ButtonNeeded.forEach((element) => {
      if (
        element.textContent.toLowerCase() == key.toLowerCase() ||
        element.parentElement.id == key
      ) {
        element.parentElement.classList.add("active");
      }
    });
  };


  const DisableKey = (key) => {
    let ButtonNeeded = Array.from(KeyboardButtons).filter((item) => {
      return (
        item.textContent.toLowerCase() === key.toLowerCase() ||
        item.parentElement.id == key
      );
    });
    ButtonNeeded.forEach((element) => {
      if (
        element.textContent.toLowerCase() == key.toLowerCase() ||
        element.parentElement.id == key
      ) {
        element.parentElement.classList.remove("active");
      }
    });
  };

  */

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
