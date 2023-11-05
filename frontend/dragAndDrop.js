document.addEventListener("DOMContentLoaded", () => {
    const draggables = document.querySelectorAll(".example-draggable");
    const dropzone = document.querySelector(".example-dropzone");
    const origin = document.querySelector(".example-origin");
  
    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", (event) => onDragStart(event));
    });
  
    dropzone.addEventListener("dragover", (event) => onDragOver(event));
    dropzone.addEventListener("drop", (event) => onDrop(event));
  
    origin.addEventListener("dragover", (event) => onDragOver(event));
    origin.addEventListener("drop", (event) => onDrop(event));
  });
  
  function onDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.currentTarget.style.backgroundColor = "yellow";
  }
  
  function onDragOver(event) {
    event.preventDefault();
  }
  
  function onDrop(event) {
    const id = event.dataTransfer.getData("text");
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
  
    if (dropzone.classList.contains("example-dropzone")) {
      dropzone.appendChild(draggableElement);
    } else if (dropzone.classList.contains("example-origin")) {
      const origin = document.querySelector(".example-origin");
      origin.appendChild(draggableElement);
    }
  
    event.dataTransfer.clearData();
  }
  