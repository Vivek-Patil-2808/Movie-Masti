import {
  auth,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "./firebase.js";

/* GOOGLE LOGIN */
window.googleLogin = () => {
  signInWithPopup(auth, provider)
    .then(res => {
      const user = {
        uid: res.user.uid,
        name: res.user.displayName,
        photo: res.user.photoURL
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("justLoggedIn", "true");

      window.location.href = "index.html";
    })
    .catch(err => alert(err.message));
};

/* CHECK AUTH */
window.checkAuth = () => {
  onAuthStateChanged(auth, user => {
    if (!user) {
      window.location.href = "auth.html";
    }
  });
};

/* SHOW LOGIN SUCCESS */
window.addEventListener("load", () => {
  if (localStorage.getItem("justLoggedIn")) {
    localStorage.removeItem("justLoggedIn");

    setTimeout(() => {
      window.showModal(
        "Login Successful",
        "Welcome to MovieMasti 🎬"
      );
    }, 400);
  }
});

/* LOGOUT */
window.logout = () => {
  signOut(auth).then(() => {
    localStorage.clear();

    window.showModal(
      "Logged Out",
      "You have been logged out successfully",
      "logout"
    );

    setTimeout(() => {
      window.location.href = "auth.html";
    }, 1500);
  });
};
