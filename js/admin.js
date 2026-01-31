import { db } from "./firebase.js";
import { collection, getDocs, updateDoc, doc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const usersTable = document.getElementById("usersTable");
const vendorsTable = document.getElementById("vendorsTable");

async function load(){
 const snap = await getDocs(collection(db,"users"));
 usersTable.innerHTML="";
 vendorsTable.innerHTML="";

 snap.forEach(d=>{
  const u=d.data();
  if(u.role==="user"){
    usersTable.innerHTML+=`<tr><td>${u.email}</td></tr>`;
  }
  if(u.role==="vendor"){
    vendorsTable.innerHTML+=`
    <tr>
     <td>${u.email}</td>
     <td><button onclick="verify('${d.id}',${u.isVerified})" class="btn btn-warning">
     ${u.isVerified?"Unverify":"Verify"}</button></td>
    </tr>`;
  }
 });
}
window.verify=async(id,status)=>{
 await updateDoc(doc(db,"users",id),{isVerified:!status});
 load();
}
load();
