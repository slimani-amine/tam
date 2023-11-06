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
  const content = document.querySelector(".content");
  const main = document.querySelector("#main");
  const listItems = document.querySelectorAll(".tasks-navbar-list");
  const listItem = document.querySelector(".tasks-navbar-list");
  const listNavbarContent = document.querySelectorAll(".navbar-content-link");
  const withoutSideBar = document.querySelector(".search-icons1");
  const withSideBar = document.querySelector(".search-icons2");
  const sidebar = document.querySelector(".lists");
  const columns = document.querySelector(".columns");
  const lists = document.querySelector(".lists");
  const timeline = document.querySelector(".timeline");
  //sidebar
  withoutSideBar.addEventListener("click", () => {
    sidebar.style.display = "none";
  });
  withSideBar.addEventListener("click", () => {
    sidebar.style.display = "block";
  });

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
    item.addEventListener("click", () => {
      listNavbarContent.forEach((li) => {
        li.classList.remove("navbar-content-a-clicked");
      });
      item.classList.add("navbar-content-a-clicked");
      main.style.display = "none";
      if (item.textContent.trim() === "Tasks") {
        main.style.display = "block";
      }
    });
  });

  // tasks
  listItem.classList.add("tasks-navbar-list-checked");
  columns.style.display = "none";
  lists.style.display = "none";
  timeline.style.display = "none";
  listItems.forEach((item) => {
    item.addEventListener("click", () => {
      columns.style.display = "none";
      lists.style.display = "none";
      timeline.style.display = "none";
      listItems.forEach((li) => {
        li.classList.remove("tasks-navbar-list-checked");
      });

      item.classList.add("tasks-navbar-list-checked");

      if (item.textContent.trim() === "board") {
        columns.style.display = "flex";
        lists.style.display = "none";
        timeline.style.display = "none";
      } else if (item.textContent.trim() === "List") {
        lists.style.display = "flex";
        columns.style.display = "none";
        timeline.style.display = "none";
      } else {
        timeline.style.display = "flex";
        columns.style.display = "none";
        lists.style.display = "none";
      }
    });
  });
}
