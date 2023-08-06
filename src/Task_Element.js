import Project from "./Project";

export function createTaskElement(task) {
	const tasksElement = document.createElement("div");
	tasksElement.classList.add("todo-card");
	tasksElement.innerHTML += `
        <label class="todo">${task.name}
            <input type="checkbox">
            <span class="checkmark"></span>
        </label>
        <div class="todo-right-el">
            <p class="task-date">${task.dueDate}</p>
            <p class="task-priority">${task.priority}</p>
            <i class="fa-solid fa-pen-to-square pen" data-edit-task></i>
            <i class="fa-solid fa-trash-can trash" data-delete-task></i>
        </div>
        `;
	const checkbox = tasksElement.querySelector("input");
	checkbox.checked = task.complete;
	checkbox.id = task.id;
	const label = tasksElement.querySelector("label");
	label.htmlFor = task.id;

	return tasksElement;
}

export function taskHandler() {
	const editTask = document.querySelector("[data-edit-task]");
	const deleteTask = document.querySelector("[data-delete-task]");

	editTask.addEventListener("click", (e) => {
        const selectedTaskId = e.target.parentNode.parentNode.children[0].children[0].id
        handleEditTaskForm(selectedTaskId)
    });

	// deleteTask.addEventListener("click", handleDeleteTask);
}

const handleEditTaskForm = (selectedTaskId) => {
    console.log(selectedTaskId)
	const popUpEditTaskForm = document.getElementById("pop-up-tasks-edit");
	const editTaskFormContainer = document.getElementById("edit-tasks-form");

	popUpEditTaskForm.classList.remove("hide");

	const editTaskForm = document.createElement("form");
    editTaskForm.classList.add('form')
    editTaskForm.classList.add('pop-up-tasks-form')
	editTaskForm.innerHTML += `
    <label for="edit-task-title">Title</label>
		<input type="text" name="task-title" id="edit-task-title" maxlength="30" required>
		<label for="date">Due Date</label>
		<input type="date" name="date" class="task-date" id="edit-task-date" required>
		<label for="priority">Priority</label>
		<select name="edit-task-priority" id="edit-task-priority" required>
			<option value="" disabled="" selected="">How important is this task?</option>
			<option value="not-important">Not Important</option>
			<option value="important">Important !</option>
		</select>
		<div class="form-buttons">
			<button type="submit" class="edit-task-submit-btn" id="edit-task-submit-btn">Add</button>
			<button	button class="edit-task-cancel-btn" id="edit-task-cancel-btn" type="button">Cancel</button>
		</div>
    `;
    editTaskFormContainer.appendChild(editTaskForm)

    editTaskForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const editTaskTitle = document.getElementById('edit-task-title')
        const editTaskDate = document.getElementById('edit-task-date')
        const editTaskPriority = document.getElementById('edit-task-priority')
        
        if (editTaskTitle.value == null || editTaskTitle.value == "") {
            return;
        } else if (editTaskDate.value == null || editTaskDate.value == "") {
            return;
        } else if (editTaskPriority.value == null || editTaskPriority.value == "") {
            return;
        } else if (
            editTaskTitle.value !== null &&
            editTaskTitle.value !== "" &&
            editTaskDate.value !== null &&
            editTaskDate.value !== "" &&
            editTaskPriority.value !== null &&
            editTaskPriority.value !== ""
        ) {
            popUpEditTaskForm.classList.add("hide");
        }

        const findSelectedTaskId = Project.tasks.find((task) => task.id == selectedTaskId.id)

        console.log(findSelectedTaskId)
    })

};
