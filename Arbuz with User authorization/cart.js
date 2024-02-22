function createCartItem(cartItemData) {
  const { imgUrl, brand, category, price, quantity } = cartItemData;

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  const cartItemLeft = document.createElement("div");
  cartItemLeft.classList.add("cart-item-left");

  const img = document.createElement("img");
  img.src = imgUrl;
  img.alt = "";

  const cartItemLeftActions = document.createElement("div");
  cartItemLeftActions.classList.add("cart-item-left-actions");

  const itemNameLink = document.createElement("a");
  itemNameLink.href = "#";
  itemNameLink.textContent = brand + " - " + category;

  const cartItemAmount = document.createElement("div");
  cartItemAmount.classList.add("cart-item-amount");

  const trashButton = document.createElement("button");
  trashButton.innerHTML =
    cartItemData.quantity > 1
      ? '<ion-icon name="remove"></ion-icon>'
      : '<ion-icon name="trash-outline"></ion-icon>';
  trashButton.addEventListener("click", () => {
    decreaseQuantity(cartItemData);
  });

  const amountText = document.createElement("p");
  amountText.textContent = quantity;

  const addButton = document.createElement("button");
  addButton.innerHTML = '<ion-icon name="add-outline"></ion-icon>';
  addButton.addEventListener("click", () => increaseQuantity(cartItemData));

  cartItemAmount.appendChild(trashButton);
  cartItemAmount.appendChild(amountText);
  cartItemAmount.appendChild(addButton);

  cartItemLeftActions.appendChild(itemNameLink);
  cartItemLeftActions.appendChild(cartItemAmount);

  cartItemLeft.appendChild(img);
  cartItemLeft.appendChild(cartItemLeftActions);

  const cartItemRight = document.createElement("div");
  cartItemRight.classList.add("cart-item-right");

  const closeButton = document.createElement("button");
  closeButton.innerHTML = '<ion-icon name="close-outline"></ion-icon>';
  closeButton.addEventListener("click", () => removeProduct(cartItemData));

  const priceText = document.createElement("p");
  priceText.textContent = getPrice(price) + " ₸";

  cartItemRight.appendChild(closeButton);
  cartItemRight.appendChild(priceText);

  cartItem.appendChild(cartItemLeft);
  cartItem.appendChild(cartItemRight);

  return cartItem;
}

function getPrice(price) {
  let priceStr = String(price);
  if (priceStr.length > 4) {
    const priceSlices = [];
    for (let i = priceStr.length - 3; i >= 0; i -= 3) {
      priceSlices.unshift(priceStr.slice(i > 0 ? i : 0, i + 3));
      priceStr = priceStr.slice(0, i);
    }
    priceSlices.unshift(priceStr);
    priceStr = priceSlices.join(" ");
  }
  return priceStr;
}

