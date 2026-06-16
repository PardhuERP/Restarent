let cart =
JSON.parse(localStorage.getItem("cart")) || [];

const cartItems =
document.getElementById("cartItems");

function renderCart(){

  cartItems.innerHTML = "";

  let total = 0;

  if(cart.length === 0){

    cartItems.innerHTML = `
      <div class="card">
        <h3>Cart is Empty</h3>
        <a href="index.html">
          <button>Browse Menu</button>
        </a>
      </div>
    `;

    document.getElementById(
      "grandTotal"
    ).innerText = "₹0";

    return;
  }

  cart.forEach((item,index)=>{

    const itemTotal =
    item.Price * item.qty;

    total += itemTotal;

    cartItems.innerHTML += `

    <div class="card">

      <h3>${item.Name}</h3>

      <p>₹${item.Price}</p>

      <div class="qty-box">

        <button onclick="decreaseQty(${index})">
        -
        </button>

        <span>${item.qty}</span>

        <button onclick="increaseQty(${index})">
        +
        </button>

      </div>

      <p>Total: ₹${itemTotal}</p>

      <button
      class="remove-btn"
      onclick="removeItem(${index})">
      Remove
      </button>

    </div>

    `;
  });

  document.getElementById(
  "grandTotal"
  ).innerText =
  "Grand Total: ₹" + total;
}

function increaseQty(index){

  cart[index].qty++;

  saveCart();
}

function decreaseQty(index){

  if(cart[index].qty > 1){

    cart[index].qty--;

  }else{

    cart.splice(index,1);

  }

  saveCart();
}

function removeItem(index){

  cart.splice(index,1);

  saveCart();
}

function saveCart(){

  localStorage.setItem(
  "cart",
  JSON.stringify(cart)
  );

  renderCart();
}

renderCart();
