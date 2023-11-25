import { changeTask, getTasks } from "../model.js";
import { countTasksStatus } from "./countTasksStatus.js";

let taskId = 0;
let status = "";
const id = JSON.parse(localStorage.getItem("projectId"));

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      await func(...args);
    }, delay);
  };
};

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

export const dragAndDrop = async (
  draggables,
  draggables2,
  droppables,
  droppables2
) => {
  const tasks = await getTasks(id);
  let changed = 0;

  draggables.forEach((task) => {
    taskId = task.getAttribute("data-task-id");
    task.addEventListener("dragstart", () => {
      task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", () => {
      task.classList.remove("is-dragging");
      updateDraggables2();
    });
  });

  function updateDraggables2() {
    const modifiedTask = document.querySelector(".is-dragging");
    const clonedTask = modifiedTask.cloneNode(true);
    draggables2.appendChild(clonedTask);
  }

  function countStatus(tasks) {
    const taskNumbers = countTasksStatus(tasks);
    const newRequestNumber = document.querySelector("#new-requestNumber");
    const inprogressNumber = document.querySelector("#in-progressNumber");
    const tobetestedNumber = document.querySelector("#to-be-testedNumber");
    const completedNumber = document.querySelector("#completedNumber");

    newRequestNumber.innerHTML = taskNumbers.newRequest;
    inprogressNumber.innerHTML = taskNumbers.inProgress;
    tobetestedNumber.innerHTML = taskNumbers.toBeTested;
    completedNumber.innerHTML = taskNumbers.completed;
  }

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
      const selected = e.target.closest(".column").getAttribute("id");
      if (selected === "column1") {
        status = "new request";
      } else if (selected === "column2") {
        status = "in progress";
      } else if (selected === "column3") {
        status = "to be tested";
      } else if (selected === "column4") {
        status = "completed";
      }

      const bottomTask = insertAboveTask(zone, e.clientY);
      const curTask = document.querySelector(".is-dragging");

      if (curTask && !bottomTask) {
        zone.appendChild(curTask);
      } else if (curTask && bottomTask) {
        zone.insertBefore(curTask, bottomTask);
      }
    });
  });

  droppables2.forEach(async (zone) => {
    zone.addEventListener("dragover", async (e) => {
      console.log(e.target);
      e.preventDefault();
      const selected = e.target.closest(".list").getAttribute("id");

      const id = JSON.parse(localStorage.getItem("projectId"));

      const changeStatus = (tasks) => {
        if (selected === "list1") {
          tasks.forEach((task) => {
            task.attributes.status = "new request";
          });
        } else if (selected === "list2") {
          tasks.forEach((task) => {
            task.attributes.status = "in progress";
          });
        } else if (selected === "list3") {
          tasks.forEach((task) => {
            task.attributes.status = "to be tested";
          });
        } else if (selected === "list4") {
          tasks.forEach((task) => {
            task.attributes.status = "completed";
          });
        }
      };
      const debouncedchangeStatus = debounce(changeStatus, 700);
      debouncedchangeStatus(tasks);
      changed = 1;
      const taskNumbers = countTasksStatus(tasks);
      const bottomTask = insertAboveTask(zone, e.clientY);
      const curTask = document.querySelector(".is-dragging");
      console.log(bottomTask,);
      if (curTask && !bottomTask) {
        zone.appendChild(curTask);
      } else if (curTask && bottomTask) {
        zone.insertBefore(curTask, bottomTask);
      }
    });
  });
};
