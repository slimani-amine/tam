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
  changeProject,
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
  setTimeout(() => {
    document.innerHTML = loader()
  }, 1000)

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
    avatar.setAttribute("src", `http://localhost:1337${userData.avatar.url}`)

    // render projects 
    const listItems = document.querySelectorAll(".list2");
    const dropdown1 = document.querySelectorAll(".dropdown1");
    const dropdown2 = document.querySelectorAll(".dropdown2");
    const dropdownContents = document.querySelectorAll(".dropdown-contents");
    const allProjectContents = document.querySelector("#allProject-contents");
    let i = 0
    const data = await getProjects();
    data &&
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
            renderTasks(tasks);

            //  task detalis
            const taskTitle = document.querySelectorAll(".task-title");
            const taskDetails = document.querySelector(".task-details");
            taskTitle.forEach((e) => {
              e.addEventListener("click", async () => {
                const taskId = e.parentElement.parentElement.getAttribute('data-task-id');
                const html = await taskDetail(taskId, selectedProjectId)
                taskDetails.style.display = "block";
                const div = document.createElement('div');
                div.classList.add("modalTask-details");
                taskDetails.appendChild(div);
                div.innerHTML = html;

                // Task details operations 
                let detailsData = {
                  newTitle: "",
                  newDesc: "",
                  newStatus: "",
                  newFlag: "",
                  deadline: ""
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
                      console.log(lastcolorClass, "lastcolorClass");
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
                  try {
                    e.preventDefault()
                    const newComment = await changeTask(taskId, null, null, null, null, comment.value, null)
                    console.log(newComment);
                  } catch (error) {
                    console.log(error, "something wrong !");
                  }
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

                //close 
                const closeTaskDetails = document.querySelector(".closeTask-details");
                closeTaskDetails.addEventListener("click", async () => {
                  detailsData.newTitle = document.querySelector('.task-details-content-title').innerHTML
                  detailsData.newDesc = document.querySelector('.p-desc-detail').innerHTML
                  console.log(detailsData, "detailsData");
                  const change = await changeTask(taskId, detailsData.newTitle, detailsData.newDesc, detailsData.newStatus, detailsData.newFlag, detailsData.newComment, detailsData.deadline)
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

              //drag and drop
              const draggables = document.querySelectorAll(".column-task");
              const draggables2 = document.querySelectorAll(".task");
              const droppables = document.querySelectorAll(".column");
              const droppables2 = document.querySelectorAll(".list");

              dragAndDrop(draggables, draggables2, droppables, droppables2)

              //options task
              const otherPoint = document.querySelectorAll(".otherPoint");
              otherPoint.forEach((e) => {
                const taskId = e.parentElement.parentElement.getAttribute('data-task-id')
                e.addEventListener("click", (event) => {
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
                    const deleteTaskRes = await deleteTask(taskId)
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
                    renderTasks(tasks);
                  });
                  const others = e.nextElementSibling;
                  others.appendChild(container);
                });
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

              //priority flags
              const flags = document.querySelectorAll(".priority-flag");
              flags.forEach((flag) => {
                const taskId = flag.parentElement.parentElement.getAttribute('data-task-id')
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
                      const newFlag = item.textContent.trim();
                      const change = await changeTask(taskId, null, null, null, newFlag, null, null)
                      const tasks = await getTasks(selectedProjectId);
                      renderTasks(tasks);
                    });
                  });
                  const flagsList = flag.nextElementSibling;
                  flagsList.appendChild(container);
                });
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
                            <img class="avatar-assignee" src="http://localhost:1337${user.avatar.url}" alt="">
                            <p>${user.id !== localStorage.getItem("userId") * 1 ? user.username : 'You'}</p>
                          </li>`;
    })}
              </ul>
              

  <p style="color="#374957" >Personnes </p>
<ul class="profiles">
  ${users && users.map((user) => {
      return `<li class="profileList" id="${user.id}">
        <img class="avatar-assignee" src="http://localhost:1337${user.avatar.url}" alt="">
        <p>${user.username}</p>
      </li>`;
    })}
</ul>
            </div >
  `
    const container = document.createElement('div');
    container.classList.add('assignee');
    container.innerHTML = html;
    const profileList = container.querySelectorAll(".profileList");
    profileList.forEach((item) => {
      item.addEventListener("click", async (event) => {
        const idOfNewAssignee = item.getAttribute("id")
        const updateProject = await changeProject(selectedProjectId, idOfNewAssignee)
      });
    });
    const list = document.querySelector('.projects-relations-lists');
    list.appendChild(container);
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

}