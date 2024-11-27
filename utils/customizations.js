const SpecialText = (value) => {
    const SpecialButtons = document.querySelectorAll(".special");
    if (value.length === 7) {
        SpecialButtons.forEach((special) => {
            special.classList.remove("bg-[#FE6628]");
            special.classList.add(`bg-[${value}]`);
        });
    }
}

export { SpecialText }
