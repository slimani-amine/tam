import * as authmodel from "./auth/model.js";
import * as model from "./model.js";
import renderTasks from "./Views/renderTasks.js";
import { dragAndDrop } from "./Views/dragAndDrop.js"
import { taskDetail } from "./Views/taskDetails.js"
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

  listItem.classList.add("tasks-navbar-list-checked");
  if (tasksData) {
    columns.style.display = "none";
    lists.style.display = "none";
    timeline.style.display = "none";
    noTasks.style.display = "block";
  }

  //---------------------------
  // avatar 
  //---------------------------
  const userData = await model.getUser(userId)
  const avatar = document.querySelector("#avatar-img")
  userData.avatar ? avatar.setAttribute("src", `http://localhost:1337${userData.avatar.url}`) : avatar.setAttribute("src", `https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png`)

  //---------------------------
  //sidebar 
  //---------------------------
  withoutSideBar.addEventListener("click", () => {
    sidebar.style.display = "none";
  });
  withSideBar.addEventListener("click", () => {
    sidebar.style.display = "block";
  });

  //---------------------------
  //nav
  //---------------------------
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
  const navlists = document.querySelectorAll(".list");
  navlists.forEach((list) => {
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

  //---------------------------
  // render projects 
  //---------------------------
  const allProjectContents = document.querySelector("#allProject-contents");
  let i = 0
  const data = await model.getProjects();
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

  //---------------------------
  //render tasks
  //---------------------------
  const listItems2 = document.querySelectorAll(".list2");
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
      const tasks = await model.getTasks(projectId);
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

      //---------------------------
      // project name
      //---------------------------
      const selectedProject = await model.getProject(selectedProjectId)
      const projectName = document.querySelector('.projectName')
      projectName.innerHTML = selectedProject.Name

      //---------------------------
      //numbers of tasks :
      //---------------------------
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
  listItems2.forEach((item, i) => {
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

  //---------------------------
  // tasks nav
  //---------------------------
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

  //---------------------------
  // avatar and logout
  //---------------------------
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
    authmodel.logout();
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

  //---------------------------
  //add project
  //---------------------------
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
      const result = await model.pushNewProject({ Name: nameOfProject, url: urlOfProject });
      location.reload();
    } catch (error) {
      console.error(error, "something wrong!");
    }
  });
  //---------------------------
  //add task
  //---------------------------
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
      await model.pushNewTask({ title: nameOfTask, description: descOfTask, status: statusOfTask }, selectedProjectId);
      const tasks = await model.getTasks(selectedProjectId);
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
    let users = await model.getUsers();
    const selectedProject = await model.getProject(selectedProjectId)
    const usersAssignee = selectedProject.users.data
    let userAssData = [];
    if (usersAssignee) {
      await Promise.all(usersAssignee.map(async (e) => {
        let user = await model.getUser(e.id);
        userAssData.push(user);
      }));
    }
    users = users && users.filter((user) => {
      if (!usersAssignee.some(userAss => userAss.id === user.id)) {
        return user;
      }
      return null;
    });
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
                            <img class="avatar-assignee" src="${user.avatar ? `http://localhost:1337${user.avatar.url}` : user.image}" alt="">
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
        <img class="avatar-assignee" src="${user.avatar ? `http://localhost:1337${user.avatar.url}` : user.image}" alt="">
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
        const newProjectData = await model.getProject(selectedProjectId)
        const pushProject = await model.pushNewProject({
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
        if (idOfAss === userId) {
          if (confirm('Are you sure to sort from your project ?')) {
            const deleteProjectAss = await model.deleteProject(selectedProjectId)
            location.reload()
          }
        } else {
          if (confirm(`Are you sure to delete ${nameOfAss}`)) {
            const deleteProjectAss = await model.deleteProject(selectedProjectId)
            location.reload()
          }
          const deleteProjectAss = await model.deleteProject(selectedProjectId)
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

  //  tasks features

  //drag and drop 
  const draggables = document.querySelectorAll(".column-task");
  const draggables2 = document.querySelectorAll(".task");
  const droppables = document.querySelectorAll(".column");
  const droppables2 = document.querySelectorAll(".list");
  dragAndDrop(draggables, draggables2, droppables, droppables2)

  //---------------------------
  // 1) tags
  //---------------------------
  //choose tags
  document.addEventListener('click', async (event) => {
    const tags = await model.getTags()
    const clickedAss = event.target.closest('.choose-tags');
    if (clickedAss) {
      const taskId = clickedAss.parentElement.parentElement.parentElement.getAttribute('data-task-id');
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
          const newTagId = e.getAttribute('id');
          const task = await model.getTask(taskId)
          const tagsIds = []
          task.tags.data.map((e) => {
            tagsIds.push(e.id)
          })
          const changeTag = await model.changeTask(taskId, null, null, null, null, null, tagsIds.concat(newTagId))
          const tasks = await model.getTasks(selectedProjectId);
          renderTasks(tasks);
        })
      })

      const assList = clickedAss.nextElementSibling;
      assList.appendChild(container);
    }
  });
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

  //delete tags
  document.addEventListener('click', async (event) => {
    const clickedDelete = event.target.closest('.delete-tag');
    if (clickedDelete) {
      const taskId = clickedDelete.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('data-task-id');
      const tagId = clickedDelete.parentElement.getAttribute('tag-id');
      const task = await model.getTask(taskId)
      const tagsIds = []
      task.tags.data.map((e) => {
        if (e.id !== tagId * 1) {
          tagsIds.push(e.id)
        }
      })
      console.log(tagsIds, "tagsIds");
      const changeTag = await model.changeTask(taskId, null, null, null, null, null, tagsIds)
      const tasks = await model.getTasks(selectedProjectId);
      renderTasks(tasks);
    }
  })

  //---------------------------
  // 2) assignee tasks
  //---------------------------
  document.addEventListener('click', async (event) => {
    const clickedAss = event.target.closest('.assignee-vide');
    if (clickedAss) {
      const selectedProject = await model.getProject(selectedProjectId)
      const usersAssignee = selectedProject.users.data
      let users = [];

      if (usersAssignee) {
        await Promise.all(usersAssignee.map(async (e) => {
          let user = await model.getUser(e.id);
          users.push(user);
        }));
      }
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
      <p>Personnes </p>
      <ul class="profiles">
          ${users && users.map((user) => {
        return `<li class="profileList" id=${user.id}>
              <img class="avatar-assignee" src="${user.avatar ? `http://localhost:1337${user.avatar.url}` : user.image}"   alt="">
              <p>${user.username}</p>
          </li>`
      })
        }
      </ul>
  </div>
  `
      const container = document.createElement('div');
      container.innerHTML = html;
      container.classList.add('assignee')
      const listItems = container.querySelectorAll(".profileList");

      listItems.forEach((item) => {
        item.addEventListener("click", async (event) => {

          const idtask = item.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('data-task-id');
          const newAssignee = item.getAttribute('id')
          const user = await model.getUser(newAssignee)

          let taskAss = []
          const tasks = await model.getTasks(selectedProjectId);

          tasks && tasks.map(async (e) => {
            let task = await model.getTask(e.id)
            console.log(task, "task");
            task.users_assignees.data.map(async (e) => {
              let user = await model.getUser(e.id)
              taskAss.push(user)
            })
          })
          const change = await model.changeTask(idtask, null, null, null, null, null, null, taskAss.concat(user))

          renderTasks(tasks);
        });
      });
      const assList = clickedAss.nextElementSibling;
      assList.appendChild(container);
    }
  });
  document.addEventListener('click', (event) => {
    const isClickInsideList = event.target.closest('.assignee');
    const isClickInside = event.target.closest('.profileList');

    if (!isClickInsideList && !isClickInside) {
      const allLists = document.querySelectorAll('.assignee');
      allLists.forEach((list) => {
        list.style.display = 'none';
      });
    }
  });

  //---------------------------
  // 3) priority flags
  //---------------------------
  document.addEventListener('click', async (event) => {
    const clickedFlag = event.target.closest('.priority-flag');
    if (clickedFlag) {
      const taskId = clickedFlag.parentElement.parentElement.parentElement.getAttribute('data-task-id');
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
          const newFlag = item.textContent.trim();
          const change = await model.changeTask(taskId, null, null, null, newFlag, null);
          const tasks = await model.getTasks(selectedProjectId);
          renderTasks(tasks);
        });
      });

      const flagsList = clickedFlag.nextElementSibling;
      flagsList.appendChild(container);
    }
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

  // 4) options task
  document.addEventListener('click', async (event) => {
    const clickedOptions = event.target.closest('.otherPoint');
    if (clickedOptions) {
      const taskId = clickedOptions.parentElement.parentElement.parentElement.getAttribute('data-task-id');
      console.log(taskId);

      let html = `
    <ul class="other-list" style="background:#fff ; width : 120px">
    <li class="dupliquerButton" >
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
<path d="M14 4.98669C13.9867 4.98669 13.9667 4.98669 13.9467 4.98669C10.42 4.63336 6.9 4.50002 3.41333 4.85336L2.05333 4.98669C1.77333 5.01336 1.52667 4.81336 1.5 4.53336C1.47333 4.25336 1.67333 4.01336 1.94667 3.98669L3.30667 3.85336C6.85333 3.49336 10.4467 3.63336 14.0467 3.98669C14.32 4.01336 14.52 4.26002 14.4933 4.53336C14.4733 4.79336 14.2533 4.98669 14 4.98669Z" fill="#944242"/>
<path d="M5.66667 4.31337C5.64 4.31337 5.61333 4.31337 5.58 4.30671C5.31333 4.26004 5.12667 4.00004 5.17333 3.73337L5.32 2.86004C5.42667 2.22004 5.57333 1.33337 7.12667 1.33337H8.87333C10.4333 1.33337 10.58 2.25337 10.68 2.86671L10.8267 3.73337C10.8733 4.00671 10.6867 4.26671 10.42 4.30671C10.1467 4.35337 9.88667 4.16671 9.84667 3.90004L9.7 3.03337C9.60667 2.45337 9.58667 2.34004 8.88 2.34004H7.13333C6.42667 2.34004 6.41333 2.43337 6.31333 3.02671L6.16 3.89337C6.12 4.14004 5.90667 4.31337 5.66667 4.31337Z" fill="#944242"/>
<path d="M10.14 15.6667H5.86C3.53333 15.6667 3.44 14.3801 3.36667 13.3401L2.93333 6.62672C2.91333 6.35338 3.12667 6.11338 3.4 6.09338C3.68 6.08005 3.91333 6.28672 3.93333 6.56005L4.36667 13.2734C4.44 14.2867 4.46667 14.6667 5.86 14.6667H10.14C11.54 14.6667 11.5667 14.2867 11.6333 13.2734L12.0667 6.56005C12.0867 6.28672 12.3267 6.08005 12.6 6.09338C12.8733 6.11338 13.0867 6.34672 13.0667 6.62672L12.6333 13.3401C12.56 14.3801 12.4667 15.6667 10.14 15.6667Z" fill="#944242"/>
<path d="M9.10667 12H6.88667C6.61333 12 6.38667 11.7733 6.38667 11.5C6.38667 11.2267 6.61333 11 6.88667 11H9.10667C9.38 11 9.60667 11.2267 9.60667 11.5C9.60667 11.7733 9.38 12 9.10667 12Z" fill="#944242"/>
<path d="M9.66667 9.33337H6.33333C6.06 9.33337 5.83333 9.10671 5.83333 8.83337C5.83333 8.56004 6.06 8.33337 6.33333 8.33337H9.66667C9.94 8.33337 10.1667 8.56004 10.1667 8.83337C10.1667 9.10671 9.94 9.33337 9.66667 9.33337Z" fill="#944242"/>
</svg>
<p class="options-otherbtn">
Dupliquer
</p>
</li>
<li class="favorisButton" >
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
  <path d="M9.33333 5.00004H6.66667C6.02667 5.00004 4.83333 5.00004 4.83333 3.16671C4.83333 1.33337 6.02667 1.33337 6.66667 1.33337H9.33333C9.97333 1.33337 11.1667 1.33337 11.1667 3.16671C11.1667 3.80671 11.1667 5.00004 9.33333 5.00004ZM6.66667 2.33337C6.00667 2.33337 5.83333 2.33337 5.83333 3.16671C5.83333 4.00004 6.00667 4.00004 6.66667 4.00004H9.33333C10.1667 4.00004 10.1667 3.82671 10.1667 3.16671C10.1667 2.33337 9.99333 2.33337 9.33333 2.33337H6.66667Z" fill="#374957"/>
  <path d="M9.33333 15.6666H6C2.25333 15.6666 1.5 13.9466 1.5 11.1666V7.16665C1.5 4.12665 2.6 2.82665 5.30667 2.68665C5.57333 2.67331 5.82 2.87998 5.83333 3.15998C5.84667 3.43998 5.63333 3.66665 5.36 3.67998C3.46667 3.78665 2.5 4.35331 2.5 7.16665V11.1666C2.5 13.6333 2.98667 14.6666 6 14.6666H9.33333C9.60667 14.6666 9.83333 14.8933 9.83333 15.1666C9.83333 15.44 9.60667 15.6666 9.33333 15.6666Z" fill="#374957"/>
  <path d="M14 11C13.7267 11 13.5 10.7734 13.5 10.5V7.1667C13.5 4.35337 12.5333 3.7867 10.64 3.68004C10.3667 3.6667 10.1533 3.4267 10.1667 3.15337C10.18 2.88004 10.4267 2.6667 10.6933 2.68004C13.4 2.8267 14.5 4.1267 14.5 7.16004V10.4934C14.5 10.7734 14.2733 11 14 11Z" fill="#374957"/>
  <path d="M14 15.6666H12C11.7267 15.6666 11.5 15.44 11.5 15.1666C11.5 14.8933 11.7267 14.6666 12 14.6666H13.5V13.1666C13.5 12.8933 13.7267 12.6666 14 12.6666C14.2733 12.6666 14.5 12.8933 14.5 13.1666V15.1666C14.5 15.44 14.2733 15.6666 14 15.6666Z" fill="#374957"/>
  <path d="M13.9733 15.64C13.8467 15.64 13.72 15.5933 13.62 15.4933L9.64667 11.52C9.45333 11.3267 9.45333 11.0067 9.64667 10.8133C9.84 10.62 10.16 10.62 10.3533 10.8133L14.3267 14.7867C14.52 14.98 14.52 15.3 14.3267 15.4933C14.2267 15.5867 14.1 15.64 13.9733 15.64Z" fill="#374957"/>
</svg>
<p class="options-otherbtn">
Ajouter au favoris
</p>
</li>
<li class="archiverButton" >
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
  <path d="M11.7733 15.6133C11.42 15.6133 10.9667 15.5 10.4 15.1667L8.40667 13.9867C8.2 13.8667 7.8 13.8667 7.6 13.9867L5.6 15.1667C4.42 15.8667 3.72667 15.5867 3.41333 15.36C3.10667 15.1333 2.62667 14.5533 2.94 13.22L3.41333 11.1733C3.46667 10.96 3.36 10.5933 3.2 10.4333L1.54667 8.78001C0.720001 7.95334 0.786668 7.24667 0.900001 6.90001C1.01333 6.55334 1.37333 5.94 2.52 5.74667L4.64667 5.39334C4.84667 5.36 5.13333 5.14667 5.22 4.96667L6.4 2.61334C6.93333 1.54 7.63333 1.38 8 1.38C8.36667 1.38 9.06667 1.54 9.6 2.61334L10.7733 4.96C10.8667 5.14 11.1533 5.35334 11.3533 5.38667L13.48 5.74001C14.6333 5.93334 14.9933 6.54667 15.1 6.89334C15.2067 7.24001 15.2733 7.94667 14.4533 8.77334L12.8 10.4333C12.64 10.5933 12.54 10.9533 12.5867 11.1733L13.06 13.22C13.3667 14.5533 12.8933 15.1333 12.5867 15.36C12.42 15.48 12.1533 15.6133 11.7733 15.6133ZM8 12.8933C8.32667 12.8933 8.65333 12.9733 8.91333 13.1267L10.9067 14.3067C11.4867 14.6533 11.8533 14.6533 11.9933 14.5533C12.1333 14.4533 12.2333 14.1 12.0867 13.4467L11.6133 11.4C11.4867 10.8467 11.6933 10.1333 12.0933 9.72667L13.7467 8.07334C14.0733 7.74667 14.22 7.42667 14.1533 7.20667C14.08 6.98667 13.7733 6.80667 13.32 6.73334L11.1933 6.38C10.68 6.29334 10.12 5.88 9.88667 5.41334L8.71333 3.06667C8.5 2.64 8.23333 2.38667 8 2.38667C7.76667 2.38667 7.5 2.64 7.29333 3.06667L6.11333 5.41334C5.88 5.88 5.32 6.29334 4.80667 6.38L2.68667 6.73334C2.23333 6.80667 1.92667 6.98667 1.85333 7.20667C1.78 7.42667 1.93333 7.75334 2.26 8.07334L3.91333 9.72667C4.31333 10.1267 4.52 10.8467 4.39333 11.4L3.92 13.4467C3.76667 14.1067 3.87333 14.4533 4.01333 14.5533C4.15333 14.6533 4.51333 14.6467 5.1 14.3067L7.09333 13.1267C7.34667 12.9733 7.67333 12.8933 8 12.8933Z" fill="#374957"/>
</svg>
<p class="options-otherbtn">
Archiver
</p>
</li>
<li class="deleteButton" >
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
  <path d="M11 15.6667H5C2.8 15.6667 2.5 14.4667 2.5 13.1667V7.31335C2.5 7.04002 2.72667 6.81335 3 6.81335C3.27333 6.81335 3.5 7.04002 3.5 7.31335V13.1667C3.5 14.3267 3.7 14.6667 5 14.6667H11C12.3 14.6667 12.5 14.3267 12.5 13.1667V7.31335C12.5 7.04002 12.7267 6.81335 13 6.81335C13.2733 6.81335 13.5 7.04002 13.5 7.31335V13.1667C13.5 14.4667 13.2 15.6667 11 15.6667Z" fill="#374957"/>
  <path d="M12.6667 7.66671H3.33333C1.72 7.66671 0.833332 6.78004 0.833332 5.16671V3.83337C0.833332 2.22004 1.72 1.33337 3.33333 1.33337H12.6667C14.28 1.33337 15.1667 2.22004 15.1667 3.83337V5.16671C15.1667 6.78004 14.28 7.66671 12.6667 7.66671ZM3.33333 2.33337C2.28 2.33337 1.83333 2.78004 1.83333 3.83337V5.16671C1.83333 6.22004 2.28 6.66671 3.33333 6.66671H12.6667C13.72 6.66671 14.1667 6.22004 14.1667 5.16671V3.83337C14.1667 2.78004 13.72 2.33337 12.6667 2.33337H3.33333Z" fill="#374957"/>
  <path d="M9.21333 10.3334H6.78667C6.51333 10.3334 6.28667 10.1067 6.28667 9.83337C6.28667 9.56004 6.51333 9.33337 6.78667 9.33337H9.21333C9.48667 9.33337 9.71333 9.56004 9.71333 9.83337C9.71333 10.1067 9.48667 10.3334 9.21333 10.3334Z" fill="#374957"/>
</svg>
<p class="options-otherbtn" style="color:red;">
Delete
</p>
</li>

</ul>
`
      const container = document.createElement('div');
      container.innerHTML = html;

      const deleteButton = container.querySelector(".deleteButton");
      deleteButton.addEventListener("click", async (event) => {
        if (taskId) {
          const deleteTaskRes = await model.deleteTask(taskId);
          const tasks = await model.getTasks(selectedProjectId);
          const taskNumbers = countTasksStatus(tasks);
          const newRequestNumber = document.querySelector("#new-requestNumber");
          const inprogressNumber = document.querySelector("#in-progressNumber");
          const tobetestedNumber = document.querySelector("#to-be-testedNumber");
          const completedNumber = document.querySelector("#completedNumber");
          newRequestNumber.innerHTML = taskNumbers.newRequest;
          inprogressNumber.innerHTML = taskNumbers.inProgress;
          tobetestedNumber.innerHTML = taskNumbers.toBeTested;
          completedNumber.innerHTML = taskNumbers.completed;
          renderTasks(tasks);
        }
        else {
          const deleteTaskRes = await model.deleteProject(selectedProjectId);
          location.reload()
        }
      });

      const flagsList = clickedOptions.nextElementSibling;
      flagsList.appendChild(container);
    }
  });
  document.addEventListener('click', (event) => {
    const isClickInsideOtherList = event.target.closest('.other-list');
    const isClickInsideOther = event.target.closest('.otherPoint');
    if (!isClickInsideOtherList && !isClickInsideOther) {
      const allOtherLists = document.querySelectorAll('.other-list');
      allOtherLists.forEach((list) => {
        list.style.display = 'none';
      });
    }
  });

  //---------------------------
  // 5) task details
  //---------------------------
  let idtask = 0
  const taskDetails = document.querySelector(".task-details");
  document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('task-title')) {
      idtask = event.target.parentElement.parentElement.getAttribute('data-task-id');
      const html = await taskDetail(idtask, selectedProjectId)
      taskDetails.style.display = "block";
      const div = document.createElement('div');
      div.classList.add("modalTask-details");
      taskDetails.appendChild(div);
      div.innerHTML = html;
    }
  })

  // Task details operations 
  let detailsData = {
    newTitle: "",
    newDesc: "",
    newStatus: "",
    newFlag: "",
    deadline: "",
  }

  // status
  document.addEventListener('click', async (event) => {
    const clickedOptions = event.target.closest('.dropdown-trigger');
    if (clickedOptions) {
      const taskId = clickedOptions.parentElement.parentElement.getAttribute('data-task-id');
      let html = `<ul class="status-list">
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
      container.innerHTML = html;
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
          container.style.display = 'none';
        });
      });
      const statusList = document.querySelector('.status-lists')
      statusList.appendChild(container);
    }
  });
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

  // assignee tasks
  document.addEventListener('click', async (event) => {
    const clickedAss = event.target.closest('.assigneeTask-details');
    if (clickedAss) {
      const selectedProject = await model.getProject(selectedProjectId)
      const usersAssignee = selectedProject.users.data
      let users = [];
      if (usersAssignee) {
        await Promise.all(usersAssignee.map(async (e) => {
          let user = await model.getUser(e.id);
          users.push(user);
        }));
      }
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
        <p>Personnes </p>
        <ul class="profiles">
            ${users && users.map((user) => {
        return `<li class="profileList">
                <img class="avatar-assignee" src="${user.avatar ? `http://localhost:1337${user.avatar.url}` : user.image}"   alt="">
                <p>${user.username}</p>
            </li>`
      })
        }
        </ul>
    </div>
    `
      const container = document.createElement('div');
      container.innerHTML = html;
      container.classList.add('assignee-details')
      const listItems = container.querySelectorAll(".profileList");

      listItems.forEach((item) => {
        item.addEventListener("click", async (event) => {
          const newAssignee = item.textContent.trim();
          // const change = await changeTask(taskId, null, null, newAssignee)
          // const tasks = await getTasks(selectedProjectId);
          // renderTasks(tasks); 
        });
      });
      const assList = clickedAss.nextElementSibling;
      assList.appendChild(container);
    }
  });
  document.addEventListener('click', (event) => {
    const isClickInsideList = event.target.closest('.assignee-details');
    const isClickInside = event.target.closest('.profileList');

    if (!isClickInsideList && !isClickInside) {
      const allLists = document.querySelectorAll('.assignee-details');
      allLists.forEach((list) => {
        list.style.display = 'none';
      });
    }
  });

  // flag
  document.addEventListener('click', async (event) => {
    const clickedFlag = event.target.closest('.priority-flag-details');
    if (clickedFlag) {
      let html = `
        <ul class="flag-list-details" style=" background-color: #fff  position: absolute;right: 40px;top: 6px;">
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
          let lastFlag = document.querySelector('.task-details-content-header-priorityflag ')
          console.log(lastFlag, "lastFlag");
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
      const flagsList = document.querySelector('.flags-list-details');
      flagsList.appendChild(container);
    }
  });
  document.addEventListener('click', (event) => {
    const isClickInsideFlagList = event.target.closest('.flag-list-details');
    const isClickInsideFlag = event.target.closest('.priority-flag-details');
    if (!isClickInsideFlagList && !isClickInsideFlag) {
      const allFlagLists = document.querySelectorAll('.flag-list-details');
      allFlagLists.forEach((list) => {
        list.style.display = 'none';
      });
    }
  });

  //deadline 
  document.addEventListener('click', async (event) => {
    const clickedOptions = event.target.closest('.time');
    if (clickedOptions) {
      const taskId = clickedOptions.parentElement.parentElement.parentElement.getAttribute('data-task-id');
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

      const flagsList = clickedOptions.nextElementSibling;
      flagsList.appendChild(container);
    }
  });
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

  //add comment
  document.addEventListener('click', async (event) => {
    const clickedOptions = event.target.closest('.comment-button');
    if (clickedOptions) {
      const comment = document.querySelector('.comment-input')
      const comments = document.querySelector('.comments')
      comments.insertAdjacentHTML('afterend', comment.value)
      const newComment = await model.pushNewComment(idtask, comment.value)
    }
  })

  //choose tags
  document.addEventListener('click', async (event) => {
    const tags = await model.getTags()
    const clickedOptions = event.target.closest('.choose-tags');
    if (clickedOptions) {
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
          const changeTag = await model.changeTags(newTagId, taskId)
        })
      })
      const tagsLists = document.querySelector('.tags-lists');
      tagsLists.appendChild(container);
    }
  });
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
  document.addEventListener('click', async (event) => {
    const clickedClose = event.target.closest('.closeTask-details');
    if (clickedClose) {
      detailsData.newTitle = document.querySelector('.task-details-content-title').innerHTML
      detailsData.newDesc = document.querySelector('.p-desc-detail').innerHTML
      const change = await model.changeTask(idtask, detailsData.newTitle, detailsData.newDesc, detailsData.newStatus, detailsData.newFlag, detailsData.deadline)
      const tasks = await model.getTasks(selectedProjectId);
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
    }
  });

}