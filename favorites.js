/* =========================
   LOAD FAVORITES
========================= */
window.loadFavorites = () => {
  const grid = document.getElementById("favoritesGrid");
  const emptyMsg = document.getElementById("emptyMsg");

  if (!grid || !emptyMsg) return;

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  grid.innerHTML = "";

  if (favorites.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  favorites.forEach(f => {
    const card = document.createElement("div");
    card.className = "favorite-card";

    card.innerHTML = `
      <img src="${f.poster}">
      <h4>${f.title}</h4>
      <small>${f.time}</small>
      <button onclick="removeFromFavorites('${f.imdbID}')">Remove</button>
    `;

    grid.appendChild(card);
  });
};

window.removeFromFavorites = (imdbID) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter(f => f.imdbID !== imdbID);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  loadFavorites();

  window.showModal(
    "Removed from Favorites",
    "Movie removed successfully",
    "remove"
  );
};

document.addEventListener("DOMContentLoaded", loadFavorites);
