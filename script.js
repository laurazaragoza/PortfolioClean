// script.js
const toggle = document.getElementById("about-toggle");
const wrapper = document.getElementById("about-wrapper");

toggle.addEventListener("click", () => {
  const isOpen = wrapper.classList.contains("open");
  wrapper.classList.toggle("open");
  toggle.textContent = isOpen ? "read more" : "read less";
});