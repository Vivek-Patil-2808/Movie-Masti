/* =========================
   CONFIG
========================= */
const API_KEY = "f888ce36";

let page = 1;
let query = "";

/* =========================
   DOM ELEMENTS (SAFE)
========================= */
const moviesDiv = document.getElementById("movies");
const pageNo = document.getElementById("pageNo");

/* =========================
   LOAD USER (DESKTOP + MOBILE SIDEBAR)
========================= */
window.loadUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  /* NAVBAR USER (DESKTOP) */
  const userInfo = document.getElementById("userInfo");
  if (userInfo) {
    userInfo.innerHTML = `<img src="${user.photo}"> ${user.name}`;
  }

  /* SIDEBAR USER (MOBILE) */
  const sidebarAvatar = document.getElementById("sidebarAvatar");
  const sidebarName = document.getElementById("sidebarName");

  if (sidebarAvatar && sidebarName) {
    sidebarAvatar.src = user.photo;
    sidebarName.textContent = user.name;
  }

  /* HERO TEXT */
  const welcomeText = document.getElementById("welcomeText");
  if (welcomeText) {
    welcomeText.innerHTML = `
      <span class="wave-emoji">👋</span>
      Hi, <span class="highlight-name">${user.name.split(" ")[0]}</span><br>
      Browse your favourite movies
    `;
  }
};

/* =========================
   SIDEBAR TOGGLE
========================= */
window.toggleMenu = () => {
  const menu = document.getElementById("mobileMenu");
  if (menu) {
    menu.classList.toggle("active");
  }
};

/* =========================
   DARK MODE
========================= */
window.toggleDark = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
};

/* RESTORE THEME */
(() => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
})();

/* =========================
   SEARCH
========================= */
window.searchMovies = () => {
  const input = document.getElementById("searchInput");
  if (!input) return;

  query = input.value.trim();
  if (!query) return;

  page = 1;
  fetchMovies();
};

function fetchMovies() {
  if (!moviesDiv) return;

  moviesDiv.innerHTML = "<p>Loading...</p>";

  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`)
    .then(res => res.json())
    .then(data => {
      moviesDiv.innerHTML = "";

      if (!data.Search) {
        moviesDiv.innerHTML = "<p>No results found</p>";
        return;
      }

      data.Search.forEach(createMovieCard);
      if (pageNo) pageNo.textContent = page;
    })
    .catch(() => {
      moviesDiv.innerHTML = "<p>Error loading movies</p>";
    });
}

/* =========================
   MOVIE CARD
========================= */
function createMovieCard(movie) {
  if (!moviesDiv) return;

  const favorites = getFavorites();
  const isFav = favorites.some(f => f.imdbID === movie.imdbID);

  const card = document.createElement("div");
  card.className = "movie-card";

  card.innerHTML = `
    <img src="${movie.Poster}">
    <h4>${movie.Title}</h4>
    <i class="fas fa-heart fav-icon ${isFav ? "active" : ""}"></i>
  `;

  /* OPEN DETAILS */
  card.addEventListener("click", e => {
    if (e.target.classList.contains("fav-icon")) return;
    localStorage.setItem("movieId", movie.imdbID);
    window.location.href = "details.html";
  });

  /* FAVORITE TOGGLE */
  const heart = card.querySelector(".fav-icon");
  heart.onclick = e => {
    e.stopPropagation();
    toggleFavorite(movie, heart);
  };

  moviesDiv.appendChild(card);
}

/* =========================
   FAVORITES LOGIC
========================= */
function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function toggleFavorite(movie, heart) {
  let favorites = getFavorites();
  const index = favorites.findIndex(f => f.imdbID === movie.imdbID);

  if (index > -1) {
    favorites.splice(index, 1);
    heart.classList.remove("active");

    window.showModal(
      "Removed from Favorites",
      "Movie removed from your favorites",
      "remove"
    );
  } else {
    favorites.push({
      imdbID: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      time: new Date().toLocaleString()
    });
    heart.classList.add("active");

    window.showModal(
      "Added to Favorites",
      `${movie.Title} added to your favorites`
    );
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

/* =========================
   PAGINATION
========================= */
window.nextPage = () => {
  page++;
  fetchMovies();
};

window.prevPage = () => {
  if (page > 1) {
    page--;
    fetchMovies();
  }
};

/* =========================
   SUCCESS MODAL (GLOBAL)
========================= */
window.showModal = (title, message, icon = "check") => {
  const modal = document.getElementById("successModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");
  const modalIcon = document.getElementById("modalIcon");

  if (!modal || !modalTitle || !modalMessage || !modalIcon) return;

  modalTitle.textContent = title;
  modalMessage.textContent = message;

  modalIcon.className =
    icon === "remove"
      ? "fas fa-trash-alt"
      : icon === "logout"
      ? "fas fa-sign-out-alt"
      : "fas fa-check-circle";

  modal.style.display = "flex";
};

window.closeModal = () => {
  const modal = document.getElementById("successModal");
  if (modal) modal.style.display = "none";
};

/* =========================
   BACK TO HOME
========================= */
window.goHome = () => {
  window.location.href = "index.html";
};
