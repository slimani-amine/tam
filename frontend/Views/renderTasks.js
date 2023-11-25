import { getProject, getTask, getUser, getUsers } from "../model.js";
import { translateDate } from "./translateDate.js"

const clearElement = (element) => {
  element.innerHTML = "";
};
const createTaskHtml = (task, flagClass, taskAss) => {
  return `
  <div class="task-content">
        <svg class="dragIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path
                d="M14 18.5C14 19.0523 14.4477 19.5 15 19.5C15.5523 19.5 16 19.0523 16 18.5C16 17.9477 15.5523 17.5 15 17.5C14.4477 17.5 14 17.9477 14 18.5Z"
                stroke="#BABABA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M8 18.5C8 19.0523 8.44772 19.5 9 19.5C9.55228 19.5 10 19.0523 10 18.5C10 17.9477 9.55228 17.5 9 17.5C8.44772 17.5 8 17.9477 8 18.5Z"
                stroke="#BABABA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M14 12.5C14 13.0523 14.4477 13.5 15 13.5C15.5523 13.5 16 13.0523 16 12.5C16 11.9477 15.5523 11.5 15 11.5C14.4477 11.5 14 11.9477 14 12.5Z"
                stroke="#BABABA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M8 12.5C8 13.0523 8.44772 13.5 9 13.5C9.55228 13.5 10 13.0523 10 12.5C10 11.9477 9.55228 11.5 9 11.5C8.44772 11.5 8 11.9477 8 12.5Z"
                stroke="#BABABA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M14 6.5C14 7.05228 14.4477 7.5 15 7.5C15.5523 7.5 16 7.05228 16 6.5C16 5.94772 15.5523 5.5 15 5.5C14.4477 5.5 14 5.94772 14 6.5Z"
                stroke="#BABABA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M8 6.5C8 7.05228 8.44772 7.5 9 7.5C9.55228 7.5 10 7.05228 10 6.5C10 5.94772 9.55228 5.5 9 5.5C8.44772 5.5 8 5.94772 8 6.5Z"
                stroke="#BABABA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path
                d="M14.7695 12.3079L10.3121 8.59346C9.79109 8.15924 9 8.52976 9 9.20803V15.792C9 16.4702 9.79109 16.8408 10.3121 16.4065L14.7695 12.6921C14.8895 12.5921 14.8895 12.4079 14.7695 12.3079Z"
                fill="#AFAFAF" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
            <circle cx="5" cy="5.5" r="5" fill="#C5C5C5" />
        </svg>
        <p class="task-title">${task.title}</p>
        <div class="column-task-tags">
            <div style="display:flex ; align-items: center; gap:10px">
                <div class="task-details-content-tags">
                    ${task.tags.data && task.tags.data.map((tag) => {
    return `<div class="task-details-content-tag  ${tag.attributes.color}" tag-id="${tag.id}">
                        <p>${tag.attributes.tag}</p>
                        <svg class="delete-tag" xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                            viewBox="0 0 12 12" fill="none">
                            <path
                                d="M8.46098 3.37077C8.37503 3.28484 8.25847 3.23657 8.13693 3.23657C8.0154 3.23657 7.89884 3.28484 7.81289 3.37077L5.71098 5.47268L3.60906 3.37077C3.52311 3.28484 3.40655 3.23657 3.28502 3.23657C3.16348 3.23657 3.04693 3.28484 2.96098 3.37077C2.87505 3.45672 2.82678 3.57327 2.82678 3.69481C2.82678 3.81634 2.87505 3.9329 2.96098 4.01885L5.06289 6.12077L2.96098 8.22268C2.87505 8.30863 2.82678 8.42519 2.82678 8.54672C2.82678 8.66826 2.87505 8.78482 2.96098 8.87077C3.04693 8.95669 3.16348 9.00496 3.28502 9.00496C3.40655 9.00496 3.52311 8.95669 3.60906 8.87077L5.71098 6.76885L7.81289 8.87077C7.89884 8.95669 8.0154 9.00496 8.13693 9.00496C8.25847 9.00496 8.37503 8.95669 8.46098 8.87077C8.5469 8.78482 8.59517 8.66826 8.59517 8.54672C8.59517 8.42519 8.5469 8.30863 8.46098 8.22268L6.35906 6.12077L8.46098 4.01885C8.5469 3.9329 8.59517 3.81634 8.59517 3.69481C8.59517 3.57327 8.5469 3.45672 8.46098 3.37077Z"
                                fill="#F51F45" />
                        </svg>
                    </div>`
  })}


                </div>

            </div>

            <svg class="choose-tags" style="margin-top:2%" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                viewBox="0 0 14 14" fill="none">
                <g clip-path="url(#clip0_2_3124)">
                    <path
                        d="M11.9333 2.65711L7.28358 0.073524C7.19687 0.0253056 7.0993 0 7.00008 0C6.90087 0 6.80329 0.0253056 6.71658 0.073524L2.06683 2.65711C1.79407 2.80865 1.56678 3.03037 1.40853 3.2993C1.25027 3.56822 1.16679 3.87457 1.16675 4.18661V11.0834C1.16767 11.8566 1.47526 12.598 2.02204 13.1447C2.56882 13.6915 3.31015 13.9991 4.08341 14H9.91675C10.69 13.9991 11.4313 13.6915 11.9781 13.1447C12.5249 12.598 12.8325 11.8566 12.8334 11.0834V4.18661C12.8334 3.87457 12.7499 3.56822 12.5916 3.2993C12.4334 3.03037 12.2061 2.80865 11.9333 2.65711ZM11.6667 11.0834C11.6667 11.5475 11.4824 11.9926 11.1542 12.3208C10.826 12.649 10.3809 12.8334 9.91675 12.8334H4.08341C3.61929 12.8334 3.17417 12.649 2.84598 12.3208C2.51779 11.9926 2.33341 11.5475 2.33341 11.0834V4.18661C2.33316 4.08226 2.36089 3.97975 2.41373 3.88977C2.46657 3.79979 2.54258 3.72563 2.63383 3.67502L7.00008 1.25069L11.3669 3.67502C11.4581 3.72571 11.5339 3.7999 11.5867 3.88988C11.6394 3.97985 11.6671 4.08232 11.6667 4.18661V11.0834Z"
                        fill="#666666" />
                    <path
                        d="M7 4.9585C7.48325 4.9585 7.875 4.56675 7.875 4.0835C7.875 3.60025 7.48325 3.2085 7 3.2085C6.51675 3.2085 6.125 3.60025 6.125 4.0835C6.125 4.56675 6.51675 4.9585 7 4.9585Z"
                        fill="#666666" />
                </g>
                <defs>
                    <clipPath id="clip0_2_3124">
                        <rect width="14" height="14" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            <div class="tags-lists">
            </div>
        </div>
        <div class="task-detail">
            <div class="avatars-assignee">
                ${taskAss.length > 0 ? taskAss && taskAss.map((user) => {
    return `<img class="avatar-assignee assignee-vide"
                    src="${user.avatar ? `http://localhost:1337${user.avatar.url}` : user.image}" alt="">
                `;
  }) :
      `<svg class="assignee-vide" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                    viewBox="0 0 18 18" fill="none">
                    <circle cx="9.25" cy="5.45837" r="3.75" stroke="#AFAFAF" stroke-linecap="round" />
                    <path
                        d="M1.86565 14.6261C2.53542 12.258 4.97413 11.125 7.43509 11.125H11.0649C13.5259 11.125 15.9646 12.258 16.6343 14.6261C16.7964 15.1992 16.9255 15.8281 16.9921 16.5014C17.0465 17.051 16.5939 17.5 16.0417 17.5H2.45833C1.90604 17.5 1.45351 17.051 1.50789 16.5014C1.57452 15.8281 1.70355 15.1992 1.86565 14.6261Z"
                        stroke="#AFAFAF" stroke-linecap="round" />
                </svg>`
    }
                <div class="assignee-list-render">
                </div>
            </div>
            <div class="assignee-list-render">
            </div>
            <p style="width: 25%;
            margin-left: 25%;">${translateDate(task.createdAt)}</p>
            <svg class="priority-flag ${flagClass}" style="width: 50% " xmlns="http://www.w3.org/2000/svg" width="17"
                height="18" viewBox="0 0 17 18" fill="none">
                <path
                    d="M1.25 11.4286V1C1.25 0.764298 1.25 0.646447 1.32322 0.573223C1.39645 0.5 1.5143 0.5 1.75 0.5H13.9849C14.5199 0.5 14.7874 0.5 14.8499 0.658113C14.9124 0.816226 14.7172 0.99912 14.3267 1.36491L9.72831 5.67236C9.58225 5.80918 9.50922 5.87759 9.50922 5.96429C9.50922 6.05098 9.58225 6.11939 9.72831 6.25621L14.3267 10.5637C14.7172 10.9295 14.9124 11.1123 14.8499 11.2705C14.7874 11.4286 14.5199 11.4286 13.9849 11.4286H1.25ZM1.25 11.4286V17.5"
                    stroke="#AFAFAF" stroke-linecap="round" />
            </svg>
            <div class="flags-list">
            </div>
            <svg class="otherPoint" style="width: 15%" xmlns="http://www.w3.org/2000/svg" width="9" height="3"
                viewBox="0 0 9 3" fill="none">
                <circle cx="1.75" cy="1.50001" r="1.16332" transform="rotate(-90 1.75 1.50001)" fill="#AFAFAF" />
                <circle cx="4.75" cy="1.50001" r="1.16332" transform="rotate(-90 4.75 1.50001)" fill="#AFAFAF" />
                <circle cx="7.75" cy="1.50001" r="1.16332" transform="rotate(-90 7.75 1.50001)" fill="#AFAFAF" />
            </svg>
            <div class="otherParams"></div>
        </div>
    </div>
  `;
};
const createBoardHtml = (task, flagClass) => {
  return `
    <div style="
        display: flex;
        align-items: center;
        gap: 150px;
        margin: 0;">
        <h3 class="task-title">${task.title}</h3>
        <svg class="priority-flag ${flagClass}" style="width: 50% " xmlns="http://www.w3.org/2000/svg" width="17"
            height="18" viewBox="0 0 17 18" fill="none">
            <path
                d="M1.25 11.4286V1C1.25 0.764298 1.25 0.646447 1.32322 0.573223C1.39645 0.5 1.5143 0.5 1.75 0.5H13.9849C14.5199 0.5 14.7874 0.5 14.8499 0.658113C14.9124 0.816226 14.7172 0.99912 14.3267 1.36491L9.72831 5.67236C9.58225 5.80918 9.50922 5.87759 9.50922 5.96429C9.50922 6.05098 9.58225 6.11939 9.72831 6.25621L14.3267 10.5637C14.7172 10.9295 14.9124 11.1123 14.8499 11.2705C14.7874 11.4286 14.5199 11.4286 13.9849 11.4286H1.25ZM1.25 11.4286V17.5"
                stroke="#AFAFAF" stroke-linecap="round" />
        </svg>
    </div>
    <p>
        ${task.description}
    </p>
    <div class="column-task-tags">
        <div style="display:flex ;    align-items: center; gap:10px">
        <div class="task-details-content-tags">
            ${task.tags.data && task.tags.data.map((tag) => {
    return `<div class="task-details-content-tag ${tag.attributes.color}">
                <p>${tag.attributes.tag}</p>
                <svg class="delete-tag" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                        d="M8.46098 3.37077C8.37503 3.28484 8.25847 3.23657 8.13693 3.23657C8.0154 3.23657 7.89884 3.28484 7.81289 3.37077L5.71098 5.47268L3.60906 3.37077C3.52311 3.28484 3.40655 3.23657 3.28502 3.23657C3.16348 3.23657 3.04693 3.28484 2.96098 3.37077C2.87505 3.45672 2.82678 3.57327 2.82678 3.69481C2.82678 3.81634 2.87505 3.9329 2.96098 4.01885L5.06289 6.12077L2.96098 8.22268C2.87505 8.30863 2.82678 8.42519 2.82678 8.54672C2.82678 8.66826 2.87505 8.78482 2.96098 8.87077C3.04693 8.95669 3.16348 9.00496 3.28502 9.00496C3.40655 9.00496 3.52311 8.95669 3.60906 8.87077L5.71098 6.76885L7.81289 8.87077C7.89884 8.95669 8.0154 9.00496 8.13693 9.00496C8.25847 9.00496 8.37503 8.95669 8.46098 8.87077C8.5469 8.78482 8.59517 8.66826 8.59517 8.54672C8.59517 8.42519 8.5469 8.30863 8.46098 8.22268L6.35906 6.12077L8.46098 4.01885C8.5469 3.9329 8.59517 3.81634 8.59517 3.69481C8.59517 3.57327 8.5469 3.45672 8.46098 3.37077Z"
                        fill="#F51F45" />
                </svg>
            </div>`
  })}
        <div class="tags-lists">
        </div>
        </div>
    </div>
    
    <div class="column-task-other" style="display: flex">
        <div style="display: flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <rect x="14.875" y="12.0417" width="4.25" height="4.25" rx="2.125" transform="rotate(90 14.875 12.0417)"
                    stroke="#666666" stroke-width="0.75" />
                <rect x="2.125" y="4.95834" width="4.25" height="4.25" rx="2.125" transform="rotate(-90 2.125 4.95834)"
                    stroke="#666666" stroke-width="0.75" />
                <path
                    d="M4.25 4.95834V10.1667C4.25 12.0523 4.25 12.9951 4.83579 13.5809C5.42157 14.1667 6.36438 14.1667 8.25 14.1667H10.625"
                    stroke="#666666" stroke-width="0.75" />
            </svg>
            <span>6</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M4.5 0.642853L4.5 8.35714" stroke="#666666" stroke-width="0.75" stroke-linecap="round" />
                <path d="M8.35712 4.5L0.64283 4.5" stroke="#666666" stroke-width="0.75" stroke-linecap="round" />
            </svg>
        </div>
        <div style="display: flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
                <path
                    d="M2.07141 6.5C2.07141 4.61438 2.07141 3.67157 2.6572 3.08579C3.24298 2.5 4.18579 2.5 6.07141 2.5H15.0714C16.957 2.5 17.8998 2.5 18.4856 3.08579C19.0714 3.67157 19.0714 4.61438 19.0714 6.5V12.5C19.0714 14.3856 19.0714 15.3284 18.4856 15.9142C17.8998 16.5 16.957 16.5 15.0714 16.5H6.07141C4.18579 16.5 3.24298 16.5 2.6572 15.9142C2.07141 15.3284 2.07141 14.3856 2.07141 12.5V6.5Z"
                    stroke="#666666" />
                <path d="M2.07141 7.5L19.0714 7.5" stroke="#666666" stroke-linecap="round" />
                <path d="M7.07141 12.5H14.0714" stroke="#666666" stroke-linecap="round" />
                <path d="M7.07141 0.5L7.07141 4.5" stroke="#666666" stroke-linecap="round" />
                <path d="M14.0714 0.5L14.0714 4.5" stroke="#666666" stroke-linecap="round" />
            </svg>
            <p>${translateDate(task.createdAt)}</p>
        </div>
    </div>
  `;
};
const createDivForLists = (task) => {
  const divList = document.createElement('div');
  divList.classList.add("task");
  divList.classList.add(`${task.id}`);
  divList.setAttribute('data-task-id', `${task.id}`);
  divList.setAttribute('draggable', 'true');
  return divList
}
const createDivForColumns = (task) => {
  const divColumn = document.createElement('div');
  divColumn.classList.add("column-task");
  divColumn.setAttribute('data-task-id', `${task.id}`);
  divColumn.setAttribute('draggable', 'true');
  return divColumn
}

