import Project from "./Project";

export default class Todos {
	static projects = [
		new Project("Sample Project 1"),
		new Project("Sample Project 2"),
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
