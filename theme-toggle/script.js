const sunMoonContrainer = document.querySelector(".sun-moon-container");

document.querySelector(".theme-toggle-button").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const currentRotation = parseInt(
    getComputedStyle(sunMoonContrainer).getPropertyValue("--rotation"),
  );
  sunMoonContrainer.style.setProperty("--rotation", currentRotation + 180);
});
