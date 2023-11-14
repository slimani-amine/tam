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
} from "./model.js";
import renderTasks from "./Views/renderTasks.js";
import { dragAndDrop } from "./Views/dragAndDrop.js"
import { taskDetail } from "./Views/taskDetails.js"
const taskNumber = {
  newRequest: 0,
  inProgress: 0,
  toBeTested: 0,
  completed: 0
}
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
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
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
            console.log(tasks);
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
            const taskNumbers = await countTasksStatus(tasks, taskNumber)
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
                const closeTaskDetails = document.querySelector(".closeTask-details");
                closeTaskDetails.addEventListener("click", () => {
                  taskDetails.style.display = "none";
                });

                // Task details operations 
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
                      const newStatus = item.textContent.trim();
                      const change = await changeTask(taskId, newStatus, null)
                      renderTasks(tasks);
                      let lastStatus = item.parentElement.parentElement.parentElement.parentElement

                      lastStatus.children[1].innerHTML = newStatus

                      let colorClass = ""
                      if (newStatus === 'new request') {
                        colorClass = 'gray'
                      } else if (newStatus === 'in progress') {
                        colorClass = 'orange'
                      } else if (newStatus === 'to be tested') {
                        colorClass = 'blue'
                      } else if (newStatus === 'completed') {
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
                      const newFlag = item.textContent.trim();
                      const change = await changeTask(taskId, null, newFlag)
                      const tasks = await getTasks(selectedProjectId);
                      renderTasks(tasks);
                      let lastFlag = item.parentElement.parentElement.parentElement.parentElement.children[2]
                      lastFlag.children[1].innerHTML = newFlag
                      let colorClass = ""
                      if (newFlag === 'urgent') {
                        colorClass = 'priority-flag-red'
                      } else if (newFlag === 'normal') {
                        colorClass = 'priority-flag-blue'
                      } else if (newFlag === 'high') {
                        colorClass = 'priority-flag-yellow'
                      } else if (newFlag === 'low') {
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


                //add comment
                const comment = document.querySelector('.comment-input')
                const commentBtn = document.querySelector('.comment-button')
                commentBtn && commentBtn.addEventListener('click', async (e) => {
                  try {
                    e.preventDefault()
                    const newComment = await changeTask(taskId, null, null, comment.value)
                  } catch (error) {
                    console.log(error, "something wrong !");
                  }
                })

              });

              //drag and drop
              const draggables = document.querySelectorAll(".column-task");
              const draggables2 = document.querySelectorAll(".task");
              const droppables = document.querySelectorAll(".column");
              const droppables2 = document.querySelectorAll(".list");

              dragAndDrop(draggables, draggables2, droppables, droppables2)

              //delete task
              const otherPoint = document.querySelectorAll(".otherPoint");
              otherPoint.forEach((e) => {
                const taskId = e.parentElement.parentElement.getAttribute('data-task-id')
                e.addEventListener("click", (event) => {
                  let html = `
      <ul class="other-list">
  <li class="deleteButton" >
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
  <path d="M14 4.98669C13.9867 4.98669 13.9667 4.98669 13.9467 4.98669C10.42 4.63336 6.9 4.50002 3.41333 4.85336L2.05333 4.98669C1.77333 5.01336 1.52667 4.81336 1.5 4.53336C1.47333 4.25336 1.67333 4.01336 1.94667 3.98669L3.30667 3.85336C6.85333 3.49336 10.4467 3.63336 14.0467 3.98669C14.32 4.01336 14.52 4.26002 14.4933 4.53336C14.4733 4.79336 14.2533 4.98669 14 4.98669Z" fill="#944242"/>
  <path d="M5.66667 4.31337C5.64 4.31337 5.61333 4.31337 5.58 4.30671C5.31333 4.26004 5.12667 4.00004 5.17333 3.73337L5.32 2.86004C5.42667 2.22004 5.57333 1.33337 7.12667 1.33337H8.87333C10.4333 1.33337 10.58 2.25337 10.68 2.86671L10.8267 3.73337C10.8733 4.00671 10.6867 4.26671 10.42 4.30671C10.1467 4.35337 9.88667 4.16671 9.84667 3.90004L9.7 3.03337C9.60667 2.45337 9.58667 2.34004 8.88 2.34004H7.13333C6.42667 2.34004 6.41333 2.43337 6.31333 3.02671L6.16 3.89337C6.12 4.14004 5.90667 4.31337 5.66667 4.31337Z" fill="#944242"/>
  <path d="M10.14 15.6667H5.86C3.53333 15.6667 3.44 14.3801 3.36667 13.3401L2.93333 6.62672C2.91333 6.35338 3.12667 6.11338 3.4 6.09338C3.68 6.08005 3.91333 6.28672 3.93333 6.56005L4.36667 13.2734C4.44 14.2867 4.46667 14.6667 5.86 14.6667H10.14C11.54 14.6667 11.5667 14.2867 11.6333 13.2734L12.0667 6.56005C12.0867 6.28672 12.3267 6.08005 12.6 6.09338C12.8733 6.11338 13.0867 6.34672 13.0667 6.62672L12.6333 13.3401C12.56 14.3801 12.4667 15.6667 10.14 15.6667Z" fill="#944242"/>
  <path d="M9.10667 12H6.88667C6.61333 12 6.38667 11.7733 6.38667 11.5C6.38667 11.2267 6.61333 11 6.88667 11H9.10667C9.38 11 9.60667 11.2267 9.60667 11.5C9.60667 11.7733 9.38 12 9.10667 12Z" fill="#944242"/>
  <path d="M9.66667 9.33337H6.33333C6.06 9.33337 5.83333 9.10671 5.83333 8.83337C5.83333 8.56004 6.06 8.33337 6.33333 8.33337H9.66667C9.94 8.33337 10.1667 8.56004 10.1667 8.83337C10.1667 9.10671 9.94 9.33337 9.66667 9.33337Z" fill="#944242"/>
</svg>
<p style="color:red;">
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
                    const taskNumbers = await countTasksStatus(tasks, taskNumber)
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
                      const change = await changeTask(taskId, null, newFlag)
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
      const taskNumbers = await countTasksStatus(tasks, taskNumber)
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
}