// Get DOM elements
const newTaskInput = document.getElementById('new-task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const pendingTasksList = document.getElementById('pending-tasks-list');
const completedTasksList = document.getElementById('completed-tasks-list');

// Initialize tasks array
let tasks = [];

// Load tasks from local storage
if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
	loadTasks();
}

// Add event listener to add task button
addTaskBtn.addEventListener('click', addTask);

// Add event listener to new task input to submit on enter key press
newTaskInput.addEventListener('keyup', function(event) {
	if (event.keyCode === 13) {
		addTask();
	}
});

// Add task function
function addTask() {
	const taskText = newTaskInput.value.trim();

	// Check if task text is empty
	if (!taskText) {
		alert('Please enter a task!');
		return;
	}

	// Add task to tasks array
	const task = {
		id: Date.now(),
		text: taskText,
		completed: false,
		dateAdded: new Date()
	};
	tasks.push(task);

	// Save tasks to local storage and load tasks
	saveTasks();
	loadTasks();

	// Clear new task input
	newTaskInput.value = '';
}

// Load tasks function
function loadTasks() {
	// Clear pending and completed tasks lists
	pendingTasksList.innerHTML = '';
	completedTasksList.innerHTML = '';

	// Loop through tasks array and append tasks to appropriate list
	tasks.forEach(task => {
		const li = document.createElement('li');
		const checkbox = document.createElement('input');
		const label = document.createElement('label');
		const deleteBtn = document.createElement('button');

		checkbox.type = 'checkbox';
		checkbox.checked = task.completed;
		checkbox.addEventListener('change', toggleTaskCompleted);

		label.textContent = task.text;
		label.setAttribute('for', 'task-' + task.id);

		deleteBtn.textContent = 'Delete';
		deleteBtn.addEventListener('click', deleteTask);

		li.appendChild(checkbox);
		li.appendChild(label);
		li.appendChild(deleteBtn);

		if (task.completed) {
			completedTasksList.appendChild(li);
		} else {
			pendingTasksList.appendChild(li);
		}
	});
}

// Save tasks function
function saveTasks() {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Toggle task completed function
function toggleTaskCompleted() {
	const taskId = parseInt(this.nextElementSibling.getAttribute('for').replace('task-', ''));
	const taskIndex = tasks.findIndex(task => task.id === taskId);
	tasks[taskIndex].completed = this.checked;
	saveTasks();
	loadTasks();
}

// Delete task function
function deleteTask() {
	const taskId = parseInt(this.previousElementSibling.getAttribute('for').replace('task-', ''));
	const taskIndex = tasks.findIndex(task => task.id === taskId);
	tasks.splice(taskIndex, 1);
	saveTasks();
	loadTasks();
}