const renderTasks = (tasks) => {
  const newRequest = document.querySelector('#new-request');
  const inProgress = document.querySelector('#in-progress');
  const toBeTested = document.querySelector('#to-be-tested');
  const completed = document.querySelector('#completed');
  const newRequestBord = document.querySelector('#new-request-board');
  const inProgressBord = document.querySelector('#in-progress-bord');
  const toBeTestedBord = document.querySelector('#to-be-tested-bord');
  const completedBord = document.querySelector('#completed-bord');

  clearElement(newRequest);
  clearElement(inProgress);
  clearElement(toBeTested);
  clearElement(completed);
  clearElement(newRequestBord);
  clearElement(inProgressBord);
  clearElement(toBeTestedBord);
  clearElement(completedBord);

  tasks && tasks.forEach(async (task) => {
    let flagClass = '';
    if (task.attributes.flag === 'urgent') {
      flagClass = 'priority-flag-red';
    } else if (task.attributes.flag === 'normal') {
      flagClass = 'priority-flag-blue';
    } else if (task.attributes.flag === 'high') {
      flagClass = 'priority-flag-yellow';
    } else if (task.attributes.flag === 'low') {
      flagClass = 'priority-flag-gray';
    }


    let taskAss = []
    tasks && tasks.map(async (e) => {
      let task = await getTask(e.id)
      task.users_assignees.data.map(async (e) => {
        let user = await getUser(e.id)
        taskAss.push(user)
      })
    })

    const taskData = await getTask(task.id)
    const listHtml = createTaskHtml(taskData, flagClass, taskAss);
    const boardHtml = createBoardHtml(taskData, flagClass);

    if (task.attributes.status === 'new request') {
      let div = createDivForLists(task)
      newRequest.appendChild(div);
      div.innerHTML = listHtml;

      let divCol = createDivForColumns(task)
      newRequestBord.appendChild(divCol);
      divCol.innerHTML = boardHtml;
    }
    else if (task.attributes.status === 'in progress') {
      let div = createDivForLists(task)
      inProgress.appendChild(div);
      div.innerHTML = listHtml;

      let divCol = createDivForColumns(task)
      inProgressBord.appendChild(divCol);
      divCol.innerHTML = boardHtml;
    }
    else if (task.attributes.status === 'to be tested') {
      let div = createDivForLists(task)
      toBeTested.appendChild(div);
      div.innerHTML = listHtml;

      let divCol = createDivForColumns(task)
      toBeTestedBord.appendChild(divCol);
      divCol.innerHTML = boardHtml;
    }
    else if (task.attributes.status === 'completed') {
      let div = createDivForLists(task)
      completed.appendChild(div);
      div.innerHTML = listHtml;

      let divCol = createDivForColumns(task)
      completedBord.appendChild(divCol);
      divCol.innerHTML = boardHtml;
    }
  });

};

export default renderTasks;