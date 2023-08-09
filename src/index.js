import Project from "./Project";
import Todos from "./Todos";
import Task from "./Task";
import UI from "./UI";

const appSidebar = document.getElementById("app-sidebar");
const hamburgerMenu = document.getElementById("hamburger-menu");

hamburgerMenu.addEventListener("click", () => {
	appSidebar.classList.toggle('show-sidebar')
	console.log('wadawd')
});

if (!localStorage.getItem("todos") || localStorage.getItem("todos") === "[]") {
	Todos.projects = [
		new Project("General Cleaning", [
			new Task("Cleaning the house", "02/20/2023", "Important"),
			new Task("Cleaning the attic", "08/08/2023", "Not Important"),
		]),
		new Project("Creating a Bomb", [
			new Task("Setting of the Bomb", "08/18/2023", "Important"),
		]),
	];
} else {
	const getProjects = JSON.parse(localStorage.getItem("todos"));
	Todos.projects = getProjects.map((projectData) => {
		const project = new Project(projectData.name);
		project.id = projectData.id; // Copy the id from the retrieved data

		project.tasks = projectData.tasks.map((taskData) => {
			const task = new Task(taskData.name, taskData.dueDate, taskData.priority);
			task.id = taskData.id; // Copy the id from the retrieved data
			task.complete = taskData.complete; // Copy the complete status
			return task;
		});

		return project;
	});
}

UI.loadPage();
