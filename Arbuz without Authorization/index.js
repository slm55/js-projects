// const clothes = [
//   {
//     id: 1,
//     brand: "Reebok",
//     imgUrl: "https://a.lmcdn.ru/product/R/T/RTLACN769003_22188898_1_v1_2x.jpg",
//     price: 7000,
//     category: "Футболка спортивная"
//   },
//   {
//     id: 2,
//     brand: "Mango Man",
//     imgUrl: "https://a.lmcdn.ru/img600x866/R/T/RTLADF619601_22105044_1_v1.jpg",
//     price: 19990,
//     category: "Свитшот NOLA"
//   },
//   {
//     id: 3,
//     brand: "Befree",
//     imgUrl:
//       "https://a.lmcdn.ru/img600x866/M/P/MP002XW127K0_21862929_1_v1_2x.jpg",
//     price: 18660,
//     category: "Платье"
//   },
//   {
//     id: 4,
//     brand: "Snow Airwolf",
//     imgUrl:
//       "https://a.lmcdn.ru/img600x866/R/T/RTLADC667701_21629813_1_v1_2x.jpg",
//     price: 34100,
//     category: "Куртка утепленная"
//   },
// ];

// console.log(JSON.stringify(clothes))

// card vs cart

function createCard(product) {
  const { id, imgUrl, price, brand, category } = product; // destructring

  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = imgUrl;
  img.alt = "";

  const priceHeading = document.createElement("h3");
  priceHeading.textContent = getPrice(price) + " ₸";

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

function addToCart(product) {
  const cart = localStorage.getItem("cart");
  const cartItems = JSON.parse(cart) || [];
  if (isAddedToCart(product)) {
    return;
  }
  cartItems.push({ ...product, brand: "Nike", quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cartItems));
  window.location.reload();
}

function isAddedToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.find((p) => p.id == product.id) != null;
}

const cards = document.querySelector(".cards");
const url =
  "https://659c067fd565feee2dac49a8.mockapi.io/shoplane/api/v1/products";
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((product) => {
      cards.appendChild(createCard(product));
    });
  })
  .catch((error) => {
    cards.innerHTML = `<p>Error occured. Error: ${error}</p>`;
  });

const inbox = document.querySelector(".anim");
const boxes = [
  document.createElement("div"),
  document.createElement("div"),
  document.createElement("div"),
];
const color = ["green", "yellow", "pink"];
for (let i = 0; i < boxes.length; i++) {
  boxes[i].classList.add("box");
  boxes[i].style.backgroundColor = color[i];
  setTimeout(() => {
    inbox.appendChild(boxes[i]);
  }, 5000 * i);
}
