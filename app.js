const API =
"https://script.google.com/macros/s/AKfycbynUprr2yVmBLCj5KXArQYkS3rIw31Tlw3pfzogRSajoRMIfJ7UmFO2GG3BFQuPYeF11A/exec?action=menu";

fetch(API)
.then(r=>r.json())
.then(data=>{

 const container =
 document.getElementById("menuContainer");

 data.forEach(item=>{

   const card =
   document.createElement("div");

   card.className="card";

   card.innerHTML=`

   <h3>${item.Name}</h3>

   <p>${item.Description}</p>

   <p>
   <span class="price">
   ₹${item.Price}
   </span>
   </p>

   <button onclick="addToCart('${item.ItemID}')">
   Add To Cart
   </button>

   `;

   container.appendChild(card);

 });

});


 let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id){

 const item = menuData.find(x => x.ItemID === id);

 const existing =
 cart.find(x => x.ItemID === id);

 if(existing){
   existing.qty++;
 }else{
   cart.push({
     ItemID:item.ItemID,
     Name:item.Name,
     Price:Number(item.Price),
     qty:1
   });
 }

 localStorage.setItem(
   "cart",
   JSON.stringify(cart)
 );

 updateCartCount();

 alert(item.Name + " Added");
}
}
