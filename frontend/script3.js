import * as model from "./auth/model.js";
import {
  getUser,
  getProjects,
  getTasks,
  pushNewProject,
  pushNewTask,
  changeTask,
  deleteTask,
  getProject,
  getUsers,
  deleteProject,
  getTags,
  getTask,
  changeTags,
  pushNewComment,
} from "./model.js";
import renderTasks from "./Views/renderTasks.js";
import { dragAndDrop } from "./Views/dragAndDrop.js"
import { taskDetail } from "./Views/taskDetails.js"
import { loader } from "./Views/loader.js";
import { countTasksStatus } from "./Views/countTasksStatus.js"
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
  let selectedProjectId = 0
  const userId = localStorage.getItem("userId");
  document.addEventListener("DOMContentLoaded", async () => {
    listItem.classList.add("tasks-navbar-list-checked");
    if (tasksData) {
      columns.style.display = "none";
      lists.style.display = "none";
      timeline.style.display = "none";
      noTasks.style.display = "block";
    }
    // avatar 
    const userId = localStorage.getItem("userId");
    const userData = await getUser(userId)
    const avatar = document.querySelector("#avatar-img")
    userData.avatar ? avatar.setAttribute("src", `http://localhost:1337${userData.avatar.url}`) : avatar.setAttribute("src", `https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png`)

    // render projects 

    const allProjectContents = document.querySelector("#allProject-contents");
    let i = 0
    const data = await getProjects();
    console.log(data, "data");
    data.map((project) => {
      let html = `<div class="dropdown-content" data-project-id="${project.id}">
        <div class="drop-content">  
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

    <img class="project-img" src=${project.url} alt="" />
    <p style="" >${project.Name}</p>
    </div>
    <div >  
    <svg class="otherPoint" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
  <g clip-path="url(#clip0_2_3352)">
    <path d="M4.99996 1.66667C5.46019 1.66667 5.83329 1.29357 5.83329 0.833333C5.83329 0.373096 5.46019 0 4.99996 0C4.53972 0 4.16663 0.373096 4.16663 0.833333C4.16663 1.29357 4.53972 1.66667 4.99996 1.66667Z" fill="white"/>
    <path d="M4.99996 5.83347C5.46019 5.83347 5.83329 5.46038 5.83329 5.00014C5.83329 4.5399 5.46019 4.16681 4.99996 4.16681C4.53972 4.16681 4.16663 4.5399 4.16663 5.00014C4.16663 5.46038 4.53972 5.83347 4.99996 5.83347Z" fill="white"/>
    <path d="M4.99996 9.99987C5.46019 9.99987 5.83329 9.62677 5.83329 9.16653C5.83329 8.70629 5.46019 8.33319 4.99996 8.33319C4.53972 8.33319 4.16663 8.70629 4.16663 9.16653C4.16663 9.62677 4.53972 9.99987 4.99996 9.99987Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_2_3352">
      <rect width="10" height="10" fill="white"/>
    </clipPath>
  </defs>
</svg>
<div class="otherParams" ></div>
    <span>+</span>
    </div>
        </div>`;
      allProjectContents.insertAdjacentHTML("beforeend", html);
    })





    //render tasks
    const listItems = document.querySelectorAll(".list2");
    const dropdown1 = document.querySelectorAll(".dropdown1");
    const dropdown2 = document.querySelectorAll(".dropdown2");
    const dropdownContents = document.querySelectorAll(".dropdown-contents");
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
        selectedProjectId = projectId
        localStorage.setItem('projectId', JSON.stringify(projectId))
        const id = JSON.parse(localStorage.getItem('projectId'))
        if (id) {
          localStorage.removeItem('projectId')
          localStorage.setItem('projectId', JSON.stringify(projectId))
        } else {
          localStorage.setItem('projectId', JSON.stringify(projectId))
        }
        const tasks = await getTasks(projectId);
        if (!tasks) {
          noTasks.style.display = "block";
          lists.style.display = "none";
        } else {
          tasksData = true;
          noTasks.style.display = "none";
          i++
          if (i === 1) {
            lists.style.display = "block";
          }
        }

        // project name
        const selectedProject = await getProject(selectedProjectId)
        const projectName = document.querySelector('.projectName')
        projectName.innerHTML = selectedProject.Name

        //numbers of tasks :
        const taskNumbers = countTasksStatus(tasks)
        const newRequestNumber = document.querySelector("#new-requestNumber")
        const inprogressNumber = document.querySelector("#in-progressNumber")
        const tobetestedNumber = document.querySelector("#to-be-testedNumber")
        const completedNumber = document.querySelector("#completedNumber")
        newRequestNumber.innerHTML = taskNumbers.newRequest
        inprogressNumber.innerHTML = taskNumbers.inProgress
        tobetestedNumber.innerHTML = taskNumbers.toBeTested
        completedNumber.innerHTML = taskNumbers.completed

        //render tasks 

        renderTasks(tasks);

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
        if (item.textContent.trim() === "Board") {
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

  //sidebar 
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
      const result = await pushNewProject({ Name: nameOfProject, url: urlOfProject });
      location.reload();
    } catch (error) {
      console.error(error, "something wrong!");
    }
  });
  //add task
  const newTask = document.querySelectorAll(".list-button");
  const addTask = document.querySelector(".addTask");
  const closeAddTask = document.querySelector(".closeAddTask");
  const noTasksButton = document.querySelector('.no-tasks-button')
  const columnaddtask = document.querySelectorAll('.addtask')
  newTask.forEach((e) => {
    e.addEventListener("click", () => {
      addTask.style.display = "block";
    });
  });
  columnaddtask.forEach((e) => {
    e.addEventListener("click", () => {
      addTask.style.display = "block";
    });
  });
  noTasksButton.addEventListener("click", () => {
    addTask.style.display = "block";
  });
  closeAddTask.addEventListener("click", () => {
    addTask.style.display = "none";
  });
  const addTaskForm = document.querySelector(".addTaskForm");
  addTaskForm.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();
      const nameOfTask = document.querySelector("#nameOfTask").value;
      const descOfTask = document.querySelector("#descOfTask").value;
      const statusOfTask = document.querySelector(".addTask-select").value;
      await pushNewTask({ title: nameOfTask, description: descOfTask, status: statusOfTask }, selectedProjectId);
      const tasks = await getTasks(selectedProjectId);
      renderTasks(tasks);
      addTask.style.display = "none";
      const taskNumbers = countTasksStatus(tasks)
      const newRequestNumber = document.querySelector("#new-requestNumber")
      const inprogressNumber = document.querySelector("#in-progressNumber")
      const tobetestedNumber = document.querySelector("#to-be-testedNumber")
      const completedNumber = document.querySelector("#completedNumber")
      newRequestNumber.innerHTML = taskNumbers.newRequest
      inprogressNumber.innerHTML = taskNumbers.inProgress
      tobetestedNumber.innerHTML = taskNumbers.toBeTested
      completedNumber.innerHTML = taskNumbers.completed
    } catch (error) {
      console.log(error, "something wrong !");
    }
  });

  //assignee projects : 

  const projectsRelations = document.querySelector(".projects-relations");

  projectsRelations.addEventListener("click", async (e) => {
    let users = await getUsers();
    const selectedProject = await getProject(selectedProjectId)
    const usersAssignee = selectedProject.users.data
    let userAssData = [];
    if (usersAssignee) {
      await Promise.all(usersAssignee.map(async (e) => {
        let user = await getUser(e.id);
        userAssData.push(user);
      }));
    }
    console.log(users);
    users = users && users.filter((user) => {
      if (!usersAssignee.some(userAss => userAss.id === user.id)) {
        return user;
      }
      return null;
    });

    console.log(users, "users");
    let html = `
            <div class="search-assignee">
                <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17"
                    fill="none">
                    <path
                        d="M7.33333 14.3333C3.74667 14.3333 0.833333 11.42 0.833333 7.83331C0.833333 4.24665 3.74667 1.33331 7.33333 1.33331C10.92 1.33331 13.8333 4.24665 13.8333 7.83331C13.8333 11.42 10.92 14.3333 7.33333 14.3333ZM7.33333 2.33331C4.3 2.33331 1.83333 4.79998 1.83333 7.83331C1.83333 10.8666 4.3 13.3333 7.33333 13.3333C10.3667 13.3333 12.8333 10.8666 12.8333 7.83331C12.8333 4.79998 10.3667 2.33331 7.33333 2.33331Z"
                        fill="#374957" />
                    <path
                        d="M13.44 15.6933C13.3867 15.6933 13.3333 15.6867 13.2867 15.68C12.9733 15.64 12.4067 15.4267 12.0867 14.4733C11.92 13.9733 11.98 13.4733 12.2533 13.0933C12.5267 12.7133 12.9867 12.5 13.5133 12.5C14.1933 12.5 14.7267 12.76 14.9667 13.22C15.2067 13.68 15.14 14.2667 14.76 14.8333C14.2867 15.5467 13.7733 15.6933 13.44 15.6933ZM13.04 14.16C13.1533 14.5067 13.3133 14.68 13.42 14.6933C13.5267 14.7067 13.7267 14.58 13.9333 14.28C14.1267 13.9933 14.14 13.7867 14.0933 13.6933C14.0467 13.6 13.86 13.5 13.5133 13.5C13.3067 13.5 13.1533 13.5667 13.0667 13.68C12.9867 13.7933 12.9733 13.9667 13.04 14.16Z"
                        fill="#374957" />
                </svg>
                <input class="search-input-assignee" type="text" placeholder="Search ..." />
            </div>
            <div class="assignee-content">
                <p style="color="#374957" >Personnes assignees </p>
                <ul class="profiles">
                ${userAssData && userAssData.map((user) => {
      return `<li class="profileList">
                            <div class="profileList-name-assignee"  style="display:flex; align-items:center">
                            <img class="avatar-assignee" src="http://localhost:1337${user.avatar.url}" alt="">
                            <p>${user.id !== localStorage.getItem("userId") * 1 ? user.username : 'You'}</p>
                            </div>
                            <svg class="delete-assignee" id="${user.id}" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 10 10" fill="none">
  <path d="M5 9.47915C2.52916 9.47915 0.520828 7.47081 0.520828 4.99998C0.520828 2.52915 2.52916 0.520813 5 0.520813C7.47083 0.520813 9.47916 2.52915 9.47916 4.99998C9.47916 7.47081 7.47083 9.47915 5 9.47915ZM5 1.14581C2.87499 1.14581 1.14583 2.87498 1.14583 4.99998C1.14583 7.12498 2.87499 8.85415 5 8.85415C7.125 8.85415 8.85416 7.12498 8.85416 4.99998C8.85416 2.87498 7.125 1.14581 5 1.14581Z" fill="#374957"/>
  <path d="M3.82083 6.49169C3.74166 6.49169 3.66249 6.46252 3.59999 6.40002C3.47916 6.27919 3.47916 6.07919 3.59999 5.95836L5.95833 3.60002C6.07916 3.47919 6.27916 3.47919 6.39999 3.60002C6.52083 3.72086 6.52083 3.92086 6.39999 4.04169L4.04166 6.40002C3.98333 6.46252 3.89999 6.49169 3.82083 6.49169Z" fill="#374957"/>
  <path d="M6.17916 6.49169C6.09999 6.49169 6.02083 6.46252 5.95833 6.40002L3.59999 4.04169C3.47916 3.92086 3.47916 3.72086 3.59999 3.60002C3.72083 3.47919 3.92083 3.47919 4.04166 3.60002L6.39999 5.95836C6.52083 6.07919 6.52083 6.27919 6.39999 6.40002C6.33749 6.46252 6.25833 6.49169 6.17916 6.49169Z" fill="#374957"/>
</svg>
                          </li>`;
    })}
              </ul>
              

  <p style="color="#374957" >Personnes </p>
<ul class="profiles">
  ${users && users.map((user) => {
      return `<li class="profileList" >
      <div class="profileList-name" id="${user.id}" style="display:flex; align-items:center">
        <img class="avatar-assignee" src="http://localhost:1337${user.avatar.url}" alt="">
        <p>${user.username}</p>
        </div>
      </li>`;
    })}
</ul>
            </div >
  `
    const container = document.createElement('div');
    container.classList.add('assignee');
    container.innerHTML = html;
    const profileList = container.querySelectorAll(".profileList-name");
    profileList.forEach((item) => {
      item.addEventListener("click", async (event) => {
        const idOfNewAssignee = item.getAttribute("id")
        const newProjectData = await getProject(selectedProjectId)
        console.log(newProjectData, "newProjectData");
        console.log(idOfNewAssignee, "idOfNewAssignee");
        const pushProject = await pushNewProject({
          Name: newProjectData.Name,
          createdAt: newProjectData.createdAt,
          publishedAt: newProjectData.publishedAt,
          updatedAt: newProjectData.updatedAt,
          url: newProjectData.url
        }, idOfNewAssignee, selectedProjectId)
      });
    });

    const list = document.querySelector('.projects-relations-lists');
    list.appendChild(container);
    const deleteAss = document.querySelectorAll('.delete-assignee')
    deleteAss.forEach((e) => {
      e.addEventListener('click', async (item) => {
        const idOfAss = e.getAttribute('id')
        const nameOfAss = e.parentElement.children[0].children[1].innerHTML
        console.log(nameOfAss, "jhgf");
        console.log(idOfAss, "idOfAss");
        if (idOfAss === userId) {
          if (confirm('Are you sure to sort from your project ?')) {
            const deleteProjectAss = await deleteProject(selectedProjectId)
            location.reload()
          }
        } else {
          if (confirm(`Are you sure to delete ${nameOfAss}`)) {
            const deleteProjectAss = await deleteProject(selectedProjectId)
            location.reload()
          }
          const deleteProjectAss = await deleteProject(selectedProjectId)
        }

      })
    })
  });

  document.addEventListener('click', (event) => {
    const isClickInsideList = event.target.closest('.assignee');
    const isClickInside = event.target.closest('.profileList-name');
    if (!isClickInsideList && !isClickInside) {
      const allLists = document.querySelectorAll('.assignee');
      allLists.forEach((list) => {
        list.style.display = 'none';
      });
    }
  });

  //drag and drop 
    const draggables = document.querySelectorAll(".column-task");
    const draggables2 = document.querySelectorAll(".task");
    const droppables = document.querySelectorAll(".column");
    const droppables2 = document.querySelectorAll(".list");

    dragAndDrop(draggables, draggables2, droppables, droppables2)

  //  task detalis
  const taskTitle = document.querySelectorAll(".task-title");
  const taskDetails = document.querySelector(".task-details");
  let task = ""
  taskTitle.forEach((e) => {
    e.addEventListener("click", async () => {
      const taskId = e.parentElement.parentElement.getAttribute('data-task-id');
      const html = await taskDetail(taskId, selectedProjectId)
      taskDetails.style.display = "block";
      const div = document.createElement('div');
      div.classList.add("modalTask-details");
      taskDetails.appendChild(div);
      div.innerHTML = html;
      task = await getTask(taskId)
    })
    
    // Task details operations 

    let detailsData = {
      newTitle: "",
      newDesc: "",
      newStatus: "",
      newFlag: "",
      deadline: "",
      tags: task.tags.data
    }

    // status
    const taskDetailsStatus = document.querySelector(".dropdown-trigger");
    taskDetailsStatus && taskDetailsStatus.addEventListener('click', () => {
      let hrml = `<ul class="status-list">
              <li class="statusLi" >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                <circle cx="6" cy="6.5" r="6" fill="#C5C5C5"/>
              </svg>
              new request
              </li>
              <li class="statusLi" >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
              <circle cx="6" cy="6.5" r="6" fill="#FFA948"/>
            </svg>
              in progress
              </li>
              <li class="statusLi" >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
              <circle cx="6" cy="6.5" r="6" fill="#0BA5EC"/>
            </svg>
              to be tested
              </li>
              <li class="statusLi" >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
              <circle cx="6" cy="6.5" r="6" fill="#3DD455"/>
            </svg>
              completed
              </li>
              </ul>`
      const container = document.createElement('div');
      container.innerHTML = hrml;
      const statusLi = container.querySelectorAll(".statusLi");
      statusLi.forEach((item) => {
        item.addEventListener("click", async (event) => {
          detailsData.newStatus = item.textContent.trim();
          let lastStatus = item.parentElement.parentElement.parentElement.parentElement
          lastStatus.children[1].innerHTML = detailsData.newStatus
          let colorClass = ""
          if (detailsData.newStatus === 'new request') {
            colorClass = 'gray'
          } else if (detailsData.newStatus === 'in progress') {
            colorClass = 'orange'
          } else if (detailsData.newStatus === 'to be tested') {
            colorClass = 'blue'
          } else if (detailsData.newStatus === 'completed') {
            colorClass = 'green'
          }
          let lastcolorClass = lastStatus.getAttribute('class').split(" ")[1]
          lastStatus.classList.remove(lastcolorClass)
          lastStatus.classList.add(colorClass)
        });
      });

      const statusList = document.querySelector('.status-lists')
      statusList.appendChild(container);
    })
    document.addEventListener('click', (event) => {
      const isClickInsideOtherList = event.target.closest('.statusLi');
      const isClickInsideOther = event.target.closest('.dropdown-trigger');
      if (!isClickInsideOtherList && !isClickInsideOther) {
        const allOtherLists = document.querySelectorAll('.statusLi');
        allOtherLists.forEach((list) => {
          list.style.display = 'none';
        });
      }
    });

    // flag
    const flag = document.querySelector(".task-details-content-header-priorityflag");
    flag.addEventListener("click", (event) => {
      let html = `
<ul class="flag-list" style=" background-color: #fff">
<li class="flagLi" style="display: flex; justify-content: space-between; gap:5px;">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
<path
d="M1 1V11.4286H13.7349C14.2699 11.4286 14.5374 11.4286 14.5999 11.2705C14.6624 11.1123 14.4672 10.9295 14.0767 10.5637L9.47831 6.25621C9.33225 6.11939 9.25922 6.05098 9.25922 5.96429C9.25922 5.87759 9.33225 5.80918 9.47831 5.67236L14.0767 1.36491C14.4672 0.99912 14.6624 0.816226 14.5999 0.658113C14.5374 0.5 14.2699 0.5 13.7349 0.5H1.5C1.2643 0.5 1.14645 0.5 1.07322 0.573223C1 0.646447 1 0.764298 1 1Z"
fill="#F04438" />
<path
d="M1 11.4286V1C1 0.764298 1 0.646447 1.07322 0.573223C1.14645 0.5 1.2643 0.5 1.5 0.5H13.7349C14.2699 0.5 14.5374 0.5 14.5999 0.658113C14.6624 0.816226 14.4672 0.99912 14.0767 1.36491L9.47831 5.67236C9.33225 5.80918 9.25922 5.87759 9.25922 5.96429C9.25922 6.05098 9.33225 6.11939 9.47831 6.25621L14.0767 10.5637C14.4672 10.9295 14.6624 11.1123 14.5999 11.2705C14.5374 11.4286 14.2699 11.4286 13.7349 11.4286H1ZM1 11.4286V17.5"
stroke="#F04438" stroke-linecap="round" />
</svg>
urgent
</li>
<li class="flagLi" style="display: flex; justify-content: space-between ; gap:5px;">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
<path
d="M1 1V11.4286H13.7349C14.2699 11.4286 14.5374 11.4286 14.5999 11.2705C14.6624 11.1123 14.4672 10.9295 14.0767 10.5637L9.47831 6.25621C9.33225 6.11939 9.25922 6.05098 9.25922 5.96429C9.25922 5.87759 9.33225 5.80918 9.47831 5.67236L14.0767 1.36491C14.4672 0.99912 14.6624 0.816226 14.5999 0.658113C14.5374 0.5 14.2699 0.5 13.7349 0.5H1.5C1.2643 0.5 1.14645 0.5 1.07322 0.573223C1 0.646447 1 0.764298 1 1Z"
fill="#0BA5EC" />
<path
d="M1 11.4286V1C1 0.764298 1 0.646447 1.07322 0.573223C1.14645 0.5 1.2643 0.5 1.5 0.5H13.7349C14.2699 0.5 14.5374 0.5 14.5999 0.658113C14.6624 0.816226 14.4672 0.99912 14.0767 1.36491L9.47831 5.67236C9.33225 5.80918 9.25922 5.87759 9.25922 5.96429C9.25922 6.05098 9.33225 6.11939 9.47831 6.25621L14.0767 10.5637C14.4672 10.9295 14.6624 11.1123 14.5999 11.2705C14.5374 11.4286 14.2699 11.4286 13.7349 11.4286H1ZM1 11.4286V17.5"
stroke="#0BA5EC" stroke-linecap="round" />
</svg>
normal
</li>
<li class="flagLi" style="display: flex; justify-content: space-between ;gap:5px;">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
<path
d="M1 1V11.4286H13.7349C14.2699 11.4286 14.5374 11.4286 14.5999 11.2705C14.6624 11.1123 14.4672 10.9295 14.0767 10.5637L9.47831 6.25621C9.33225 6.11939 9.25922 6.05098 9.25922 5.96429C9.25922 5.87759 9.33225 5.80918 9.47831 5.67236L14.0767 1.36491C14.4672 0.99912 14.6624 0.816226 14.5999 0.658113C14.5374 0.5 14.2699 0.5 13.7349 0.5H1.5C1.2643 0.5 1.14645 0.5 1.07322 0.573223C1 0.646447 1 0.764298 1 1Z"
fill="#FFB700" />
<path
d="M1 11.4286V1C1 0.764298 1 0.646447 1.07322 0.573223C1.14645 0.5 1.2643 0.5 1.5 0.5H13.7349C14.2699 0.5 14.5374 0.5 14.5999 0.658113C14.6624 0.816226 14.4672 0.99912 14.0767 1.36491L9.47831 5.67236C9.33225 5.80918 9.25922 5.87759 9.25922 5.96429C9.25922 6.05098 9.33225 6.11939 9.47831 6.25621L14.0767 10.5637C14.4672 10.9295 14.6624 11.1123 14.5999 11.2705C14.5374 11.4286 14.2699 11.4286 13.7349 11.4286H1ZM1 11.4286V17.5"
stroke="#FFB700" stroke-linecap="round" />
</svg>
high
</li>
<li class="flagLi" style="display: flex; justify-content: space-between ; gap:5px;">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
<path
d="M1 1V11.4286H13.7349C14.2699 11.4286 14.5374 11.4286 14.5999 11.2705C14.6624 11.1123 14.4672 10.9295 14.0767 10.5637L9.47831 6.25621C9.33225 6.11939 9.25922 6.05098 9.25922 5.96429C9.25922 5.87759 9.33225 5.80918 9.47831 5.67236L14.0767 1.36491C14.4672 0.99912 14.6624 0.816226 14.5999 0.658113C14.5374 0.5 14.2699 0.5 13.7349 0.5H1.5C1.2643 0.5 1.14645 0.5 1.07322 0.573223C1 0.646447 1 0.764298 1 1Z"
fill="#B8B6B6" />
<path
d="M1 11.4286V1C1 0.764298 1 0.646447 1.07322 0.573223C1.14645 0.5 1.2643 0.5 1.5 0.5H13.7349C14.2699 0.5 14.5374 0.5 14.5999 0.658113C14.6624 0.816226 14.4672 0.99912 14.0767 1.36491L9.47831 5.67236C9.33225 5.80918 9.25922 5.87759 9.25922 5.96429C9.25922 6.05098 9.33225 6.11939 9.47831 6.25621L14.0767 10.5637C14.4672 10.9295 14.6624 11.1123 14.5999 11.2705C14.5374 11.4286 14.2699 11.4286 13.7349 11.4286H1ZM1 11.4286V17.5"
stroke="#B8B6B6" stroke-linecap="round" />
</svg>
low
</li>
</ul>
`
      const container = document.createElement('div');
      container.innerHTML = html;
      const listItems = container.querySelectorAll(".flagLi");
      listItems.forEach((item) => {
        item.addEventListener("click", async (event) => {
          detailsData.newFlag = item.textContent.trim();
          let lastFlag = item.parentElement.parentElement.parentElement.parentElement.children[3]

          lastFlag.children[1].innerHTML = detailsData.newFlag
          let colorClass = ""
          if (detailsData.newFlag === 'urgent') {
            colorClass = 'priority-flag-red'
          } else if (detailsData.newFlag === 'normal') {
            colorClass = 'priority-flag-blue'
          } else if (detailsData.newFlag === 'high') {
            colorClass = 'priority-flag-yellow'
          } else if (detailsData.newFlag === 'low') {
            colorClass = 'priority-flag-gray'
          }
          let lastcolorClass = lastFlag.children[0].getAttribute('class').split(" ")[1]
          lastFlag.children[0].classList.remove(lastcolorClass)
          lastFlag.children[0].classList.add(colorClass)
        });
      });

      const flagsList = flag.nextElementSibling;
      flagsList.appendChild(container);
    });

    document.addEventListener('click', (event) => {
      const isClickInsideFlagList = event.target.closest('.flag-list');
      const isClickInsideFlag = event.target.closest('.priority-flag');
      if (!isClickInsideFlagList && !isClickInsideFlag) {
        const allFlagLists = document.querySelectorAll('.flag-list');
        allFlagLists.forEach((list) => {
          list.style.display = 'none';
        });
      }
    });

    //deadline 
    const time = document.querySelector('.time')
    time.addEventListener("click", () => {
      let html = `
    <div class="date-lists">
      <input class="chooseDate" type="date" />
    </div>
  `
      const container = document.createElement('div');
      container.innerHTML = html;
      const date = container.querySelector(".chooseDate");

      const deadline = document.querySelector('.deadline')

      date.addEventListener("change", () => {
        deadline.innerHTML = date.value;
        detailsData.deadline = date.value
      });

      const dateList = document.querySelector('.date-list');
      dateList.appendChild(container);
    });

    //add comment
    const comment = document.querySelector('.comment-input')
    const commentBtn = document.querySelector('.comment-button')
    commentBtn && commentBtn.addEventListener('click', async (e) => {
      const comments = document.querySelector('.comments')
      comments.insertAdjacentHTML('afterend', comment.value)
      const newComment = await pushNewComment(taskId, comment.value)

    })

    document.addEventListener('click', (event) => {
      const isClickInsideTime = event.target.closest('.time');
      const isClickInsideContainer = event.target.closest('.date-lists');
      const closeButton = document.querySelector('.closeButton');

      if (!isClickInsideTime && !isClickInsideContainer) {
        const allContainers = document.querySelectorAll('.date-lists');
        allContainers.forEach((container) => {
          container.remove();
        });
      }
    });

    //choose tags
    const chooseTags = document.querySelector('.choose-tags')

    console.log(tags, 'tags')
    chooseTags.addEventListener('click', async () => {
      
      let html = `
                  <div class="group">
                      <svg class="inputIcon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <g clip-path="url(#clip0_964_2444)">
                          <path d="M11.9333 2.65711L7.28358 0.073524C7.19687 0.0253056 7.0993 0 7.00008 0C6.90087 0 6.80329 0.0253056 6.71658 0.073524L2.06683 2.65711C1.79407 2.80865 1.56678 3.03037 1.40853 3.2993C1.25027 3.56822 1.16679 3.87457 1.16675 4.18661V11.0834C1.16767 11.8566 1.47526 12.598 2.02204 13.1447C2.56882 13.6915 3.31015 13.9991 4.08341 14H9.91675C10.69 13.9991 11.4313 13.6915 11.9781 13.1447C12.5249 12.598 12.8325 11.8566 12.8334 11.0834V4.18661C12.8334 3.87457 12.7499 3.56822 12.5916 3.2993C12.4334 3.03037 12.2061 2.80865 11.9333 2.65711ZM11.6667 11.0834C11.6667 11.5475 11.4824 11.9926 11.1542 12.3208C10.826 12.649 10.3809 12.8334 9.91675 12.8334H4.08341C3.61929 12.8334 3.17417 12.649 2.84598 12.3208C2.51779 11.9926 2.33341 11.5475 2.33341 11.0834V4.18661C2.33316 4.08226 2.36089 3.97975 2.41373 3.88977C2.46657 3.79979 2.54258 3.72563 2.63383 3.67502L7.00008 1.25069L11.3669 3.67502C11.4581 3.72571 11.5339 3.7999 11.5867 3.88988C11.6394 3.97985 11.6671 4.08232 11.6667 4.18661V11.0834Z" fill="#8DA5B8"/>
                          <path d="M7 4.9585C7.48325 4.9585 7.875 4.56675 7.875 4.0835C7.875 3.60025 7.48325 3.2085 7 3.2085C6.51675 3.2085 6.125 3.60025 6.125 4.0835C6.125 4.56675 6.51675 4.9585 7 4.9585Z" fill="#8DA5B8"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_964_2444">
                            <rect width="14" height="14" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                      <input class="inputField" type="text" placeholder="Type new tag" />
                  </div>
                <div class="tags-content">
                      <p class="choose-tag-p" >Select a tag or create one </p>
                      <ul class="tag-profiles">
                      ${tags && tags.map((tag) => {
        return `<li class="tagList" id=${tag.id}>
                    <div class="tag-name"  style="display:flex; align-items:center">
                    <svg style="margin-right:1%;" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <path d="M2.93377 7.83163C3.50383 5.40138 5.40138 3.50383 7.83163 2.93377C9.58672 2.52208 11.4133 2.52208 13.1684 2.93377C15.5986 3.50383 17.4962 5.40138 18.0662 7.83163C18.4779 9.58672 18.4779 11.4133 18.0662 13.1684C17.4962 15.5986 15.5986 17.4962 13.1684 18.0662C11.4133 18.4779 9.58672 18.4779 7.83163 18.0662C5.40138 17.4962 3.50383 15.5986 2.93377 13.1684C2.52208 11.4133 2.52208 9.58672 2.93377 7.83163Z" fill="#CCEAFF" stroke="#0095FF" stroke-width="1.5"/>
                    <path d="M8.09375 10.2812L9.84375 12.0312L12.9062 8.75" stroke="#0095FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                                 
                  <div class="task-details-content-tag ${tag.attributes.color}">
                  <p style="    white-space: nowrap">${tag.attributes.tag}</p>
              </div>
                                  </div>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9" fill="none">
                                      <g clip-path="url(#clip0_964_2461)">
                                        <path d="M4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3C4.67157 3 4 3.67157 4 4.5Z" fill="#7F92A2"/>
                                        <path d="M8 4.5C8 5.32843 8.67157 6 9.5 6C10.3284 6 11 5.32843 11 4.5C11 3.67157 10.3284 3 9.5 3C8.67157 3 8 3.67157 8 4.5Z" fill="#7F92A2"/>
                                        <path d="M1.72851e-07 4.5C1.3664e-07 5.32843 0.671573 6 1.5 6C2.32843 6 3 5.32843 3 4.5C3 3.67157 2.32843 3 1.5 3C0.671573 3 2.09063e-07 3.67157 1.72851e-07 4.5Z" fill="#7F92A2"/>
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_964_2461">
                                          <rect width="9" height="11" fill="white" transform="translate(11) rotate(90)"/>
                                        </clipPath>
                                      </defs>
                                  </svg>
                                </li>`;
      })}
                    </ul>
                  </div >
        `
      const container = document.createElement('div');
      container.classList.add('tag-list')
      container.innerHTML = html;
      const addTag = container.querySelectorAll(".tagList");
      addTag.forEach((e) => {
        e.addEventListener('click', async () => {
          const newTag = e.textContent.trim();
          const newTagColor = e.children[0].children[1].getAttribute('class').split(" ")[1]
          const newTagId = e.getAttribute('id');
          const contentTags = document.querySelector('.task-details-content-tags')
          let html = ` <div class="task-details-content-tag ${newTagColor}">
                                      <p>${newTag}</p>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                          <path
                                              d="M8.46098 3.37077C8.37503 3.28484 8.25847 3.23657 8.13693 3.23657C8.0154 3.23657 7.89884 3.28484 7.81289 3.37077L5.71098 5.47268L3.60906 3.37077C3.52311 3.28484 3.40655 3.23657 3.28502 3.23657C3.16348 3.23657 3.04693 3.28484 2.96098 3.37077C2.87505 3.45672 2.82678 3.57327 2.82678 3.69481C2.82678 3.81634 2.87505 3.9329 2.96098 4.01885L5.06289 6.12077L2.96098 8.22268C2.87505 8.30863 2.82678 8.42519 2.82678 8.54672C2.82678 8.66826 2.87505 8.78482 2.96098 8.87077C3.04693 8.95669 3.16348 9.00496 3.28502 9.00496C3.40655 9.00496 3.52311 8.95669 3.60906 8.87077L5.71098 6.76885L7.81289 8.87077C7.89884 8.95669 8.0154 9.00496 8.13693 9.00496C8.25847 9.00496 8.37503 8.95669 8.46098 8.87077C8.5469 8.78482 8.59517 8.66826 8.59517 8.54672C8.59517 8.42519 8.5469 8.30863 8.46098 8.22268L6.35906 6.12077L8.46098 4.01885C8.5469 3.9329 8.59517 3.81634 8.59517 3.69481C8.59517 3.57327 8.5469 3.45672 8.46098 3.37077Z"
                                              fill="#F51F45" />
                                      </svg>
                                  </div>
`
          contentTags.insertAdjacentHTML('beforeend', html);
          console.log(newTagId, taskId, "hh");
          const changeTag = await changeTags(newTagId, taskId)
          console.log(changeTag);
        })
      })
      const tagsLists = document.querySelector('.tags-lists');
      tagsLists.appendChild(container);
    })

    document.addEventListener('click', (event) => {
      const isClickInsideTagList = event.target.closest('.tag-list');
      const isClickInsideChooseTags = event.target.closest('.choose-tags');

      if (!isClickInsideTagList && !isClickInsideChooseTags) {
        const allTagLists = document.querySelectorAll('.tag-list');
        allTagLists.forEach((list) => {
          list.remove();
        });
      }
    });

    //close 
    const closeTaskDetails = document.querySelector(".closeTask-details");
    closeTaskDetails.addEventListener("click", async () => {
      detailsData.newTitle = document.querySelector('.task-details-content-title').innerHTML
      detailsData.newDesc = document.querySelector('.p-desc-detail').innerHTML

      const change = await changeTask(taskId, detailsData.newTitle, detailsData.newDesc, detailsData.newStatus, detailsData.newFlag, detailsData.deadline)
      const tasks = await getTasks(selectedProjectId);
      const taskNumbers = countTasksStatus(tasks)
      const newRequestNumber = document.querySelector("#new-requestNumber")
      const inprogressNumber = document.querySelector("#in-progressNumber")
      const tobetestedNumber = document.querySelector("#to-be-testedNumber")
      const completedNumber = document.querySelector("#completedNumber")
      newRequestNumber.innerHTML = taskNumbers.newRequest
      inprogressNumber.innerHTML = taskNumbers.inProgress
      tobetestedNumber.innerHTML = taskNumbers.toBeTested
      completedNumber.innerHTML = taskNumbers.completed
      renderTasks(tasks)
      taskDetails.style.display = "none";
    });
  });



  //assignee
  //           const assignee = document.querySelectorAll(".assignee-vide");
  //           assignee.forEach((e) => {
  //             e.addEventListener("click", async (event) => {
  //               const users = await getUsers()
  //               let html = `
  //               <div class="search-assignee">
  //     <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17"
  //         fill="none">
  //         <path
  //             d="M7.33333 14.3333C3.74667 14.3333 0.833333 11.42 0.833333 7.83331C0.833333 4.24665 3.74667 1.33331 7.33333 1.33331C10.92 1.33331 13.8333 4.24665 13.8333 7.83331C13.8333 11.42 10.92 14.3333 7.33333 14.3333ZM7.33333 2.33331C4.3 2.33331 1.83333 4.79998 1.83333 7.83331C1.83333 10.8666 4.3 13.3333 7.33333 13.3333C10.3667 13.3333 12.8333 10.8666 12.8333 7.83331C12.8333 4.79998 10.3667 2.33331 7.33333 2.33331Z"
  //             fill="#374957" />
  //         <path
  //             d="M13.44 15.6933C13.3867 15.6933 13.3333 15.6867 13.2867 15.68C12.9733 15.64 12.4067 15.4267 12.0867 14.4733C11.92 13.9733 11.98 13.4733 12.2533 13.0933C12.5267 12.7133 12.9867 12.5 13.5133 12.5C14.1933 12.5 14.7267 12.76 14.9667 13.22C15.2067 13.68 15.14 14.2667 14.76 14.8333C14.2867 15.5467 13.7733 15.6933 13.44 15.6933ZM13.04 14.16C13.1533 14.5067 13.3133 14.68 13.42 14.6933C13.5267 14.7067 13.7267 14.58 13.9333 14.28C14.1267 13.9933 14.14 13.7867 14.0933 13.6933C14.0467 13.6 13.86 13.5 13.5133 13.5C13.3067 13.5 13.1533 13.5667 13.0667 13.68C12.9867 13.7933 12.9733 13.9667 13.04 14.16Z"
  //             fill="#374957" />
  //     </svg>
  //     <input class="search-input-assignee" type="text" placeholder="Search ..." />
  // </div>
  // <div class="assignee-content">
  //     <p>Personnes </p>
  //     <ul class="profiles">
  //         ${users && users.map((user) => {
  //                 return `<li class="profileList">
  //             <img class="avatar-assignee" src="http://localhost:1337${user.avatar.url}" alt="">
  //             <p>${user.username}</p>
  //         </li>`
  //               })
  //                 }
  //     </ul>
  // </div>
  //               `
  //               const container = document.createElement('div');
  //               container.classList.add('assignee')
  //               container.innerHTML = html;
  //               const profileList = container.querySelectorAll(".profileList");
  //               profileList.forEach((item) => {
  //                 item.addEventListener("click", async (event) => {
  //                   const newAssignee = item.textContent.trim();
  //                   console.log(newAssignee);
  //                   // const change = await changeTask(taskId, null, null, newAssignee)
  //                   // const tasks = await getTasks(selectedProjectId);
  //                   // renderTasks(tasks); 
  //                 });
  //               });

  //               const list = e.nextElementSibling;
  //               list.appendChild(container);
  //             });
  //           });

  //           document.addEventListener('click', (event) => {
  //             const isClickInsideList = event.target.closest('.assignee');
  //             const isClickInside = event.target.closest('.profileList');

  //             if (!isClickInsideList && !isClickInside) {
  //               const allLists = document.querySelectorAll('.assignee');
  //               allLists.forEach((list) => {
  //                 list.style.display = 'none';
  //               });
  //             }
  //           });



}