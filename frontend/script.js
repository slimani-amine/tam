import * as model from "./auth/model.js";
const token = localStorage.getItem("token");
if (!token) {
  window.location.assign("./auth/login.html");
} else {
  const content = document.querySelector(".content");
  const main = document.querySelector("#main");
  const listItems = document.querySelectorAll(".tasks-navbar-list");
  const listItem = document.querySelector(".tasks-navbar-list");
  const listNavbarContent = document.querySelectorAll(".navbar-content-link");
  const listNavbar = document.querySelector(".navbar-content-link");
  const withoutSideBar = document.querySelector(".search-icons1");
  const withSideBar = document.querySelector(".search-icons2");
  const sidebar = document.querySelector(".lists1");
  const columns = document.querySelector(".columns");
  const lists = document.querySelector(".lists");
  const timeline = document.querySelector(".timeline");
  const noTasks = document.querySelector('.no-tasks')
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
    const dropdownContents = document.querySelectorAll('.dropdown-contents');

    listItems.forEach((item, i) => {
      item.addEventListener("click", function () {
        this.classList.toggle("active");
        if (this.classList.contains("active")) {
          dropdown1[i].style.display = "none";
          dropdown2[i].style.display = "block";
          dropdownContents[i].style.display = "block";
        } else {
          dropdown1[i].style.display = "block";
          dropdown2[i].style.display = "none";
          dropdownContents[i].style.display = "none";
        }
      });
    });
  });


  //nav
  listNavbar.classList.add("navbar-content-a-clicked");
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
  let tasks = true
  listItem.classList.add("tasks-navbar-list-checked");

  listItems.forEach((item) => {
    item.addEventListener("click", () => {
      columns.style.display = "none";
      lists.style.display = "none";
      timeline.style.display = "none";
      listItems.forEach((li) => {
        li.classList.remove("tasks-navbar-list-checked");
      });

      item.classList.add("tasks-navbar-list-checked");
      if (tasks) {
        if (item.textContent.trim() === "board") {
          columns.style.display = "flex";
          lists.style.display = "none";
          timeline.style.display = "none";
        }
        else if (item.textContent.trim() === "List") {
          lists.style.display = "block";
          columns.style.display = "none";
          timeline.style.display = "none";
        } else {
          timeline.style.display = "flex";
          columns.style.display = "none";
          lists.style.display = "none";
        }
      }
      else {
        noTasks.style.display = "block"
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const lists = document.querySelectorAll(".list");

    lists.forEach((list) => {
      const listDropdown1 = list.querySelector(".list-dropdown1");
      const listDropdown2 = list.querySelector(".list-dropdown2");
      const tasks = list.querySelector('.tasks');
      list.addEventListener("click", function () {
        list.classList.toggle("active");
        if (list.classList.contains("active")) {
          listDropdown1.style.display = "none";
          listDropdown2.style.display = "block";
          tasks.style.display = "none";
        } else {
          listDropdown1.style.display = "block";
          listDropdown2.style.display = "none";
          tasks.style.display = "block";
        }
      });
    });
  });


  // avatar and logout
  document.addEventListener("DOMContentLoaded", function () {
    const avatarImg = document.getElementById("avatar-img");
    const avatarDropdown = document.getElementById("avatar-dropdown");
    const logoutButton = document.getElementById("logout-button");

    avatarImg.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleDropdown();
    });

    document.addEventListener("click", function () {
      hideDropdown();
    });

    avatarDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    logoutButton.addEventListener("click", function () {
      model.logout();
      hideDropdown();
    });

    function toggleDropdown() {
      const dropdown = avatarDropdown.querySelector("ul");
      if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
      } else {
        dropdown.style.display = "block";
      }
    }

    function hideDropdown() {
      const dropdown = avatarDropdown.querySelector("ul");
      dropdown.style.display = "none";
    }
  });

  //add project 
  const newProject = document.querySelector('.new-project')
  const addProject = document.querySelector('.addProject')
  const close = document.querySelector('.close')
  newProject.addEventListener('click', () => {
    addProject.style.display = "block"
  })
  close.addEventListener('click', () => {
    addProject.style.display = "none"
  })


  //add task 
  const newTask = document.querySelectorAll('.list-button')
  const addTask = document.querySelector('.addTask')
  const closeAddTask = document.querySelector('.closeAddTask')
  newTask.forEach((e) => {
    e.addEventListener('click', () => {
      addTask.style.display = "block"
    })
  })

  closeAddTask.addEventListener('click', () => {
    addTask.style.display = "none"
  })



}
