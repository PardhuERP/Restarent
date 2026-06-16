const API =
"https://script.google.com/macros/s/AKfycbynUprr2yVmBLCj5KXArQYkS3rIw31Tlw3pfzogRSajoRMIfJ7UmFO2GG3BFQuPYeF11A/exec?action=menu";

let menuData = [];

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

// Load Menu
fetch(API)
.then(response => response.json())
.then(data => {

    menuData = data;

    const container =
    document.getElementById("menuContainer");

    container.innerHTML = "";

    data.forEach(item => {

        const price =
        item.OfferPrice &&
        Number(item.OfferPrice) < Number(item.Price)
        ?
        `
        <p>
            <del>₹${item.Price}</del>
            <span class="offer"> ₹${item.OfferPrice}</span>
        </p>
        `
        :
        `
        <p>₹${item.Price}</p>
        `;

        const badge =
        item.Bestseller &&
        item.Bestseller.trim().toUpperCase() === "YES"
        ?
        `<span class="badge">⭐ Bestseller</span>`
        :
        "";

        const card =
        document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            ${badge}

            <h3>${item.Name}</h3>

            <p>${item.Description}</p>

            ${price}

            <button onclick="addToCart('${item.ItemID}')">
                Add To Cart
            </button>
        `;

        container.appendChild(card);

    });

    updateCartCount();

})
.catch(error => {
    console.error("Menu Load Error:", error);
});

// Add Item To Cart
function addToCart(id) {

    const item =
    menuData.find(x => x.ItemID === id);

    if (!item) return;

    const existing =
    cart.find(x => x.ItemID === id);

    const itemPrice =
    item.OfferPrice &&
    Number(item.OfferPrice) < Number(item.Price)
    ?
    Number(item.OfferPrice)
    :
    Number(item.Price);

    if (existing) {

        existing.qty++;

    } else {

        cart.push({
            ItemID: item.ItemID,
            Name: item.Name,
            Price: itemPrice,
            qty: 1
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(item.Name + " Added To Cart");
}

// Update Cart Count
function updateCartCount() {

    const cartData =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    let totalItems = 0;

    cartData.forEach(item => {
        totalItems += item.qty;
    });

    const cartCount =
    document.getElementById("cartCount");

    if (cartCount) {
        cartCount.innerText = totalItems;
    }
}
