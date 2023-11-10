import { changeTask } from "../model.js"
let taskId = 0

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
    console.log(taskId, "taskid");
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
      console.log(status, taskId);
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
      console.log(status, taskId);
      status && taskId && await changeTask(taskId, status)
    });
  }); 
}

