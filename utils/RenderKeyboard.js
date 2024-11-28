import { AZERTY , QWERTY } from "../src/constants.js";

let MyCrtls, MyAlts, MyShifts, MyEnters, AllMyKeys;

document.addEventListener("DOMContentLoaded", () => {
  //getting needed values
  MyCrtls = document.querySelectorAll(".Ctrl");
  MyAlts = document.querySelectorAll(".Alt");
  MyShifts = document.querySelectorAll(".Shift");
  MyEnters = document.querySelectorAll(".enter");
  AllMyKeys = Array.from(document.querySelectorAll(".key"));
});

const RenderAzertySkeleton = () => {
  const MyLines = Array.from(document.querySelectorAll(".line"));
  const EnterButton = document.querySelector(".enter");

  // modifying the Enterbutton (the last button in the second line )
  if(MyLines[1].lastElementChild.classList.contains("standard")){

    MyLines[1].lastElementChild.classList.remove("bg-white", "standard");
    MyLines[1].lastElementChild.classList.add(
      "enter",
      "font-bold",
      "bg-[#FE6628]",
      "text-white",
      "special"
    );

    // modifying the real enter(last button in the third line )
    EnterButton.classList.remove(
      "w-[90px]",
      "bg-[#FE6628]",
      "text-white",
      "enter",
      "font-bold",
      "special"
    );
    EnterButton.classList.add("w-[38px]", "bg-white", "text-black","standard");

  }



// the seconde portion of the new enter button .
  if ( MyLines[2].lastElementChild.classList.contains("standard")) {
    const NewEnter = document.createElement("div");
    NewEnter.classList.add("enter", "bg-[#FE6628]", "text-black", "special", "AzertyEnter");

    const NewEnterFirstSpan = document.createElement("span");
    NewShiftFirstSpan.classList.add("text-[12px]", "pl-2", "pt-1");
    NewShiftFirstSpan.textContent = "Enter";
    NewEnter.appendChild(NewShiftFirstSpan);

    MyLines[2].appendChild(NewEnter);
  }

  //REFRESHING ENTER BUTTONS
  MyEnters = document.querySelectorAll(".enter");

  //modifying the shift
  MyLines[3].lastElementChild.classList.remove( "Shift" ,"font-bold");
  MyLines[3].lastElementChild.classList.replace("w-[112px]" , "w-[38px]" );

  if (!MyLines[3].lastElementChild.classList.contains("AzertyShift")) {
      const NewShift = document.createElement("div");
      NewShift.classList.add(
        "Shift",
        "keycap",
        "AzertyShift",
        "Shift",
        "bg-white",
        "standard"
      );
      // Making the shift span
      const NewShiftFirstSpan = document.createElement("span");
      NewShiftFirstSpan.classList.add("text-[12px]", "pl-2", "pt-1");
      NewShiftFirstSpan.textContent = "Shift";
      NewShift.appendChild(NewShiftFirstSpan);
      // appending the shift
      MyLines[3].appendChild(NewShift);
      MyShifts = document.querySelectorAll(".Shift");
  }
   MyEnters = document.querySelectorAll(".enter");
};

const RenderAZERTY = () => {
  RenderAzertySkeleton();
  let Index = 0;
  AllMyKeys.forEach((keycap) => {
    if (AZERTY[Index]) {
      if (AZERTY[Index].includes(" ")) {
        const [firstPart, restParts] = AZERTY[Index].split(" ");
        keycap.firstElementChild.textContent = firstPart;
        keycap.lastElementChild.textContent = restParts;
      } else {
        keycap.firstElementChild.textContent = AZERTY[Index];
      }
    }
    Index = Index + 1;
  });
};











//Azerty
const RenderQwertySkeleton = () => {
  const MyLines = Array.from(document.querySelectorAll(".line"));
  const NewEnter = document.querySelector(".AzertyEnter");
  const NewShift = document.querySelector(".AzertyShift");


  // Removing the new Shift button

  // Reverting the Enter button
  if (MyLines[1].lastElementChild.classList.contains("special")) {
    MyLines[1].lastElementChild.classList.remove("enter","font-bold","special","bg-[#FE6628]","text-white");
    MyLines[1].lastElementChild.classList.add("bg-white", "standard");
  }
  // Removing the second portion of the new Enter button
  if (NewEnter) {
    NewEnter.remove();
  }

  if (MyLines[1].lastElementChild.classList.contains("standard")) {
    MyLines[2].lastElementChild.classList.remove("w-[38px]", "bg-white", "text-black", "standard");
    MyLines[2].lastElementChild.classList.add(
      "w-[90px]",
      "bg-[#FE6628]",
      "text-white",
      "enter",
      "font-bold",
      "special"
    );
  }

  if (NewShift) {
    NewShift.remove();
  }
  if (MyLines[3].lastElementChild.classList.contains("standard")) {
    MyLines[3].lastElementChild.classList.add("Shift", "font-bold");
    MyLines[3].lastElementChild.classList.replace("w-[38px]", "w-[112px]");
  }
  MyShifts = document.querySelectorAll(".Shift");
  MyEnters = document.querySelectorAll(".enter");
};


const RenderQWERTY = () => {
  RenderQwertySkeleton();
  let Index = 0;
  AllMyKeys.forEach((keycap) => {
    if (QWERTY[Index]) {
      if (QWERTY[Index].includes(" ")) {
        const [firstPart, restParts] = QWERTY[Index].split(" ");
        keycap.firstElementChild.textContent = firstPart;
        keycap.lastElementChild.textContent = restParts;
      } else {
        keycap.firstElementChild.textContent = QWERTY[Index];
      }
    }
    Index = Index + 1;
  });
};








export { MyCrtls, MyAlts, MyShifts, MyEnters, AllMyKeys, RenderAZERTY , RenderQWERTY};
