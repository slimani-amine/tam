import * as model from "./model.js";
const token = localStorage.getItem("token");
if (token) {
  window.location.assign("../index.html");
} else {
  const username = document.querySelector("#fullname");
  const email = document.querySelector("#Email");

  const phoneNumber = document.querySelector("#phoneNumber");
  const signUpButton = document.querySelector("#signUp-button");
  const form = document.querySelector("form");
  const password = document.querySelector("#password");
  const showPassword = document.querySelector("#showPassword");

  showPassword.addEventListener('click', () => {
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  })
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputValues = {
      username: username.value,
      email: email.value,
      password: password.value,
      phoneNumber: phoneNumber.value,
    };
    console.log(inputValues);
    if (model.verif(email.value, password.value, username.value)) {
      await model.register(inputValues);
      alert("welcome");
    } else {
      alert("Credentials error!");
    }
  });
}
