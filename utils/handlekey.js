import { MyCrtls, MyAlts, MyShifts } from "../src/constants.js";

const HandleKeyApply = (element, action) => {
  let TheWorkingTable = [];
  if (element.textContent == "Alt") {
    TheWorkingTable = MyAlts;
  } else if (element.textContent == "Ctrl") {
    TheWorkingTable = MyCrtls;
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

export default HandleKeyApply;
