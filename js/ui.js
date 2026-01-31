import { db } from "./firebase.js";
import { collection, getDocs }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const grid=document.getElementById("product-grid");

async function load(){
 const snap=await getDocs(collection(db,"items"));
 grid.innerHTML="";
 snap.forEach(d=>{
  const p=d.data();
  grid.innerHTML+=`
  <div class="col-md-3 card p-2">
   <img src="${p.imageUrl}">
   <h5>${p.name}</h5>
   <p>${p.price}</p>
   <button class="btn btn-success">Buy</button>
  </div>`;
 });
}
load();
