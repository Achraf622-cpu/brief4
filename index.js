const modal = document.getElementById('task-modal');
const closeModal = document.getElementById('close-modal');
const inputBoxTitle = document.getElementById('task-title');
const inputBoxDesc = document.getElementById('task-desc');
const TaskPriority = document.getElementById('task-priority');
const addTaskBtn = document.getElementById('add-task-btn');
 






addTaskBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});
closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

function AddTask() {
  let li = document.createElement("li");


  li.setAttribute("draggable", "true");


  li.addEventListener("dragstart", drag);

  let taskTitle = document.createElement("h3");


  taskTitle.textContent = inputBoxTitle.value;

  taskTitle.classList.add("font-bold", "text-teal-400");

  let taskDesc = document.createElement("p");

  taskDesc.textContent = inputBoxDesc.value;

  taskDesc.classList.add("text-white");

  let taskPriority = TaskPriority.value;
  li.classList.add("p-4", "rounded", "mb-2", "text-white");

  if (taskPriority === "non-important") {

    li.classList.add("bg-green-500");

  } else if (taskPriority === "important") {

    li.classList.add("bg-yellow-500");

  } else if (taskPriority === "very-important") {

    li.classList.add("bg-red-500");
  }

 
  li.appendChild(taskTitle);

  li.appendChild(taskDesc);


  document.getElementById("todo-list").appendChild(li);

  
  inputBoxTitle.value = '';

  inputBoxDesc.value = '';

  TaskPriority.value = 'non-important';

  modal.classList.add('hidden');
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
  
  event.target.appendChild(taskItem);
}
