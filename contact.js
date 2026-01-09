// Restore dark mode
(function () {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
})();

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("successMsg").textContent =
    "Thank you! Your message has been sent.";
  e.target.reset();
});
