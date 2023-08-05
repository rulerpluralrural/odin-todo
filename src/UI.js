import Task from "./Task";
import Ui_task from "./Ui_task";
import Project from "./Project";
import Todos from "./Todos";

export default class UI {
	static loadPage() {
		this.toggleProjectPopUp();
		this.handleProjectForm();
		this.handleTaskForm();
	}

	static displayTasks() {
		const taskContainer = document.getElementById("todo-list");
		const containerHeader = document.getElementById("content-header");
		const selectedProject = document.querySelector(".active-project");
		const activeProject = Todos.projects.find(
			(project) => project.id == selectedProject.dataset.projectId
		);

		this.clearElement(taskContainer);

		containerHeader.textContent = activeProject.name;

		for (const task of activeProject.tasks) {
			this.appendTasks(task);
		}
	}

	static handleTaskForm() {
		const tasksForm = document.getElementById("pop-up-tasks-form");
		const tasksTitle = document.getElementById("task-title");
		const tasksDate = document.getElementById("task-date");
		const tasksPriority = document.getElementById("task-priority");
		const tasksCancelButton = document.getElementById("task-cancel-btn");
		const taskAddButton = document.getElementById("task-submit-btn");
		const popUpTasks = document.getElementById("pop-up-tasks");

		tasksForm.addEventListener("submit", (e) => {
			e.preventDefault();

			const taskTitle = tasksTitle.value;
			const taskDate = tasksDate.value;
			const taskPriority = tasksPriority.value;
			const taskPriorityText =
				tasksPriority.options[tasksPriority.selectedIndex].text;

			if (taskTitle == null || taskTitle == "") {
				return;
			} else if (taskDate == null || taskDate == "") {
				return;
			} else if (taskPriority == null || taskPriority == "") {
				return;
			}

			tasksForm.reset();

			const selectedProject = document.querySelector(
				".active-project"
			);

			const activeProject = Todos.projects.find(
				(project) => project.id == selectedProject.dataset.projectId
			);
			const activeProjectTask = activeProject.createTask(
				taskTitle,
				taskDate,
				taskPriorityText
			);

			console.log(activeProjectTask);

			this.appendTasks(activeProjectTask);
		});

		taskAddButton.addEventListener("click", () => {
			if (tasksTitle.value == null || tasksTitle.value == "") {
				return;
			} else if (tasksDate.value == null || tasksDate.value == "") {
				return;
			} else if (tasksPriority.value == null || tasksPriority.value == "") {
				return;
			} else if (
				tasksTitle.value !== null &&
				tasksTitle.value !== "" &&
				tasksDate.value !== null &&
				tasksDate.value !== "" &&
				tasksPriority.value !== null &&
				tasksPriority.value !== ""
			) {
				popUpTasks.classList.add("hide");
			}
		});

		tasksCancelButton.addEventListener("click", () => {
			popUpTasks.classList.add("hide");
			tasksTitle.value = null;
			tasksDate.value = null;
			tasksPriority.value = null;
		});
	}

	static appendTasks(task) {
		const taskContainer = document.getElementById("todo-list");
		taskContainer.appendChild(Ui_task(task));
	}

	static handleProjectForm() {
		const projectsForm = document.getElementById("pop-up-projects-form");
		const projectsInput = document.getElementById("projects-title");
		const projectsCancelBtn = document.querySelector("#projects-cancel-btn");
		const projectAddBtn = document.querySelector("#projects-submit-btn");
		const popUpProjects = document.querySelector("#pop-up-projects");

		projectsForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const projectName = projectsInput.value;

			if (projectName == null || projectName == "") return;

			const newProject = new Project(projectName);
			projectsInput.value = null;
			Todos.projects.push(newProject);
			this.appendProject();
		});

		projectAddBtn.addEventListener("click", () => {
			const projectName = projectsInput.value;
			if (projectName == null || projectName == "") return;
			popUpProjects.classList.add("hide");
			popUpProjects.style.transition = "none";
		});

		projectsCancelBtn.addEventListener("click", () => {
			popUpProjects.classList.add("hide");
			popUpProjects.style.transition = "none";
			projectsInput.value = null;
		});

		this.appendProject();
	}

	static appendProject() {
		const projectsContainer = document.getElementById("project-container");
		const taskContainer = document.getElementById("todo-list");
		const addTaskContainer = document.getElementById("add-task-container");

		this.clearElement(projectsContainer);

		Todos.projects.forEach((project) => {
			const projectElement = document.createElement("button");
			projectElement.classList.add("style-button");
			projectElement.classList.add("projects");
			projectElement.dataset.projectId = project.id;

			projectElement.innerHTML += `
                <div class="left-el">
                    <i class="fa-solid fa-list-check"></i>
                    <span data-project-name>${project.name}</span>
                </div>
                <div class="right-el">
                    <div id="edit-btn" class="edit-btn">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div class="add-task-btn" data-button-task> 
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <div class="del-btn" data-delete-project>
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                </div>`;

			projectElement.addEventListener("click", (e) => {
				const activeProject = document.querySelector(".active-project");
				const projectTitle = projectElement.children[0].children[1];

				if (e.target.classList.contains("fa-trash-can")) {
                    Todos.deleteProject(project.id)
                    projectElement.remove()
					return;
				} else if (e.target.classList.contains("fa-plus")) {
					this.toggleTaskPopUp();
					return;
				} else if (e.target.classList.contains("fa-pen-to-square")) {
					this.toggleEditProject(projectTitle, project);
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
	}

	static toggleTaskPopUp() {
		const popUpTasks = document.getElementById("pop-up-tasks");
		const closePopUp = document.getElementById("close-pop-up-tasks");

		popUpTasks.classList.remove("hide");

		closePopUp.addEventListener("click", () => {
			popUpTasks.classList.add("hide");
		});
	}

	static toggleEditProject(projectName, project) {
		const containerHeader = document.getElementById("content-header");
		const editProjectPopUp = document.getElementById("pop-up-projects-edit");
		const editProjectContainer = document.getElementById("edit-project-form");

        editProjectContainer.innerHTML = ''

		const editProjectForm = document.createElement("form");
        editProjectForm.classList.add("pop-up-projects-form")
		editProjectForm.innerHTML = `
        <label for="edit-project-title">Change Project Title</label>
        <input type="text" name="edit-project-title" id="edit-project-title" maxlength="30" required>
        <div class="form-buttons">
            <button type="submit" class="submit-btn" id="edit-project-confirm-btn">Confirm</button>
            <button class="cancel-btn" id="edit-project-cancel-btn" type="button">Cancel</button>
        </div>
        `;
        editProjectContainer.appendChild(editProjectForm)
        const editProjectTitle = document.getElementById("edit-project-title");
        const editProjectCancelButton = document.getElementById(
			"edit-project-cancel-btn"
		);
		const closeEditProject = document.getElementById("close-edit-project");
		editProjectPopUp.classList.remove("hide");
        editProjectTitle.value = project.name;

		editProjectForm.addEventListener("submit", (e) => {
			e.preventDefault();

			if (editProjectTitle.value === null || editProjectTitle === "") return;
			if (editProjectTitle.value !== null || editProjectTitle.value !== "") {
				editProjectPopUp.classList.add("hide");
			}
			projectName.textContent = editProjectTitle.value;
			project.name = editProjectTitle.value;
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
			popUpProjects.style.transition = "opacity 500ms ease-in";
		});

		// close pop-up
		closePopUp.addEventListener("click", () => {
			popUpProjects.classList.add("hide");
			popUpProjects.style.transition = "none";
		});
	}
}
