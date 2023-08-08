import Task from "./Task";
import Todos from "./Todos";
import UI from "./UI";

export const sidebarEventListener = () => {
	const sidebarUpperContainer = document.getElementById(
		"sidebar-upper-container"
	);
	const containerHeader = document.getElementById("content-header");
	const taskContainer = document.getElementById("todo-list");
	const addtaskButton = document.getElementById("add-task-container");

	sidebarUpperContainer.addEventListener("click", (e) => {
		const activeProject = document.querySelector(".active-project");
		// @ts-ignore
		if (e.target.tagName.toLowerCase() === "button") {
			// @ts-ignore
			containerHeader.textContent = e.target.textContent;
			if (activeProject) {
				activeProject.classList.remove("active-project");
			}
			// @ts-ignore
			e.target.classList.add("active-project");
			addtaskButton.classList.add("hide");
			UI.clearElement(taskContainer);
		}

		// @ts-ignore
		if (e.target.textContent === "Tasks") {
			Todos.projects.forEach((project) => {
				project.tasks.forEach((task) => {
					UI.appendTask(task, project);
				});
			});
			// @ts-ignore
		} else if (e.target.textContent === "Important") {
			Todos.projects.forEach((project) => {
				for (const task of project.getImportantTasks()) {
					UI.appendTask(task, project);
				}
			});
			// @ts-ignore
		} else if (e.target.textContent === "Today") {
			Todos.projects.forEach((project) => {
				for (const task of project.getTasksToday()) {
					UI.appendTask(task, project);
				}
			});
			//@ts-ignore
		} else if (e.target.textContent === "This Week") {
            console.log(e.target)
			Todos.projects.forEach((project) => {
				console.log(project.getTasksThisWeek())
                for (const task of project.getTasksThisWeek()) {
					UI.appendTask(task, project);
				}
			});
		}
	});
};
