const API_KEY = "f888ce36";

document.addEventListener("DOMContentLoaded", async () => {
  restoreTheme();
  loadDetails();
});

/* =========================
   LOAD MOVIE DETAILS
========================= */
async function loadDetails() {
  const box = document.getElementById("detailsBox");
  const movieId = localStorage.getItem("movieId");

  if (!movieId) {
    box.innerHTML = "<p>Movie not selected. Please go back.</p>";
    return;
  }

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}&plot=full`
    );

    const m = await res.json();

    if (m.Response === "False") {
      box.innerHTML = `<p>${m.Error}</p>`;
      return;
    }

    box.innerHTML = `
      <img src="${m.Poster !== "N/A" ? m.Poster : "assets/no-image.png"}">
      <h1>${m.Title}</h1>

      <div>
        <span class="badge">${m.Year}</span>
        <span class="badge">${m.Runtime}</span>
        <span class="badge">${m.Genre}</span>
      </div>

      <p><strong>⭐ Rating:</strong> ${m.imdbRating}</p>
      <p><strong>Director:</strong> ${m.Director}</p>
      <p><strong>Actors:</strong> ${m.Actors}</p>

      <p><strong>Plot:</strong><br>${m.Plot}</p>
    `;
  } catch (err) {
    console.error(err);
    box.innerHTML = "<p>Error loading movie details.</p>";
  }
}

/* =========================
   RESTORE DARK MODE
========================= */
function restoreTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
}
