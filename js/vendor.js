import { auth, db } from "./firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const list=document.getElementById("product-list");

window.addProduct=async()=>{
 await addDoc(collection(db,"items"),{
  vendorId:auth.currentUser.uid,
  name:title.value,
  price:Number(price.value),
  imageUrl:image.value
 });
 load();
}

async function load(){
 const snap=await getDocs(collection(db,"items"));
 list.innerHTML="";
 snap.forEach(d=>{
  const p=d.data();
  if(p.vendorId===auth.currentUser.uid){
   list.innerHTML+=`
   <div class="col-md-3 card p-2">
    <img src="${p.imageUrl}">
    <h5>${p.name}</h5>
    <p>${p.price}</p>
    <button onclick="del('${d.id}')" class="btn btn-danger">Delete</button>
   </div>`;
  }
 });
}
window.del=async(id)=>{
 await deleteDoc(doc(db,"items",id));
 load();
}
load();
