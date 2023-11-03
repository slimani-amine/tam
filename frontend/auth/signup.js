import * as model from "./model.js";
const token = localStorage.getItem('token');
if (token) {
    window.location.assign('index.html');
} else {
    const form = document.querySelector('form');
    const username = document.querySelector('#username');
    const email = document.querySelector('#Email');
    const password = document.querySelector('#password');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const inputValues = {
            username: username.value,
            email: email.value,
            password: password.value
        };

        if (model.verif(email.value, password.value, username.value)) {
            await model.register(inputValues);
            alert("welcome")
        } else {
            alert("Credentials error!")
        }
    });
}
