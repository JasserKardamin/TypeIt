import { HandleKeyApply } from "../utils/handlekey.js";
import { RenderAZERTY , RenderQWERTY  } from "../utils/RenderKeyboard.js";
import { HandleTyping, LoadPhrase } from "../utils/HandleTyping.js";
import { SpecialBackground , StandardBackground , StandardTextColor , SpecialTextColor , RefreshDefault} from "../utils/customizations.js";


const SpecialButton = document.querySelector("#Special-keys");
const StandardButton = document.querySelector("#Standard-keys");
const StandardText = document.querySelector("#Standard-text");
const SpecialText = document.querySelector("#Special-text")
const Palette = document.querySelector("#Palette")
const CustomizationsDiv = document.getElementById("customizations");

Palette.addEventListener('click',(event)=>{
  CustomizationsDiv.classList.toggle('flex');
  CustomizationsDiv.classList.toggle('hidden');
})

const applyTheme = () => {
  SpecialText.addEventListener('input', (event) => {
    SpecialTextColor(event.target.value);
  })

  StandardText.addEventListener('input', (event) => {
    StandardTextColor(event.target.value);
  })

  StandardButton.addEventListener('input', (event) => {
    StandardBackground(event.target.value);
  })

  SpecialButton.addEventListener('input', (event) => {
    SpecialBackground(event.target.value);
  });
}
applyTheme();


const RefreshTheme = (layout) => {
  const specialTextColor = SpecialText.value;
  const standardTextColor = StandardText.value;
  const standardBackgroundColor = StandardButton.value;
  const specialBackgroundColor = SpecialButton.value;

  SpecialTextColor(specialTextColor);
  StandardTextColor(standardTextColor);
  StandardBackground(standardBackgroundColor);
  SpecialBackground(specialBackgroundColor);
};


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
      RefreshDefault();
      RenderAZERTY();
      RefreshTheme();
      BuildButtonMap();
    } else {
      RefreshDefault();
      RenderQWERTY();
      RefreshTheme();
      BuildButtonMap();
    }
  });

  const ActivateKey = (key) => {
    const button = buttonMap[key.toLowerCase()];
    //console.log(key, "=", button.textContent);

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
    if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
        return;
      }
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
    if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
        return;
      }
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

    if (event.key == "AltGraph" ) {
      Array.from(activeKeys).forEach((cap) => {
        DisableKey(cap);
        activeKeys.delete(cap.toLowerCase());
      });
    } else {
      DisableKey(key);
    }
  });
});
