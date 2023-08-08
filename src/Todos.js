import Project from "./Project";
import Task from "./Task";

export default class Todos {
	static projects = [
		new Project("General Cleaning", [new Task ('Cleaning the house', '02/20/2023', 'Important'), new Task ('Cleaning the attic', '08/08/2023', 'Not Important')]),
		new Project("Creating a Bomb", [new Task('Bombastic', '08/18/2023', 'Important')])
	];

	static deleteProject(projectId) {
		const projectToDelete = this.projects.find(
			(project) => project.id === projectId
		);
		this.projects.splice(this.projects.indexOf(projectToDelete), 1);
	}

	static getActiveProject(selectedProject) {
		return this.projects.find(
			(project) => project.id == selectedProject.dataset.projectId
		);
	}

}
