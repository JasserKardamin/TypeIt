import { MyCrtls, MyAlts, MyShifts, MyEnters } from "./RenderKeyboard.js";

const HandleKeyApply = (element, action) => {
  let TheWorkingTable = [];
  if (element.textContent == "Alt") {
    TheWorkingTable = MyAlts;
  } else if (element.textContent == "Ctrl") {
    TheWorkingTable = MyCrtls;
  } else if (element.textContent == "Enter") {
    TheWorkingTable = MyEnters;
    console.log(MyEnters);
  } else {
    TheWorkingTable = MyShifts;
  }

  if (action == "enable") {
    TheWorkingTable.forEach((element) => {
      element.classList.add("active");
    });
  } else {
    TheWorkingTable.forEach((element) => {
      element.classList.remove("active");
    });
  }
};

export { HandleKeyApply };
