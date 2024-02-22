const signUpNameInput = document.querySelector(".name-signup");
const signUpNumberInput = document.querySelector(".number-signup");
const signUpPasswordInput = document.querySelector(".password-signup");
const signUpRepasswordInput = document.querySelector(".repassword-signup");
const signUpButton = document.getElementById("sign-up");
const errorBox = document.querySelector(".auth-error");

signUpButton.addEventListener("click", (e) => {
  e.preventDefault();
  signUp();
});

function signUp() {
  signUpButton.disabled = true;
  signUpButton.classList.add("inactive");
  const username = signUpNameInput.value;
  const number = signUpNumberInput.value;
  const password = signUpPasswordInput.value;
  const repassword = signUpRepasswordInput.value;

  try {
    if (number.length < 11) {
      throw new Error("Invalid number.");
    }
    if (password.length < 8) {
       throw new Error("Password must be at least 8 characters.");
    }

    if (password !== repassword) {
      throw new Error("Passwords are not identical.");
    }
  } catch (error) {
    errorBox.classList.remove("hidden");
    errorBox.firstElementChild.textContent = error.message;
    signUpButton.disabled = false;
    signUpButton.classList.remove("inactive");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart"));

  const newUser = {
    username: username,
    number: number,
    password: password,
    cart: cart || [],
    purchases: []
  };
  postUser(newUser);
}

function postUser(user) {
  fetch("https://659c067fd565feee2dac49a8.mockapi.io/shoplane/api/v1/users", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then((user) => {
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("cart", JSON.stringify(user.cart));
      window.location = "index.html";
    })
    .catch((error) => {
      errorBox.classList.remove("hidden");
      errorBox.firstElementChild.textContent = error.message;
      signUpButton.disabled = false;
      signUpButton.classList.remove("inactive");
    });
}
