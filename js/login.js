import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  setDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const roleSelect = document.getElementById("role");

// Signup
document.getElementById("signupBtn").addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const role = roleSelect.value;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCred.user.uid), {
      email: email,
      role: role,
      isVerified: role === "vendor" ? false : true
    });

    alert("Signup successful");
    redirectUser(role);

  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});

// Login
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);

    const snap = await getDoc(doc(db, "users", userCred.user.uid));
    const userData = snap.data();

    redirectUser(userData.role);

  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});

// Guest
document.getElementById("guestBtn").addEventListener("click", () => {
  window.location.href = "home.html";
});

// Redirect function
function redirectUser(role) {
  if (role === "admin") {
    window.location.href = "admin.html";
  } else if (role === "vendor") {
    window.location.href = "vendor.html";
  } else {
    window.location.href = "user.html";
  }
}
