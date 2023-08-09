import Project from "./Project";

export default class Todos {
	/**
	 * @type {Project[]}
	 */
	static projects = [];

	static deleteProject(projectId) {
		const projectToDelete = this.projects.find(
			(project) => project.id === projectId
		);
		this.projects.splice(this.projects.indexOf(projectToDelete), 1);
		this.saveToLocalStorage()
	}

	static getActiveProject(selectedProject) {
		return this.projects.find(
			(project) => project.id == selectedProject.dataset.projectId
		);
	}

	static saveToLocalStorage() {
		localStorage.setItem('todos', JSON.stringify(this.projects))
	}
}
