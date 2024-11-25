let MyCrtls, MyAlts, MyShifts, MyEnters, AllMyKeys;

document.addEventListener("DOMContentLoaded", () => {
  //getting needed values
  MyCrtls = document.querySelectorAll(".Ctrl");
  MyAlts = document.querySelectorAll(".Alt");
  MyShifts = document.querySelectorAll(".Shift");
  MyEnters = document.querySelectorAll(".enter");
  AllMyKeys = Array.from(document.querySelectorAll(".keycap"));
});

const HandleJsonFile = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error loading JSON file:", error);
  }
};

const RenderAzertySkeleton = () => {
  const MyLines = Array.from(document.querySelectorAll(".line"));
  const EnterButton = document.querySelector(".enter");

  // modifying the Enterbutton
  MyLines[1].lastElementChild.classList.add("enter", "font-bold");
  EnterButton.classList.remove(
    "w-[90px]",
    "bg-[#FE6628]",
    "text-white",
    "enter",
    "font-bold"
  );
  EnterButton.classList.add("w-[38px]", "bg-white", "text-black");
  const NewEnter = document.createElement("div");
  NewEnter.classList.add("AzertyEnter", "enter", "bg-white", "text-black");
  MyLines[2].appendChild(NewEnter);
  //REFRESHING ENTER BUTTONS
  MyEnters = document.querySelectorAll(".enter");

  //modifying the shift
  MyLines[3].lastElementChild.classList.remove("w-[112px]", "Shift");
  MyLines[3].lastElementChild.classList.add("w-[38px]");

  const NewShift = document.createElement("div");
  NewShift.classList.add(
    "Shift",
    "keycap",
    "AzertyShift",
    "Shift",
    "bg-white",
    "text-black"
  );

  const NewShiftFirstSpan = document.createElement("span");
  NewShiftFirstSpan.classList.add("text-[12px]", "pl-2", "pt-1");
  NewShiftFirstSpan.textContent = "Shift";
  NewShift.appendChild(NewShiftFirstSpan);
  MyLines[3].appendChild(NewShift);
  MyShifts = document.querySelectorAll(".Shift");
};

const RenderAZERTY = async () => {
  const AzertReadFromJson = await HandleJsonFile("../KeyBoardsLayout.json");
  const AzertyTable = AzertReadFromJson.AZERTY;
  RenderAzertySkeleton();
  let Index = 0;
  AllMyKeys.forEach((keycap) => {
    if (AzertyTable[Index]) {
      if (AzertyTable[Index].includes(" ")) {
        const [firstPart, restParts] = AzertyTable[Index].split(" ");
        keycap.firstElementChild.textContent = firstPart;
        keycap.lastElementChild.textContent = restParts;
      } else {
        keycap.firstElementChild.textContent = AzertyTable[Index];
      }
    }
    Index = Index + 1;
  });
};

export { MyCrtls, MyAlts, MyShifts, MyEnters, AllMyKeys, RenderAZERTY };
