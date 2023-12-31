// @ts-ignore
import { createTaskElement, isValidDate } from "./Task_Element";
import Project from "./Project";
import Todos from "./Todos";
import { sidebarEventListener } from "./Sidebar";
import format from "date-fns/format";

export default class UI {
	static loadPage() {
		this.toggleProjectPopUp();
		sidebarEventListener();
	}

	static displayTasks() {
		const taskContainer = document.getElementById("todo-list");
		const containerHeader = document.getElementById("content-header");
		const selectedProject = document.querySelector(".active-project");
		const activeProject = Todos.getActiveProject(selectedProject);

		this.clearElement(taskContainer);
		containerHeader.textContent = activeProject.name;
		for (const task of activeProject.tasks) {
			this.appendTask(task, activeProject);
		}
	}

	static handleTaskForm() {
		const popUpTasks = document.getElementById("pop-up-tasks");
		const taskFormContainer = document.getElementById("pop-up-tasks-form");

		taskFormContainer.innerHTML = "";

		const tasksForm = document.createElement("form");
		tasksForm.classList.add("form");
		tasksForm.classList.add("pop-up-tasks-form");

		tasksForm.innerHTML += `
		<label for="task-title">Title</label>
		<input type="text" name="task-title" id="task-title" maxlength="30" required>
		<label for="date">Due Date</label>
		<input type="date" name="date" class="task-date" id="task-date" min="${format(
			new Date(),
			"MM/dd/yyyy"
		)}" max="12-31-9999" required>
		<div id="error-date-message"></div>
		<label for="priority">Priority</label>
		<select name="priority" id="task-priority" required>
			<option value="" disabled="" selected="">How important is this task?</option>
			<option value="not-important">Not Important</option>
			<option value="important">Important</option>
		</select>
		<div class="form-buttons">
			<button type="submit" class="task-submit-btn" id="task-submit-btn">Add</button>
			<button	button class="task-cancel-btn" id="task-cancel-btn" type="button">Cancel</button>
		</div>
		`;
		taskFormContainer.appendChild(tasksForm);

		tasksForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const tasksTitle = document.getElementById("task-title");
			const tasksDate = document.getElementById("task-date");
			const tasksPriority = document.getElementById("task-priority");
			const errorMessage = document.getElementById("error-date-message");
			errorMessage.style.color = "red";

			// @ts-ignore
			if (!tasksTitle.value || !tasksDate.value || !tasksPriority.value) {
				return;
				// @ts-ignore
			}
			// Validate the input date
			//@ts-ignore
			if (
				// @ts-ignore
				!isValidDate(tasksDate.value) &&
				// @ts-ignore
				tasksTitle.value &&
				// @ts-ignore
				tasksDate.value &&
				// @ts-ignore
				tasksPriority.value
			) {
				// Handle the case of an invalid date input (e.g., show an error message)
				errorMessage.textContent =
					"Invalid date format. Please use MM/DD/YYYY format.";
				return;
			} else {
				errorMessage.textContent = "";
				popUpTasks.classList.add("hide");
			}

			const selectedProject = document.querySelector(".active-project");

			const activeProject = Todos.getActiveProject(selectedProject);

			const activeProjectTask = activeProject.createTask(
				// @ts-ignore
				tasksTitle.value,
				// @ts-ignore
				format(new Date(tasksDate.value), "MM/dd/yyyy"),
				// @ts-ignore
				tasksPriority.options[tasksPriority.selectedIndex].text
			);
			tasksForm.reset();

			this.appendTask(activeProjectTask, activeProject);
		});

		const tasksCancelButton = document.getElementById("task-cancel-btn");

		tasksCancelButton.addEventListener("click", () => {
			popUpTasks.classList.add("hide");
			tasksForm.reset();
		});
	}

	static appendTask(task, project) {
		const taskContainer = document.getElementById("todo-list");

		taskContainer.appendChild(createTaskElement(task, project));
	}

	static handleProjectForm() {
		const projectsForm = document.getElementById("pop-up-projects-form");
		const projectsInput = document.getElementById("projects-title");
		const projectsCancelBtn = document.querySelector("#projects-cancel-btn");
		const projectAddBtn = document.querySelector("#projects-submit-btn");
		const popUpProjects = document.querySelector("#pop-up-projects");

		projectsForm.addEventListener("submit", (e) => {
			e.preventDefault();
			// @ts-ignore
			const projectName = projectsInput.value;

			if (projectName == null || projectName == "") return;

			const newProject = new Project(projectName);
			// @ts-ignore
			projectsInput.value = null;
			Todos.projects.push(newProject);
			this.appendProject();
		});

		projectAddBtn.addEventListener("click", () => {
			// @ts-ignore
			const projectName = projectsInput.value;
			if (projectName == null || projectName == "") return;
			popUpProjects.classList.add("hide");
			// @ts-ignore
			popUpProjects.style.transition = "none";
		});

		projectsCancelBtn.addEventListener("click", () => {
			popUpProjects.classList.add("hide");
			// @ts-ignore
			popUpProjects.style.transition = "none";
			// @ts-ignore
			projectsInput.value = null;
		});

		this.appendProject();
	}

	static appendProject() {
		const projectsContainer = document.getElementById("project-container");
		const addTaskContainer = document.getElementById("add-task-container");

		this.clearElement(projectsContainer);

		Todos.projects.forEach((project) => {
			const projectElement = document.createElement("button");
			projectElement.classList.add("style-button");
			projectElement.classList.add("projects");
			// @ts-ignore
			projectElement.dataset.projectId = project.id;

			projectElement.innerHTML += `
                <div class="left-el">
                    <i class="fa-solid fa-list-check"></i>
                    <span data-project-name>${project.name}</span>
                </div>
                <div class="right-el">
                    <div id="edit-btn" class="edit-btn">
                        <i class="fa-solid fa-pen-to-square" title="Edit Project"></i>
                    </div>
                    <div class="del-btn" data-delete-project>
                        <i class="fa-solid fa-trash-can" title="Delete Project"></i>
                    </div>
                </div>`;

			projectElement.addEventListener("click", (e) => {
				const activeProject = document.querySelector(".active-project");
				const projectTitle = projectElement.children[0].children[1];

				// @ts-ignore
				if (e.target.classList.contains("fa-trash-can")) {
					Todos.deleteProject(project.id);
					projectElement.remove();
					console.log(Todos.projects);
					return;
					// @ts-ignore
				} else if (e.target.classList.contains("fa-pen-to-square")) {
					this.toggleEditProject(projectTitle, project);
					console.log(Todos.projects);
					return;
				}

				if (activeProject) {
					activeProject.classList.remove("active-project");
				}

				projectElement.classList.add("active-project");
				addTaskContainer.classList.remove("hide");
				this.addTaskButtonHandler();
				this.displayTasks();
			});

			projectsContainer.appendChild(projectElement);
		});
	}

	static clearElement(element) {
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
	}

	static addTaskButtonHandler() {
		const popUpTasks = document.getElementById("pop-up-tasks");
		const addTaskBtn = document.getElementById("add-task-container");
		const closePopUp = document.getElementById("close-pop-up-tasks");

		addTaskBtn.addEventListener("click", () => {
			popUpTasks.classList.remove("hide");
		});

		closePopUp.addEventListener("click", () => {
			popUpTasks.classList.add("hide");
		});

		this.handleTaskForm();
	}

	static toggleEditProject(projectName, project) {
		const containerHeader = document.getElementById("content-header");
		const editProjectPopUp = document.getElementById("pop-up-projects-edit");
		const editProjectContainer = document.getElementById("edit-project-form");

		editProjectContainer.innerHTML = "";

		const editProjectForm = document.createElement("form");
		editProjectForm.classList.add("pop-up-projects-form");
		editProjectForm.classList.add("form");
		editProjectForm.innerHTML = `
        <label for="edit-project-title">Change Project Title</label>
        <input type="text" name="edit-project-title" id="edit-project-title" maxlength="30" required>
        <div class="form-buttons">
            <button type="submit" class="submit-btn" id="edit-project-confirm-btn">Confirm</button>
            <button class="cancel-btn" id="edit-project-cancel-btn" type="button">Cancel</button>
        </div>
        `;
		editProjectContainer.appendChild(editProjectForm);
		const editProjectTitle = document.getElementById("edit-project-title");
		const editProjectCancelButton = document.getElementById(
			"edit-project-cancel-btn"
		);
		const closeEditProject = document.getElementById("close-edit-project");
		editProjectPopUp.classList.remove("hide");
		// @ts-ignore
		editProjectTitle.value = project.name;

		editProjectForm.addEventListener("submit", (e) => {
			e.preventDefault();

			// @ts-ignore
			if (editProjectTitle.value === null || editProjectTitle === "") return;
			// @ts-ignore
			if (editProjectTitle.value !== null || editProjectTitle.value !== "") {
				editProjectPopUp.classList.add("hide");
			}
			// @ts-ignore
			projectName.textContent = editProjectTitle.value;
			// @ts-ignore
			project.edit(editProjectTitle.value);
			// @ts-ignore
			containerHeader.textContent = editProjectTitle.value;
		});

		editProjectCancelButton.addEventListener("click", () => {
			editProjectPopUp.classList.add("hide");
		});

		closeEditProject.addEventListener("click", () => {
			editProjectPopUp.classList.add("hide");
		});
	}

	static toggleProjectPopUp() {
		const addProjectBtn = document.querySelector("#add-project-btn");
		const closePopUp = document.querySelector("#close-pop-up-projects");
		const popUpProjects = document.querySelector("#pop-up-projects");

		// show pop-up
		addProjectBtn.addEventListener("click", () => {
			popUpProjects.classList.remove("hide");
			// @ts-ignore
			popUpProjects.style.transition = "opacity 500ms ease-in";
		});

		// close pop-up
		closePopUp.addEventListener("click", () => {
			popUpProjects.classList.add("hide");
			// @ts-ignore
			popUpProjects.style.transition = "none";
		});

		this.handleProjectForm();
	}
}
