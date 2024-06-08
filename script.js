// script.js
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToDOM(task));
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById("task-input");
  const priorityInput = document.getElementById("priority-input");

  const task = {
    id: Date.now(),
    title: taskInput.value,
    priority: priorityInput.value,
    completed: false
  };

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  saveTasks(tasks);

  addTaskToDOM(task);

  taskInput.value = "";
  priorityInput.value = "low";
}

function addTaskToDOM(task) {
  const taskList = document.getElementById("task-list");

  const taskItem = document.createElement("li");
  taskItem.className = `task ${task.completed ? "completed" : ""}`;
  taskItem.dataset.id = task.id;

  const taskTitle = document.createElement("span");
  taskTitle.className = `task-title priority-${task.priority}`;
  taskTitle.textContent = task.title;

  const taskButtons = document.createElement("div");
  taskButtons.className = "task-buttons";

  const completeButton = document.createElement("button");
  completeButton.className = "complete";
  completeButton.textContent = "Complete";
  completeButton.onclick = () => toggleTaskCompletion(task.id);

  const editButton = document.createElement("button");
  editButton.className = "edit";
  editButton.textContent = "Edit";
  editButton.onclick = () => editTask(task.id);

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => deleteTask(task.id);

  taskButtons.appendChild(completeButton);
  taskButtons.appendChild(editButton);
  taskButtons.appendChild(deleteButton);

  taskItem.appendChild(taskTitle);
  taskItem.appendChild(taskButtons);

  taskList.appendChild(taskItem);
}

function toggleTaskCompletion(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((task) => task.id === id);
  task.completed = !task.completed;
  saveTasks(tasks);
  location.reload();
}

function editTask(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((task) => task.id === id);

  const newTitle = prompt("Edit Task Title:", task.title);
  if (newTitle !== null) {
    task.title = newTitle;
    saveTasks(tasks);
    location.reload();
  }
}

function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks(tasks);
  location.reload();
}
