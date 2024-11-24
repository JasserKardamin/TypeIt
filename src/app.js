document.addEventListener("DOMContentLoaded", () => {
  const KeyboardButtons = document.querySelectorAll("span");

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
