const modal = document.getElementById('task-modal');
const closeModal = document.getElementById('close-modal');
const inputBoxTitle = document.getElementById('task-title');
const inputBoxDesc = document.getElementById('task-desc');
const TaskPriority = document.getElementById('task-priority');
const TaskDeadline = document.getElementById('task-deadline');
const addTaskBtn = document.getElementById('add-task-btn');
let taskCounter = 0;
addTaskBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});
closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});
function AddTask() {
  let li = document.createElement("li");
  li.classList.add("border", "mt-4");
  li.setAttribute("draggable", "true");
  li.id = 'task-' + taskCounter;
  taskCounter++;
  li.addEventListener("dragstart", drag);
  let taskTitle = document.createElement("h3");
  taskTitle.textContent = inputBoxTitle.value;
  taskTitle.classList.add("font-bold", "text-white", "text-2xl");
  let taskDesc = document.createElement("p");
  taskDesc.textContent = inputBoxDesc.value;
  taskDesc.classList.add("text-white");
  let taskDeadline = document.createElement("p");
  taskDeadline.textContent = TaskDeadline.value ? `Deadline: ${TaskDeadline.value}` : "No deadline";
  taskDeadline.classList.add("text-gray-300", "text-sm", "italic");

  let taskPriority = TaskPriority.value;
  li.classList.add("p-4", "rounded", "mb-2", "text-white");
  if (taskPriority === "non-important") {
    li.classList.add("bg-green-500");
  } else if (taskPriority === "important") {
    li.classList.add("bg-yellow-500");
  } else if (taskPriority === "very-important") {
    li.classList.add("bg-red-950");
  }

  let editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("bg-blue-500", "text-white", "rounded", "px-2", "ml-2");
  editButton.addEventListener("click", ()=> editTask(li));

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("bg-rose-900", "text-white", "rounded", "px-2", "ml-2");
  deleteButton.addEventListener("click", ()=> deleteTask(li));

  li.appendChild(taskTitle);
  li.appendChild(taskDesc);
  li.appendChild(taskDeadline);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  document.getElementById("todo-list").appendChild(li);

  inputBoxTitle.value = '';
  inputBoxDesc.value = '';
  TaskPriority.value = 'non-important';
  TaskDeadline.value = '';
  modal.classList.add('hidden');
  updateCounters();
}
function editTask(taskItem) {
  const currentTitle = taskItem.querySelector("h3").textContent;
  const currentDesc = taskItem.querySelector("p").textContent;
  const currentPriority = taskItem.classList.contains("bg-red-500") ? "very-important" : taskItem.classList.contains("bg-yellow-500") ? "important" : "non-important";
  modal.classList.remove('hidden');
  inputBoxTitle.value = currentTitle;
  inputBoxDesc.value = currentDesc;
  TaskPriority.value = currentPriority;
  const submitButton = document.querySelector("#task-form button[type='submit']");
  submitButton.textContent = "Update Task";
  submitButton.onclick = (event) => {
    event.preventDefault();
    taskItem.querySelector("h3").textContent = inputBoxTitle.value;
    taskItem.querySelector("p").textContent = inputBoxDesc.value;
    taskItem.classList.remove("bg-green-500", "bg-yellow-500", "bg-red-950");
    const newPriority = TaskPriority.value;

    if (newPriority === "non-important") {
      taskItem.classList.add("bg-green-500");
    } else if (newPriority === "important") {
      taskItem.classList.add("bg-yellow-500");
    } else if (newPriority === "very-important") {
      taskItem.classList.add("bg-red-950");
    }

    inputBoxTitle.value = '';
    inputBoxDesc.value = '';
    TaskPriority.value = 'non-important';
    modal.classList.add('hidden');

    submitButton.textContent = "Add Task";
    submitButton.onclick = AddTask;

    updateCounters();
  };
}

function deleteTask(taskItem){
  taskItem.remove();
  updateCounters();
}
function allowDrop(event) {
  event.preventDefault();
}
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}
function drop(event) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData("text");
  const taskItem = document.getElementById(taskId);

  if (event.target.tagName === 'UL' || event.target.tagName === 'LI') {
    event.target.appendChild(taskItem);
    updateCounters();
  }
}
function updateCounters(){
  document.getElementById("todo-section-count").textContent = document.getElementById("todo-list").children.length;
  document.getElementById("doing-section-count").textContent = document.getElementById("doing-list").children.length;
  document.getElementById("done-section-count").textContent = document.getElementById("done-list").children.length;
}
updateCounters();
