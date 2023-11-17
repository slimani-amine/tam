import * as model from "./model.js";
import { loader } from "../Views/loader.js";
const token = localStorage.getItem("token");
if (token) {
  window.location.assign("index.html");
} else {
  
  const form = document.querySelector("form");
  const email = document.querySelector("#Email");
  const password = document.querySelector("#password");
  const loginButton = document.querySelector("#login-button");
  loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const inputValues = {
      identifier: email.value,
      password: password.value,
    };
    if (model.verif(email.value, password.value)) {
      await model.login(inputValues);
    } else {
      alert("Credentials error!");
    }
  });
}
