import { translateDate } from "./translateDate.js"
const clearElement = (element) => {
  element.innerHTML = "";
};

const createTaskHtml = (task, flagClass) => {
  return `
  <div class="task-content">
    <svg
    class="dragIcon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M14 18.5C14 19.0523 14.4477 19.5 15 19.5C15.5523 19.5 16 19.0523 16 18.5C16 17.9477 15.5523 17.5 15 17.5C14.4477 17.5 14 17.9477 14 18.5Z"
        stroke="#BABABA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 18.5C8 19.0523 8.44772 19.5 9 19.5C9.55228 19.5 10 19.0523 10 18.5C10 17.9477 9.55228 17.5 9 17.5C8.44772 17.5 8 17.9477 8 18.5Z"
        stroke="#BABABA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 12.5C14 13.0523 14.4477 13.5 15 13.5C15.5523 13.5 16 13.0523 16 12.5C16 11.9477 15.5523 11.5 15 11.5C14.4477 11.5 14 11.9477 14 12.5Z"
        stroke="#BABABA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 12.5C8 13.0523 8.44772 13.5 9 13.5C9.55228 13.5 10 13.0523 10 12.5C10 11.9477 9.55228 11.5 9 11.5C8.44772 11.5 8 11.9477 8 12.5Z"
        stroke="#BABABA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 6.5C14 7.05228 14.4477 7.5 15 7.5C15.5523 7.5 16 7.05228 16 6.5C16 5.94772 15.5523 5.5 15 5.5C14.4477 5.5 14 5.94772 14 6.5Z"
        stroke="#BABABA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 6.5C8 7.05228 8.44772 7.5 9 7.5C9.55228 7.5 10 7.05228 10 6.5C10 5.94772 9.55228 5.5 9 5.5C8.44772 5.5 8 5.94772 8 6.5Z"
        stroke="#BABABA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M14.7695 12.3079L10.3121 8.59346C9.79109 8.15924 9 8.52976 9 9.20803V15.792C9 16.4702 9.79109 16.8408 10.3121 16.4065L14.7695 12.6921C14.8895 12.5921 14.8895 12.4079 14.7695 12.3079Z"
        fill="#AFAFAF"
      />
    </svg>
    <svg

      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="11"
      viewBox="0 0 10 11"
      fill="none"
    >
      <circle cx="5" cy="5.5" r="5" fill="#C5C5C5" />
    </svg>
    <p class="task-title">${task.attributes.title}</p>
  </div>
  <div class="task-detail">
    <img src="public/icons/Avatar group 2.png"/>
    <p style="width: 18%;
    margin-left: 17%;">${translateDate(task.attributes.createdAt)}</p>
    <svg class="priority-flag ${flagClass}" style="width: 50% " xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
  <path d="M1.25 11.4286V1C1.25 0.764298 1.25 0.646447 1.32322 0.573223C1.39645 0.5 1.5143 0.5 1.75 0.5H13.9849C14.5199 0.5 14.7874 0.5 14.8499 0.658113C14.9124 0.816226 14.7172 0.99912 14.3267 1.36491L9.72831 5.67236C9.58225 5.80918 9.50922 5.87759 9.50922 5.96429C9.50922 6.05098 9.58225 6.11939 9.72831 6.25621L14.3267 10.5637C14.7172 10.9295 14.9124 11.1123 14.8499 11.2705C14.7874 11.4286 14.5199 11.4286 13.9849 11.4286H1.25ZM1.25 11.4286V17.5" stroke="#AFAFAF" stroke-linecap="round"/>
</svg>
   <div class="flags-list">
   </div>
    <svg
    class="otherPoint"
      style="width: 15%"
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="3"
      viewBox="0 0 9 3"
      fill="none"
    >
      <circle
        cx="1.75"
        cy="1.50001"
        r="1.16332"
        transform="rotate(-90 1.75 1.50001)"
        fill="#AFAFAF"
      />
      <circle
        cx="4.75"
        cy="1.50001"
        r="1.16332"
        transform="rotate(-90 4.75 1.50001)"
        fill="#AFAFAF"
      />
      <circle
        cx="7.75"
        cy="1.50001"
        r="1.16332"
        transform="rotate(-90 7.75 1.50001)"
        fill="#AFAFAF"
      />
    </svg>
    <div class="otherParams" ></div>
  </div>

  `;
};

