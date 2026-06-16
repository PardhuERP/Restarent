const cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

const div =
document.getElementById("cartItems");

let total = 0;

cart.forEach(item=>{

 total += item.Price * item.qty;

 div.innerHTML += `

 <div class="card">

 <h3>${item.Name}</h3>

 <p>Qty: ${item.qty}</p>

 <p>₹${item.Price}</p>

 </div>

 `;

});

document.getElementById(
"grandTotal"
).innerText =
"Total: ₹" + total;
