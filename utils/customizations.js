

function isValidHexColor(value) {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    return hexRegex.test(value);
}

const SpecialBackground = (value) => {
  const Specials = document.querySelectorAll(".special");
    if (value.length === 7 && isValidHexColor(value)) {
        Specials.forEach((special) => {
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
  const  Standardbuttons = document.querySelectorAll(".standard");
  if(value.length === 7 && isValidHexColor(value)) {
    Standardbuttons.forEach((key)=>{
      key.style.setProperty('--dynamic-text-color',value);
      key.classList.add('text-custom');
    })
  }
}

const SpecialTextColor = (value)=>{
  const Specials = document.querySelectorAll(".special");
  if (value.length === 7 && isValidHexColor(value)) {
    Specials.forEach((key)=>{
      key.classList.remove("text-white");
      key.style.setProperty('--dynamic-text-color',value);
      key.classList.add('text-custom');
    })
  }
}


const RefreshDefault = () =>{
  const Specials = document.querySelectorAll(".special");
  const Standards = document.querySelectorAll(".keycap")

  Specials.forEach((key)=>{
    key.classList.remove("bg-custom");
    key.style.removeProperty('--dynamic-bg-color');
    key.classList.add("bg-[#FE6628]");
  })
  Standards.forEach((key)=>{
    key.parentElement.classList.remove("text-custom");
    key.parentElement.style.removeProperty('--dynamic-text-color');
    key.parentElement.classList.add("text-black");
  })
}
export { SpecialBackground , StandardBackground ,StandardTextColor ,SpecialTextColor ,RefreshDefault }
