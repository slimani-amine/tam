import * as model from "./auth/model.js";
import {
  getProjects,
  getTasks,
  pushNewProject,
  pushNewTask,
} from "./model.js";
import renderTasks from "./Views/renderTasks.js";
const token = localStorage.getItem("token");
if (!token) {
  window.location.assign("./auth/login.html");
} else {
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
  let tasksData = false;

  document.addEventListener("DOMContentLoaded", async () => {
    listItem.classList.add("tasks-navbar-list-checked");
    if (tasksData) {
      columns.style.display = "none";
      lists.style.display = "none";
      timeline.style.display = "none";
      noTasks.style.display = "block";
    }

    const listItems = document.querySelectorAll(".list2");
    const dropdown1 = document.querySelectorAll(".dropdown1");
    const dropdown2 = document.querySelectorAll(".dropdown2");
    const dropdownContents = document.querySelectorAll(".dropdown-contents");
    const allProjectContents = document.querySelector("#allProject-contents");

    const data = await getProjects();
    data &&
      data.map((project) => {
        let html = `<div class="dropdown-content" data-project-id="${project.id}">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      style="display: block"
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
    >
      <path
        d="M5.62513 11.6751V4.69382C5.62441 4.56968 5.66067 4.44814 5.7293 4.34469C5.79793 4.24124 5.8958 4.16057 6.01046 4.11296C6.12511 4.06536 6.25134 4.05298 6.37306 4.0774C6.49478 4.10181 6.60647 4.16193 6.69388 4.25007L10.1814 7.74382C10.2978 7.86092 10.3631 8.01933 10.3631 8.18445C10.3631 8.34956 10.2978 8.50797 10.1814 8.62507L6.69388 12.1188C6.60647 12.207 6.49478 12.2671 6.37306 12.2915C6.25134 12.3159 6.12511 12.3035 6.01046 12.2559C5.8958 12.2083 5.79793 12.1277 5.7293 12.0242C5.66067 11.9208 5.62441 11.7992 5.62513 11.6751Z"
        fill="#98A2B3"
      />
    </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      style="transform: rotate(-90deg)"
    >
      <path
        d="M11.1751 9.87493L4.19382 9.87493C4.06968 9.87565 3.94814 9.83939 3.84469 9.77076C3.74124 9.70213 3.66057 9.60426 3.61296 9.4896C3.56536 9.37495 3.55298 9.24872 3.5774 9.127C3.60181 9.00528 3.66193 8.8936 3.75007 8.80618L7.24382 5.31867C7.36092 5.20226 7.51933 5.13692 7.68445 5.13692C7.84956 5.13692 8.00797 5.20226 8.12507 5.31867L11.6188 8.80618C11.707 8.8936 11.7671 9.00528 11.7915 9.127C11.8159 9.24872 11.8035 9.37495 11.7559 9.4896C11.7083 9.60426 11.6277 9.70213 11.5242 9.77076C11.4208 9.83939 11.2992 9.87565 11.1751 9.87493Z"
        fill="white"
      />
    </svg>
    <img class="project-img" src=${project.url} alt="" />
    <p>${project.Name}</p>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
    >
      <g clip-path="url(#clip0_2_3352)">
        <path
          d="M4.99996 1.66667C5.46019 1.66667 5.83329 1.29357 5.83329 0.833333C5.83329 0.373096 5.46019 0 4.99996 0C4.53972 0 4.16663 0.373096 4.16663 0.833333C4.16663 1.29357 4.53972 1.66667 4.99996 1.66667Z"
          fill="white"
        />
        <path
          d="M4.99996 5.83347C5.46019 5.83347 5.83329 5.46038 5.83329 5.00014C5.83329 4.5399 5.46019 4.16681 4.99996 4.16681C4.53972 4.16681 4.16663 4.5399 4.16663 5.00014C4.16663 5.46038 4.53972 5.83347 4.99996 5.83347Z"
          fill="white"
        />
        <path
          d="M4.99996 9.99987C5.46019 9.99987 5.83329 9.62677 5.83329 9.16653C5.83329 8.70629 5.46019 8.33319 4.99996 8.33319C4.53972 8.33319 4.16663 8.70629 4.16663 9.16653C4.16663 9.62677 4.53972 9.99987 4.99996 9.99987Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_2_3352">
          <rect width="10" height="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
    <span>+</span>
      </div>`;
        allProjectContents.insertAdjacentHTML("afterbegin", html);
        const dropdownContent = document.querySelectorAll(".dropdown-content");
        let previousContent = null;

        dropdownContent.forEach((content) => {
          content.addEventListener("click", async () => {
            if (previousContent) {
              previousContent.style.background = "";
              previousContent.style.height = "";
              previousContent.style.margin = "";
            }
            content.style.background = "#986AAA";
            content.style.height = "25px";
            content.style.margin = "2px";
            content.style.marginBottom = "20px";

            previousContent = content;

            const projectId = content.getAttribute("data-project-id");
            const tasks = await getTasks(projectId);
            if (!tasks) {
              noTasks.style.display = "block";
              lists.style.display = "none";
            } else {
              tasksData = true;
              lists.style.display = "block";
              noTasks.style.display = "none";
            }
            renderTasks(tasks);
          });
        });
      });

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

  // tasks

  listItems.forEach((item) => {
    item.addEventListener("click", () => {
      columns.style.display = "none";
      lists.style.display = "none";
      timeline.style.display = "none";
      listItems.forEach((li) => {
        li.classList.remove("tasks-navbar-list-checked");
      });

      item.classList.add("tasks-navbar-list-checked");
      if (tasksData) {
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


  //sidebar +get user projects
  withoutSideBar.addEventListener("click", () => {
    sidebar.style.display = "none";
  });
  withSideBar.addEventListener("click", () => {
    sidebar.style.display = "block";
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

  //task detalis
  const taskList= document.querySelectorAll(".task");
  const taskDetails = document.querySelector(".task-details-content");
  const closeTaskDetails = document.querySelector(".Details-details");
  taskList.forEach((e) => {
    e.addEventListener("click", () => {
        taskDetails.style.display = "block";
    });
  });

  closeTaskDetails.addEventListener("click", () => {
    taskDetails.style.display = "none";
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
  const addProjectForm = document.querySelector(".addProjectForm");
  addProjectForm.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();
      const nameOfProject = document.querySelector("#nameOfProject").value;
      const urlOfProject = document.querySelector("#urlOfProject").value;
      await pushNewProject({ Name: nameOfProject, url: urlOfProject });
      location.reload();
    } catch (error) {
      console.log(err, "something wrong !");
    }
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
  const addTaskForm = document.querySelector(".addTaskForm");
  addProjectForm.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();
      const nameOfTask = document.querySelector("#nameOfTask").value;
      const descOfTask = document.querySelector("#descOfTask").value;
      await pushNewTask({ Name: nameOfTask, url: descOfTask });
      location.reload();
    } catch (error) {
      console.log(err, "something wrong !");
    }
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
      if (
        isFlagOpen &&
        flagContainer &&
        !flagContainer.contains(event.target)
      ) {
        flagContainer.style.display = "none";
        isFlagOpen = false;
        flagContainer = null;
      }
    });
  });
}