const API =
"https://script.google.com/macros/s/AKfycbynUprr2yVmBLCj5KXArQYkS3rIw31Tlw3pfzogRSajoRMIfJ7UmFO2GG3BFQuPYeF11A/exec";

const cart =
JSON.parse(localStorage.getItem("cart")) || [];

const summary =
document.getElementById("orderSummary");

let subtotal = 0;

cart.forEach(item => {

 subtotal += item.Price * item.qty;

 summary.innerHTML += `
 <p>
 ${item.Name}
 x ${item.qty}
 =
 ₹${item.Price * item.qty}
 </p>
 `;

});

let deliveryCharge = 0;

if(subtotal < 200){
 deliveryCharge = 33;
}

const grandTotal =
subtotal + deliveryCharge;

document.getElementById(
"subtotal"
).innerText =
"Subtotal: ₹" + subtotal;

document.getElementById(
"delivery"
).innerText =
"Delivery: ₹" + deliveryCharge;

document.getElementById(
"grandTotal"
).innerText =
"Total: ₹" + grandTotal;

async function submitOrder(){

 const customerName =
 document.getElementById(
 "customerName"
 ).value;

 const mobile =
 document.getElementById(
 "mobile"
 ).value;

 const address =
 document.getElementById(
 "address"
 ).value;

 const landmark =
 document.getElementById(
 "landmark"
 ).value;

 const instructions =
 document.getElementById(
 "instructions"
 ).value;

 const utr =
 document.getElementById(
 "utr"
 ).value;

 if(!customerName ||
    !mobile ||
    !utr){

   alert(
   "Please fill required fields"
   );

   return;
 }

 const payload = {

   customerName,

   mobile,

   address,

   landmark,

   items: JSON.stringify(cart),

   amount: subtotal,

   deliveryCharge,

   finalAmount: grandTotal,

   utr,

   orderType:"Delivery",

   specialInstructions:
   instructions

 };

 try{

   const response =
   await fetch(API,{

     method:"POST",

     body:JSON.stringify(payload)

   });

   const result =
   await response.json();

   if(result.success){

      localStorage.removeItem(
      "cart"
      );

      alert(
      "Order Submitted\nOrder ID: "
      + result.orderId
      );

      window.location =
      "track.html?orderId="
      + result.orderId;

   }else{

      alert(
      "Order Failed"
      );

   }

 }catch(err){

   console.error(err);

   alert(
   "Server Error"
   );

 }

}
