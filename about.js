// Restore dark mode
(function () {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
})();
