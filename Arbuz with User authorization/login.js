const forms = document.querySelector(".forms");
const container = document.querySelector(".container");
const pwShowHide = document.querySelectorAll(".eye-icon");
const links = document.querySelectorAll(".link");
const signInNumberInput = document.querySelector(".number-signin");
const signInPasswordInput = document.querySelector(".password-signin");
const signInButton = document.getElementById("sign-in");
const signOutButton = document.getElementById("sign-out");
const accountSection = document.getElementById("account");
const errorBox = document.querySelector(".auth-error");

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

if (currentUser) {
  container.classList.add("hidden");
  accountSection.classList.remove("hidden");
} else {
  container.classList.remove("hidden");
  accountSection.classList.add("hidden");
}

pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    let pwFields =
      eyeIcon.parentElement.parentElement.querySelectorAll(".password");

    pwFields.forEach((password) => {
      if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.replace("bx-hide", "bx-show");
        return;
      }
      password.type = "password";
      eyeIcon.classList.replace("bx-show", "bx-hide");
    });
  });
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    forms.classList.toggle("show-signup");
  });
});

signInButton.addEventListener("click", (e) => {
  e.preventDefault();
  signIn();
});

signOutButton.addEventListener("click", (e) => {
  e.preventDefault();
  signOut();
});

function signIn() {
  signInButton.disabled = true;
  signInButton.classList.add("inactive");
  const number = signInNumberInput.value;
  const password = signInPasswordInput.value;

  try {
    if (number.length < 11) {
      throw new Error("Invalid number.");
    }
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters.");
    }
  } catch (error) {
    errorBox.classList.remove("hidden");
    errorBox.firstElementChild.textContent = error.message;
    signInButton.disabled = false;
    signInButton.classList.remove("inactive");
    return;
  }

  const user = { number: number, password: password };
  authenticateUser(user);
}

async function authenticateUser(user) {
  const url = new URL(
    "https://659c067fd565feee2dac49a8.mockapi.io/shoplane/api/v1/users"
  );
  url.searchParams.append("number", user.number);

  try {
    const usersResponse = await fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    console.log(usersResponse.ok)
    if (!usersResponse.ok) throw new Error(usersResponse.statusText);
    const users = await usersResponse.json();
    let currentUser = users[0];
    if (currentUser.password === user.password) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("cart", JSON.stringify(currentUser.cart));
      window.location = "index.html";
    } else {
      throw new Error("Invalid password.");
    }
  } catch (error) {
    errorBox.classList.remove("hidden");
    errorBox.firstElementChild.textContent = error.message;
    signInButton.disabled = false;
    signInButton.classList.remove("inactive");
  }
}

function signOut() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("cart");
  window.location = "index.html";
}
