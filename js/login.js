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


document.getElementById("signupBtn").addEventListener("click", async () => {
  const email = email.value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCred.user.uid), {
      email,
      role,
      isVerified: role === "vendor" ? false : true
    });

    alert("Signup successful");
    redirectUser(role);

  } catch (error) {
    alert(error.message);
  }
});


document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);

    const snap = await getDoc(doc(db, "users", userCred.user.uid));
    const userData = snap.data();

    redirectUser(userData.role);

  } catch (error) {
    alert(error.message);
  }
});


document.getElementById("guestBtn").addEventListener("click", () => {
  window.location.href = "home.html";
});


function redirectUser(role) {
  if (role === "admin") {
    window.location.href = "admin.html";
  } else if (role === "vendor") {
    window.location.href = "vendor.html";
  } else {
    window.location.href = "user.html";
  }
}
