import { changeTask, getTasks } from "../model.js"

const taskNumber = {
  newRequest: 0,
  inProgress: 0,
  toBeTested: 0,
  completed: 0
}

import { countTasksStatus } from "./countTasksStatus.js"

let taskId = 0
const id = JSON.parse(localStorage.getItem('projectId'))
const getData = async () => {
  const tasksdata = await getTasks(id)
  return tasksdata
}

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();
    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });
  return closestTask;
};

export const dragAndDrop = (draggables, draggables2, droppables, droppables2) => {

  draggables.forEach((task) => {
    taskId = task.getAttribute('data-task-id');

    task.addEventListener("dragstart", () => {
      task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", () => {
      task.classList.remove("is-dragging");
    });
  });
  draggables2.forEach((task) => {
    task.addEventListener("dragstart", () => {
      task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", () => {
      task.classList.remove("is-dragging");
    });
  });
  droppables.forEach((zone) => {
    zone.addEventListener("dragover", async (e) => {
      e.preventDefault();
      const selected = e.target.closest(".column").getAttribute("id")
      let status = ""
      if (selected === "column1") {
        status = "new request"
      } else if (selected === "column2") {
        status = "in progress"
      } else if (selected === "column3") {
        status = "to be tested"
      } else if (selected === "column4") {
        status = "completed"
      }

      status && taskId && await changeTask(taskId, status)

      const bottomTask = insertAboveTask(zone, e.clientY);
      const curTask = document.querySelector(".is-dragging");

      if (!bottomTask) {
        zone.appendChild(curTask);
      } else {
        zone.insertBefore(curTask, bottomTask);
      }
    });
  });
  droppables2.forEach((zone) => {
    zone.addEventListener("dragover", async (e) => {
      e.preventDefault();
      const selected = e.target.closest(".list").getAttribute("id")

      let status = ""
      if (selected === "list1") {
        status = "new request"
      } else if (selected === "list2") {
        status = "in progress"
      } else if (selected === "list3") {
        status = "to be tested"
      } else if (selected === "list4") {
        status = "completed"
      }

      const bottomTask = insertAboveTask(zone, e.clientY);
      const curTask = document.querySelector(".is-dragging");
      if (!bottomTask) {
        zone.appendChild(curTask);
      } else {
        zone.insertBefore(curTask, bottomTask);
      }

      status && taskId && await changeTask(taskId, status)
      const tasks = await getData()
      const taskNumbers = await countTasksStatus(tasks, taskNumber)
      const newRequestNumber = document.querySelector("#new-requestNumber")
      const inprogressNumber = document.querySelector("#in-progressNumber")
      const tobetestedNumber = document.querySelector("#to-be-testedNumber")
      const completedNumber = document.querySelector("#completedNumber")
      newRequestNumber.innerHTML = taskNumbers.newRequest
      inprogressNumber.innerHTML = taskNumbers.inProgress
      tobetestedNumber.innerHTML = taskNumbers.toBeTested
      completedNumber.innerHTML = taskNumbers.completed
    });
  });
}

