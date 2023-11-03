import * as model from "./model.js";
const token = localStorage.getItem('token');
if (token) {
    window.location.assign('index.html');
} else {
    const form = document.querySelector('form');
    const email = document.querySelector('#Email');
    const password = document.querySelector('#password');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputValues = {
            identifier: email.value,
            password: password.value
        };


        if (model.verif(email.value, password.value)) {
            await model.login(inputValues);
        } else {
            alert("Credentials error!");
        }
        


    });
}
