function createCard(product) {
  const { id, imgUrl, price, brand, category } = product;

  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = imgUrl;
  img.alt = "";

  const priceHeading = document.createElement("h3");
  priceHeading.textContent = getPrice(price) + " ₸"; // price + "t"

  const brandPara = document.createElement("p");
  brandPara.textContent = brand;

  const descriptionPara = document.createElement("p");
  descriptionPara.textContent = category;

  const button = document.createElement("button");
  if (isAddedToCart(product)) {
    button.textContent = "Added to cart";
    button.enabled = false;
  } else {
    button.textContent = "Add to cart";
    button.addEventListener("click", () => {
      addToCart(product);
    });
  }

  card.appendChild(img);
  card.appendChild(priceHeading);
  card.appendChild(brandPara);
  card.appendChild(descriptionPara);
  card.appendChild(button);

  return card;
}

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!isAddedToCart(product)) {
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
  }
}

function postCart() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  if (!currentUser) return;

  const url = new URL(
    "https://659c067fd565feee2dac49a8.mockapi.io/shoplane/api/v1/users"
  );
  url.searchParams.append("number", user.number);

  fetch(url, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      setTimeout(() => {}, 5000);
      return res.json();
    })
    .then((users) => users[0].cart)
    
    .catch((error) => {
      errorBox.classList.remove("hidden");
      errorBox.firstElementChild.textContent = error.message;
      signInButton.disabled = false;
      signInButton.classList.remove("inactive");
    });
}

function isAddedToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.find((p) => p.id == product.id) != null;
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

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelector(".cards");
  const loading = document.createElement("div");
  loading.textContent = "Loading...";
  cards.appendChild(loading);
  fetch("https://659c067fd565feee2dac49a8.mockapi.io/shoplane/api/v1/products")
    .then((response) => response.json())
    .then((data) => {
      cards.removeChild(cards.firstElementChild);
      data.forEach((product) => {
        cards.appendChild(createCard(product));
      });
    })
    .catch((error) => {
      loading.textContent = error.message + ". Try later.";
    });
});

const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
if (currentUser) {
  const authBtn = document.querySelector("#auth-btn");
  const username = document.createElement("a");
  username.textContent = currentUser.username;
  authBtn.appendChild(username);
}