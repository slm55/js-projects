// const doPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const skills = ["HTML", "CSS", "JS"];
//     if (skills.length > 0) {
//       resolve(skills);
//     } else {
//       reject("Something wrong has happened");
//     }
//   }, 5000);
// })
//   .then((data) => data.map(skill => skill.toLowerCase()))
//   .then(data => data.map(skill => skill+"!"))
//   .then(data => console.log(data))
//   .catch((error) => {
//     console.log("error", error);
//   });

// function createCardElement(cardInfo) {
//   const cardDiv = document.createElement("div");
//   cardDiv.classList.add("card");

//   const imgElement = document.createElement("img");
//   imgElement.setAttribute("src", cardInfo.image);
//   imgElement.setAttribute("width", "80px");
//   imgElement.setAttribute("alt", "");

//   const titleElement = document.createElement("p");
//   titleElement.textContent = cardInfo.title;

//   const descriptionElement = document.createElement("p");
//   descriptionElement.textContent = cardInfo.description;

//   const categoryElement = document.createElement("p");
//   categoryElement.textContent = cardInfo.category;

//   const priceElement = document.createElement("p");
//   priceElement.textContent = cardInfo.price;

//   cardDiv.appendChild(imgElement);
//   cardDiv.appendChild(titleElement);
//   cardDiv.appendChild(descriptionElement);
//   cardDiv.appendChild(categoryElement);
//   cardDiv.appendChild(priceElement);

//   return cardDiv;
// }

// const url = "https://fakestoreapi.com/products";
// fetch(url)
//   .then((response) => response.json())
//   .then((data) => {
//     const cards = document.querySelector(".cards");
//     data.forEach((product) => {
//       cards.appendChild(createCardElement(product));
//     });
//   })
//   .catch((error) => {
//     const cards = document.querySelector(".cards");
//     cards.innerHTML = `<p>Error occured. Error: ${error}</p>`;
//   });

const url1 = "https://opentdb.com/api.php?amount=10&category=26";
fetch(url1)
  .then((res) => res.json())
  .then((data) => data.results)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    const cards = document.querySelector(".cards");
    cards.innerHTML = `<p>Error occured. Error: ${error}</p>`;
  });

// const doPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const skills = ["HTML", "CSS", "JS"];
//     if (skills.includes("HTML")) {
//       resolve(skills);
//     } else {
//       reject("Something wrong has happened");
//     }
//   }, 5000);
// })
//   .then((result) => {
//     return result.map((skill) => skill.toLowerCase());
//   })
//   .then((data) => {
//     return data.map((skill) => skill + "!");
//   })
//   .then((data) => data[0])
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => console.error(error));


//   function createCard(cardData) {
//     const { flag, name, capital, population } = cardData;
//     const paragraphs = [name, capital, population];
//     const cardDiv = document.createElement('div');
//     cardDiv.classList.add('card');

//     const img = document.createElement('img');
//     img.src = flag;
//     cardDiv.appendChild(img);

//     const contentDiv = document.createElement('div');
//     for (const text of paragraphs) {
//         const paragraph = document.createElement('p');
//         paragraph.textContent = text;
//         contentDiv.appendChild(paragraph);
//     }
//     cardDiv.appendChild(contentDiv);

//     return cardDiv;
// }

// const url = "https://restcountries.com/v2/all"; // countries api
// fetch(url)
//   .then((response) => response.json()) // accessing the API data as JSON
//   .then((data) => {
//     const cards = document.querySelector(".cards")
//     data.forEach(country => {
//       cards.appendChild(createCard(country))
//     })
//   })
//   .catch((error) => console.error(error));
