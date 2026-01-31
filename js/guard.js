import { auth, db } from "./firebase.js";
import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export function checkRole(role){
 onAuthStateChanged(auth,async(user)=>{
  if(!user) location.href="index.html";
  const snap=await getDoc(doc(db,"users",user.uid));
  if(snap.data().role!==role) location.href="403.html";
 });
}
