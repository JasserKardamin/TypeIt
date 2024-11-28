function isValidHexColor(value) {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    return hexRegex.test(value);
}


const SpecialBackground = (value) => {
    const SpecialButtons = document.querySelectorAll(".special");
    if (value.length === 7 && isValidHexColor(value)) {
        SpecialButtons.forEach((special) => {
          special.classList.remove("bg-[#FE6628]");
          special.style.setProperty('--dynamic-bg-color',value);
          special.classList.add('bg-custom');
        });
    }
}


const StandardBackground = (value)=>{
  const StandardButtons = document.querySelectorAll(".standard");

  if(value.length === 7 && isValidHexColor(value)) {
      StandardButtons.forEach((key)=>{
        key.classList.remove("bg-white");
        key.style.setProperty('--dynamic-bg-color',value);
        key.classList.add('bg-custom');
      })
  }
}

const StandardTextColor = (value) =>{
  const  Standardbuttons = document.querySelectorAll(".keycap");
  if(value.length === 7 && isValidHexColor(value)) {
    Standardbuttons.forEach((key)=>{
      key.style.setProperty('--dynamic-text-color',value);
      key.classList.add('text-custom');
    })
  }
}

const SpecialTextColor = (value)=>{
const SpecialButtons = document.querySelectorAll(".special")
  if (value.length === 7 && isValidHexColor(value)) {
    SpecialButtons.forEach((key)=>{
      key.classList.remove("text-white");
      key.style.setProperty('--dynamic-text-color',value);
      key.classList.add('text-custom');
    })
  }
}

export { SpecialBackground , StandardBackground ,StandardTextColor ,SpecialTextColor }
