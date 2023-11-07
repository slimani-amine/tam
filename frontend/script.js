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
  const noTasks = document.querySelector(".no-tasks");
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
    const dropdownContents = document.querySelectorAll(".dropdown-contents");

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
  let tasks = true;
  if (tasks) {
    listItem.classList.add("tasks-navbar-list-checked");
  } else {
    listItem.classList.add("tasks-navbar-list-checked");
    noTasks.style.display = "block";

    lists.style.display = "none";
  }
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
        } else if (item.textContent.trim() === "List") {
          lists.style.display = "block";
          columns.style.display = "none";
          timeline.style.display = "none";
        } else {
          timeline.style.display = "flex";
          columns.style.display = "none";
          lists.style.display = "none";
        }
      } else {
        noTasks.style.display = "block";
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const lists = document.querySelectorAll(".list");
    lists.forEach((list) => {
      const listDropdown1 = list.querySelector(".list-dropdown1");
      const listDropdown2 = list.querySelector(".list-dropdown2");
      const tasks = list.querySelector(".tasks");

      list.addEventListener("click", function (event) {
        if (event.target === listDropdown1 || event.target === listDropdown2) {
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
  const newProject = document.querySelector(".new-project");
  const addProject = document.querySelector(".addProject");
  const close = document.querySelector(".close");
  newProject.addEventListener("click", () => {
    addProject.style.display = "block";
  });
  close.addEventListener("click", () => {
    addProject.style.display = "none";
  });

  //add task
  const newTask = document.querySelectorAll(".list-button");
  const addTask = document.querySelector(".addTask");
  const closeAddTask = document.querySelector(".closeAddTask");
  newTask.forEach((e) => {
    e.addEventListener("click", () => {
      addTask.style.display = "block";
    });
  });

  closeAddTask.addEventListener("click", () => {
    addTask.style.display = "none";
  });

  //priority flags

const flags = document.querySelectorAll(".priority-flag");

flags.forEach((flag) => {
  const html = `<div class="flags">
  <ul style="background-color: #fff">
    <li class="flagLi" style="display: flex; justify-content: space-between; gap:5px;">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
      >
        <path
          d="M1 1V11.4286H13.7349C14.2699 11.4286 14.5374 11.4286 14.5999 11.2705C14.6624 11.1123 14.4672 10.9295 14.0767 10.5637L9.47831 6.25621C9.33225 6.11939 9.25922 6.05098 9.25922 5.96429C9.25922 5.87759 9.33225 5.80918 9.47831 5.67236L14.0767 1.36491C14.4672 0.99912 14.6624 0.816226 14.5999 0.658113C14.5374 0.5 14.2699 0.5 13.7349 0.5H1.5C1.2643 0.5 1.14645 0.5 1.07322 0.573223C1 0.646447 1 0.764298 1 1Z"
          fill="#F04438"
        />
        <path
          d="M1 11.4286V1C1 0.764298 1 0.646447 1.07322 0.573223C1.14645 0.5 1.2643 0.5 1.5 0.5H13.7349C14.2699 0.5 14.5374 0.5 14.5999 0.658113C14.6624 0.816226 14.4672 0.99912 14.0767 1.36491L9.47831 5.67236C9.33225 5.80918 9.25922 5.87759 9.25922 5.96429C9.25922 6.05098 9.33225 6.11939 9.47831 6.25621L14.0767 10.5637C14.4672 10.9295 14.6624 11.1123 14.5999 11.2705C14.5374 11.4286 14.2699 11.4286 13.7349 11.4286H1ZM1 11.4286V17.5"
          stroke="#F04438"
          stroke-linecap="round"
        />
      </svg>
      Urgent
    </li>
    <li class="flagLi" style="display: flex; justify-content: space-between ; gap:5px;">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
      >
        <path
          d="M1 1V11.4286H13.7349C14.2699 11.4286 14.5374 11.4286 14.5999 11.2705C14.6624 11.1123 14.4672 10.9295 14.0767 10.5637L9.47831 6.25621C9.33225 6.11939 9.25922 6.05098 9.25922 5.96429C9.25922 5.87759 9.33225 5.80918 9.47831 5.67236L14.0767 1.36491C14.4672 0.99912 14.6624 0.816226 14.5999 0.658113C14.5374 0.5 14.2699 0.5 13.7349 0.5H1.5C1.2643 0.5 1.14645 0.5 1.07322 0.573223C1 0.646447 1 0.764298 1 1Z"
          fill="#0BA5EC"
        />
        <path
          d="M1 11.4286V1C1 0.764298 1 0.646447 1.07322 0.573223C1.14645 0.5 1.2643 0.5 1.5 0.5H13.7349C14.2699 0.5 14.5374 0.5 14.5999 0.658113C14.6624 0.816226 14.4672 0.99912 14.0767 1.36491L9.47831 5.67236C9.33225 5.80918 9.25922 5.87759 9.25922 5.96429C9.25922 6.05098 9.33225 6.11939 9.47831 6.25621L14.0767 10.5637C14.4672 10.9295 14.6624 11.1123 14.5999 11.2705C14.5374 11.4286 14.2699 11.4286 13.7349 11.4286H1ZM1 11.4286V17.5"
          stroke="#0BA5EC"
          stroke-linecap="round"
        />
      </svg>
      Normal
    </li>
    <li  style="display: flex; justify-content: space-between ;gap:5px;">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
      >
        <path
          d="M1 1V11.4286H13.7349C14.2699 11.4286 14.5374 11.4286 14.5999 11.2705C14.6624 11.1123 14.4672 10.9295 14.0767 10.5637L9.47831 6.25621C9.33225 6.11939 9.25922 6.05098 9.25922 5.96429C9.25922 5.87759 9.33225 5.80918 9.47831 5.67236L14.0767 1.36491C14.4672 0.99912 14.6624 0.816226 14.5999 0.658113C14.5374 0.5 14.2699 0.5 13.7349 0.5H1.5C1.2643 0.5 1.14645 0.5 1.07322 0.573223C1 0.646447 1 0.764298 1 1Z"
          fill="#FFB700"
        />
        <path
          d="M1 11.4286V1C1 0.764298 1 0.646447 1.07322 0.573223C1.14645 0.5 1.2643 0.5 1.5 0.5H13.7349C14.2699 0.5 14.5374 0.5 14.5999 0.658113C14.6624 0.816226 14.4672 0.99912 14.0767 1.36491L9.47831 5.67236C9.33225 5.80918 9.25922 5.87759 9.25922 5.96429C9.25922 6.05098 9.33225 6.11939 9.47831 6.25621L14.0767 10.5637C14.4672 10.9295 14.6624 11.1123 14.5999 11.2705C14.5374 11.4286 14.2699 11.4286 13.7349 11.4286H1ZM1 11.4286V17.5"
          stroke="#FFB700"
          stroke-linecap="round"
        />
      </svg>
      High
    </li>
    <li class="flagLi" style="display: flex; justify-content: space-between ; gap:5px;">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
      >
        <path
          d="M1 1V11.4286H13.7349C14.2699 11.4286 14.5374 11.4286 14.5999 11.2705C14.6624 11.1123 14.4672 10.9295 14.0767 10.5637L9.47831 6.25621C9.33225 6.11939 9.25922 6.05098 9.25922 5.96429C9.25922 5.87759 9.33225 5.80918 9.47831 5.67236L14.0767 1.36491C14.4672 0.99912 14.6624 0.816226 14.5999 0.658113C14.5374 0.5 14.2699 0.5 13.7349 0.5H1.5C1.2643 0.5 1.14645 0.5 1.07322 0.573223C1 0.646447 1 0.764298 1 1Z"
          fill="#B8B6B6"
        />
        <path
          d="M1 11.4286V1C1 0.764298 1 0.646447 1.07322 0.573223C1.14645 0.5 1.2643 0.5 1.5 0.5H13.7349C14.2699 0.5 14.5374 0.5 14.5999 0.658113C14.6624 0.816226 14.4672 0.99912 14.0767 1.36491L9.47831 5.67236C9.33225 5.80918 9.25922 5.87759 9.25922 5.96429C9.25922 6.05098 9.33225 6.11939 9.47831 6.25621L14.0767 10.5637C14.4672 10.9295 14.6624 11.1123 14.5999 11.2705C14.5374 11.4286 14.2699 11.4286 13.7349 11.4286H1ZM1 11.4286V17.5"
          stroke="#B8B6B6"
          stroke-linecap="round"
        />
      </svg>
      Low
    </li>
  </ul>
  </div>`;
  let isFlagOpen = false;
  let flagContainer = null;

  flag.addEventListener("click", (event) => {
    event.stopPropagation(); 

    if (!isFlagOpen) {
      flag.insertAdjacentHTML("afterend", html);
      isFlagOpen = true;
      flagContainer = flag.nextElementSibling;
    } else {
      flagContainer.style.display = "none";
      isFlagOpen = false;
      flagContainer = null;
    }
  });

  document.addEventListener("click", (event) => {
    if (isFlagOpen && flagContainer && !flagContainer.contains(event.target)) {
      flagContainer.style.display = "none";
      isFlagOpen = false;
      flagContainer = null;
    }
  });
});


}
