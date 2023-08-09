import Project from "./Project";
import Task from "./Task";
import Todos from "./Todos";
// @ts-ignore
import { format } from "date-fns";

/**
 * @param {Task} task
 * @param {Project} project
 */
export function createTaskElement(task, project) {
	const tasksElement = document.createElement("div");
	tasksElement.classList.add("todo-card");
	tasksElement.innerHTML += `
        <label class="todo">${task.name}
            <input type="checkbox">
            <span class="checkmark"></span>
        </label>
        <div class="todo-right-el">
            <p class="task-date">${format(
							new Date(task.dueDate),
							"MM/dd/yyyy"
						)}</p>
            <p class="task-priority">${task.priority}</p>
            <i class="fa-solid fa-pen-to-square pen" data-edit-task title="Edit Task"></i>
            <i class="fa-solid fa-trash-can trash" data-delete-task title="Delete Task"></i>
        </div>
        `;
	const checkbox = tasksElement.querySelector("input");
	checkbox.checked = task.complete;
	if (task.complete === true) {
		// @ts-ignore
		tasksElement.classList.add("completed-task");
	} else if (task.complete === false) {
		// @ts-ignore
		tasksElement.classList.remove("completed-task");
	}
	checkbox.id = task.id.toString();
	const label = tasksElement.querySelector("label");
	label.htmlFor = task.id.toString();

	tasksElement.addEventListener("click", (e) => {
		// @ts-ignore
		if (e.target.classList.contains("fa-pen-to-square")) {
			handleEditTaskForm(tasksElement, task);
			// @ts-ignore
		} else if (e.target.classList.contains("fa-trash-can")) {
			tasksElement.remove();
			project.deleteTask(task.id);
			console.log(Todos.projects);
			// @ts-ignore
		} else if (e.target.tagName.toLowerCase() === "input") {
			task.toggleComplete();
			// @ts-ignore
			if (task.complete === true) {
				tasksElement.classList.add("completed-task");
			} else if (task.complete === false) {
				// @ts-ignore
				tasksElement.classList.remove("completed-task");
			}
		}
	});

	return tasksElement;
}

/**
 *
 * @param {HTMLDivElement} tasksElement
 * @param {Task} task
 */
const handleEditTaskForm = (tasksElement, task) => {
	const popUpEditTaskForm = document.getElementById("pop-up-tasks-edit");
	const editTaskFormContainer = document.getElementById("edit-tasks-form");

	popUpEditTaskForm.classList.remove("hide");

	const editTaskForm = document.createElement("form");
	editTaskForm.classList.add("form");
	editTaskForm.classList.add("pop-up-tasks-form");
	editTaskForm.innerHTML += `
    <label for="edit-task-title">Title</label>
		<input type="text" name="task-title" id="edit-task-title" maxlength="30" required>
		<label for="date">Due Date</label>
		<input type="date" name="date" class="task-date" id="edit-task-date" min="${format(
			new Date(),
			"MM/dd/yyyy"
		)}" max="12-31-9999" required>
		<div id="edit-task-message"></div>
		<label for="priority">Priority</label>
		<select name="edit-task-priority" id="edit-task-priority" required>
			<option value="" disabled="" selected="">How important is this task?</option>
			<option value="not-important">Not Important</option>
			<option value="important">Important</option>
		</select>
		<div class="form-buttons">
			<button type="submit" class="edit-task-submit-btn" id="edit-task-submit-btn">Add</button>
			<button	button class="edit-task-cancel-btn" id="edit-task-cancel-btn" type="button">Cancel</button>
		</div>
    `;
	editTaskFormContainer.innerHTML = "";
	editTaskFormContainer.appendChild(editTaskForm);
	const closeEditTask = document.getElementById("close-pop-up-edit-tasks");
	const editTaskCancelButton = document.getElementById("edit-task-cancel-btn");

	editTaskForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const editTaskTitle = document.getElementById("edit-task-title");
		const editTaskDate = document.getElementById("edit-task-date");
		const editTaskPriority = document.getElementById("edit-task-priority");
		const editTaskMessage = document.getElementById("edit-task-message");
		editTaskMessage.style.color = "red";

		// @ts-ignore
		if (
			// @ts-ignore
			!editTaskTitle.value ||
			// @ts-ignore
			!editTaskDate.value ||
			// @ts-ignore
			!editTaskPriority.value
		) {
			return;
		}
		// Validate the input date
		// @ts-ignore
		if (
			// @ts-ignore
			!isValidDate(editTaskDate.value) &&
			// @ts-ignore
			editTaskTitle.value &&
			// @ts-ignore
			editTaskDate.value &&
			// @ts-ignore
			editTaskPriority.value
		) {
			// Handle the case of an invalid date input (e.g., show an error message)
			editTaskMessage.textContent =
				"Invalid date format. Please use MM/DD/YYYY format.";
			return;
		} else {
			editTaskMessage.textContent = "";
			tasksElement.innerHTML = "";
			tasksElement.innerHTML += `
                <label class="todo">${
									// @ts-ignore
									editTaskTitle.value
								}
                    <input type="checkbox">
                    <span class="checkmark"></span>
                </label>
                <div class="todo-right-el">
                    <p class="task-date">
                        ${format(
													new Date(
														// @ts-ignore
														editTaskDate.value
													),
													"MM/dd/yyyy"
												)}
                                        </p>
                    <p class="task-priority">
                    ${
											// @ts-ignore
											editTaskPriority.options[editTaskPriority.selectedIndex]
												.text
										}
                                        </p>
                    <i class="fa-solid fa-pen-to-square pen" data-edit-task></i>
                    <i class="fa-solid fa-trash-can trash" data-delete-task></i>
                </div>
            `;
			popUpEditTaskForm.classList.add("hide");
			console.log(task);
			// @ts-ignore
			task.editTask({
				// @ts-ignore
				name: editTaskTitle.value,
				// @ts-ignore
				dueDate: format(new Date(editTaskDate.value), "MM/dd/yyyy"),
				// @ts-ignore
				priority: editTaskPriority.options[editTaskPriority.selectedIndex].text,
			});
			editTaskForm.reset();
			popUpEditTaskForm.classList.add("hide");
		}
	});

	closeEditTask.addEventListener("click", () => {
		editTaskForm.reset();
		popUpEditTaskForm.classList.add("hide");
	});
	editTaskCancelButton.addEventListener("click", () => {
		editTaskForm.reset();
		popUpEditTaskForm.classList.add("hide");
	});
};

export const isValidDate = (date) => {
	// Convert the input date to a Date object and check if it's valid
	return !isNaN(new Date(date).getTime());
};
