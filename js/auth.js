// import { auth, db } from "./firebase.js";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } 
// from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// import { doc, setDoc, getDoc } 
// from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// // get elements
// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("password");
// const roleSelect = document.getElementById("role");

// const signupBtn = document.getElementById("signupBtn");
// const loginBtn = document.getElementById("loginBtn");
// const guestBtn = document.getElementById("guestBtn");

// // signup
// signupBtn.addEventListener("click", async () => {
//   try {
//     const email = emailInput.value;
//     const password = passwordInput.value;
//     const role = roleSelect.value;

//     const userCred = await createUserWithEmailAndPassword(auth, email, password);

//     await setDoc(doc(db, "users", userCred.user.uid), {
//       email: email,
//       role: role,
//       isVerified: role === "vendor" ? false : true
//     });

//     redirectUser(userCred.user.uid);
//   } catch (error) {
//     alert(error.message);
//     console.error(error);
//   }
// });

// loginBtn.addEventListener("click", async () => {
//   try {
//     const email = emailInput.value;
//     const password = passwordInput.value;

//     const userCred = await signInWithEmailAndPassword(auth, email, password);

//     redirectUser(userCred.user.uid);
//   } catch (error) {
//     alert(error.message);
//     console.error(error);
//   }
// });


// guestBtn.addEventListener("click", () => {
//   window.location.href = "home.html";
// });

// async function redirectUser(uid) {
//   const snap = await getDoc(doc(db, "users", uid));
//   const role = snap.data().role;

//   if (role === "admin") {
//     window.location.href = "admin-dashboard.html";
//   } else if (role === "vendor") {
//     window.location.href = "vendor-dashboard.html";
//   } else {
//     window.location.href = "home.html";
//   }
// }