function increaseQuantity(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.map((p) =>
    p.id == product.id ? { ...p, quantity: p.quantity + 1 } : p
  );
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

function decreaseQuantity(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (product.quantity > 1) {
    cart = cart.map((p) =>
      p.id == product.id ? { ...p, quantity: p.quantity - 1 } : p
    );
  } else {
    cart = cart.filter((p) => p.id !== product.id);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

function getPrices() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length == 0) {
    return {
      productsPrice: 0,
      deliveryPrice: 0,
      totalPrice: 0,
    };
  } else {
    const itemPrices = cart.map((p) => p.price * p.quantity);
    let productsPrice = 0;
    itemPrices.forEach((p) => (productsPrice += p));
    const deliveryPrice = productsPrice > 8000 ? 0 : 700;
    return {
      productsPrice: productsPrice,
      deliveryPrice: deliveryPrice,
      totalPrice: productsPrice + deliveryPrice,
    };
  }
}

function clearCart() {
  localStorage.removeItem("cart");
  window.location.reload();
}

function removeProduct(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((p) => p.id != product.id);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

function displayCart() {
  const items = document.querySelector(".cart-items");
  items.classList.toggle("hidden");
  items.classList.contains("hidden");
  const displayBtn = document.querySelector("#display-cart button");
  displayBtn.innerHTML = items.classList.contains("hidden")
    ? '<ion-icon name="chevron-down-outline"></ion-icon>'
    : '<ion-icon name="chevron-up-outline"></ion-icon>';
}

async function handlePurchase() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  const purchaseBack = document.querySelector('.purchase-back');
  const purchaseResult = document.querySelector('.purchase-result');
  const authRequired = document.querySelector('.auth-required');
  const purchasing = document.querySelector('.purchasing');
  purchaseBack.classList.remove("hidden");
  purchaseResult.classList.remove("hidden");
  if (currentUser) {
    purchasing.classList.remove("hidden");
    purchasing.innerHTML = "<p>Purchase being completed";
    const isPurchased = await purchase();
    if (isPurchased) {
      purchasing.innerHTML = `
      <p>Purchase was successfully completed</p>
      <p>Thank you for shopping with us</p>
      <button><a href="index.html">Go to catalog</a></button>
      `
    } else {
      purchasing.innerHTML = `
      <p>Purchase failed</p>
      <p>Please try again</p>
      <button><a href="index.html">try later.</a></button>
      `
    }
  } else {
    purchaseResult.innerHTML = 
    `<div class="auth-required">
            You have to authorize to purchase products.
            <button><a href="auth.html">Authorize</a></button>
      </div>
    `;
  }
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length > 0) {
  const emptyCart = document.querySelector(".empty-cart");
  emptyCart.classList.add("hidden");
  const main = document.querySelector("main");
  main.classList.remove("hidden");

  const cartSize = document.querySelector("#cart-size");
  cartSize.textContent = cart.length;

  const clearCartButton = document.querySelector("#clear-cart");
  clearCartButton.addEventListener("click", clearCart);

  const displayCartButton = document.querySelector("#display-cart button");
  displayCartButton.addEventListener("click", displayCart);

  const cartItems = document.querySelector(".cart-items");
  cart.forEach((product) => {
    cartItems.appendChild(createCartItem(product));
  });

  const productsPriceBox = document.querySelector("#products-price");
  const deliveryPriceBox = document.querySelector("#delivery-price");
  const totalPriceTextBox = document.querySelector("#total-price");
  console.log(getPrices());
  const { productsPrice, deliveryPrice, totalPrice } = getPrices();

  productsPriceBox.textContent = getPrice(productsPrice) + " ₸";
  deliveryPriceBox.textContent = getPrice(deliveryPrice) + " ₸";
  totalPriceTextBox.textContent = getPrice(totalPrice) + " ₸";

  const purchaseButton = document.querySelector(".cart-right button");
  purchaseButton.addEventListener("click", handlePurchase);
} else {
  const emptyCart = document.querySelector(".empty-cart");
  emptyCart.classList.remove("hidden");
  const main = document.querySelector("main");
  main.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", updateCart);

async function updateCart() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (currentUser) {
    const res = await fetch(
      `https://659c067fd565feee2dac49a8.mockapi.io/shoplane/api/v1/users/${currentUser.id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ cart: cart }),
      }
    );

    const data = await res.json();
    localStorage.setItem("currentUser", JSON.stringify(data));
    localStorage.setItem("cart", JSON.stringify(data.cart));
  }
}

async function purchase() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (currentUser) {
    const purchaseResponse = await fetch(
      `https://659c067fd565feee2dac49a8.mockapi.io/shoplane/api/v1/users/${currentUser.id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({...currentUser, purchases: [...currentUser.purchases, {items: cart, date: Date.now()}], cart: [] }),
      }
    );
    const data = await purchaseResponse.json();
    localStorage.setItem("currentUser", JSON.stringify(data));
    localStorage.removeItem("cart");
    return purchaseResponse.ok ? true : false;
   }
   return false;
}