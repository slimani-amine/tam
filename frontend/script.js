import * as model from "./auth/model.js";
import { board } from "./Views/board.js";
const token = localStorage.getItem("token");
if (!token) {
  window.location.assign("./auth/login.html");
} else {
  // const logout = document.querySelector(".logout");
  // logout.addEventListener("click", () => {
  //   console.log("hello");
  //   model.logout();
  // });
  //
  const content = document.querySelector('.content')
  const main = document.querySelector('#main')
  const listItems = document.querySelectorAll('.tasks-navbar-list');
  const listNavbarContent = document.querySelectorAll('.navbar-content-link');
  const withoutSideBar = document.querySelector('.search-icons1')
  const withSideBar = document.querySelector('.search-icons2')
  const sidebar = document.querySelector('.lists')

  //sidebar
  withoutSideBar.addEventListener('click', () => {
    sidebar.style.display = "none"
  })
  withSideBar.addEventListener('click', () => {
    sidebar.style.display = "block"
  })

  document.addEventListener("DOMContentLoaded", function () {
    const listItems = document.querySelectorAll(".list2");
    const dropdown1 = document.querySelectorAll(".dropdown1");
    const dropdown2 = document.querySelectorAll(".dropdown2");

    listItems.forEach((item, i) => {
      item.addEventListener("click", function () {
        this.classList.toggle("active");
        if (this.classList.contains("active")) {
          dropdown1[i].style.display = "none";
          dropdown2[i].style.display = "block";
        } else {
          dropdown1[i].style.display = "block";
          dropdown2[i].style.display = "none";
        }
      });
    });
  });




  //nav
  listNavbarContent.forEach((item) => {
    item.addEventListener('click', () => {
      listNavbarContent.forEach((li) => {
        li.classList.remove('navbar-content-a-clicked')
      })
      item.classList.add('navbar-content-a-clicked');
      main.style.display = "none"
      if (item.textContent.trim() === 'Tasks') {
        main.style.display = "block"
      }
    })
  })

  // tasks
  listItems.forEach((item) => {
    item.addEventListener('click', () => {
      listItems.forEach((li) => {
        li.classList.remove('tasks-navbar-list-checked')
      })
      item.classList.add('tasks-navbar-list-checked');
      content.innerHTML = ""
      if (item.textContent.trim() === 'board') {
        content.insertAdjacentHTML('beforeend', board);
      }
      else if (item.textContent.trim() === 'List') {
        content.insertAdjacentHTML('beforeend', "<div> sooon </div>");

      } else {
        content.insertAdjacentHTML('beforeend', "<div> sooon </div>");
      }

    });
  });

}