const createBoardHtml = (task, flagClass) => {
  return `
  <p>Page 1 > Page 2</p>
    <div style="
        display: flex;
        align-items: center;
        gap: 150px;
        margin: 0;">
        <h3 class="task-title">${task.attributes.title}</h3>
        <svg class="priority-flag ${flagClass}" style="width: 50% " xmlns="http://www.w3.org/2000/svg" width="17"
            height="18" viewBox="0 0 17 18" fill="none">
            <path
                d="M1.25 11.4286V1C1.25 0.764298 1.25 0.646447 1.32322 0.573223C1.39645 0.5 1.5143 0.5 1.75 0.5H13.9849C14.5199 0.5 14.7874 0.5 14.8499 0.658113C14.9124 0.816226 14.7172 0.99912 14.3267 1.36491L9.72831 5.67236C9.58225 5.80918 9.50922 5.87759 9.50922 5.96429C9.50922 6.05098 9.58225 6.11939 9.72831 6.25621L14.3267 10.5637C14.7172 10.9295 14.9124 11.1123 14.8499 11.2705C14.7874 11.4286 14.5199 11.4286 13.9849 11.4286H1.25ZM1.25 11.4286V17.5"
                stroke="#AFAFAF" stroke-linecap="round" />
        </svg>
    </div>
    <p>
        ${task.attributes.description}
    </p>
    <div class="column-task-tags">
        <div class="column-task-tag orange">
            <p>Social Media</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                <path
                    d="M8.24998 3.24998C8.16403 3.16405 8.04747 3.11578 7.92594 3.11578C7.8044 3.11578 7.68785 3.16405 7.60189 3.24998L5.49998 5.35189L3.39806 3.24998C3.31211 3.16405 3.19555 3.11578 3.07402 3.11578C2.95249 3.11578 2.83593 3.16405 2.74998 3.24998C2.66405 3.33593 2.61578 3.45249 2.61578 3.57402C2.61578 3.69555 2.66405 3.81211 2.74998 3.89806L4.85189 5.99998L2.74998 8.10189C2.66405 8.18785 2.61578 8.3044 2.61578 8.42594C2.61578 8.54747 2.66405 8.66403 2.74998 8.74998C2.83593 8.8359 2.95249 8.88417 3.07402 8.88417C3.19555 8.88417 3.31211 8.8359 3.39806 8.74998L5.49998 6.64806L7.60189 8.74998C7.68785 8.8359 7.8044 8.88417 7.92594 8.88417C8.04747 8.88417 8.16403 8.8359 8.24998 8.74998C8.3359 8.66403 8.38417 8.54747 8.38417 8.42594C8.38417 8.3044 8.3359 8.18785 8.24998 8.10189L6.14806 5.99998L8.24998 3.89806C8.3359 3.81211 8.38417 3.69555 8.38417 3.57402C8.38417 3.45249 8.3359 3.33593 8.24998 3.24998Z"
                    fill="#34A174" />
            </svg>
        </div>
        <div class="column-task-tag blue">
            <p>Design</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                <path
                    d="M8.24998 3.24998C8.16403 3.16405 8.04747 3.11578 7.92594 3.11578C7.8044 3.11578 7.68785 3.16405 7.60189 3.24998L5.49998 5.35189L3.39806 3.24998C3.31211 3.16405 3.19555 3.11578 3.07402 3.11578C2.95249 3.11578 2.83593 3.16405 2.74998 3.24998C2.66405 3.33593 2.61578 3.45249 2.61578 3.57402C2.61578 3.69555 2.66405 3.81211 2.74998 3.89806L4.85189 5.99998L2.74998 8.10189C2.66405 8.18785 2.61578 8.3044 2.61578 8.42594C2.61578 8.54747 2.66405 8.66403 2.74998 8.74998C2.83593 8.8359 2.95249 8.88417 3.07402 8.88417C3.19555 8.88417 3.31211 8.8359 3.39806 8.74998L5.49998 6.64806L7.60189 8.74998C7.68785 8.8359 7.8044 8.88417 7.92594 8.88417C8.04747 8.88417 8.16403 8.8359 8.24998 8.74998C8.3359 8.66403 8.38417 8.54747 8.38417 8.42594C8.38417 8.3044 8.3359 8.18785 8.24998 8.10189L6.14806 5.99998L8.24998 3.89806C8.3359 3.81211 8.38417 3.69555 8.38417 3.57402C8.38417 3.45249 8.3359 3.33593 8.24998 3.24998Z"
                    fill="#34A174" />
            </svg>
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
            <p>${translateDate(task.attributes.createdAt)}</p>
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

  tasks && tasks.forEach((task) => {
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


    const listHtml = createTaskHtml(task, flagClass);
    const boardHtml = createBoardHtml(task, flagClass);

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
