import Task from "./Task";

export default class Project {
	constructor(name, task = []) {
		this.id = Math.floor(Math.random() * 500);
		this.name = name;
		this.tasks = task;
	}

	createTask(name, dueDate, priority) {
		const newTask = new Task(name, dueDate, priority);
		this.tasks.push(newTask);

		return newTask;
	}

	deleteTask(taskId) {
		const taskToDelete = this.tasks.find(
			(task) => task.id === taskId);
		this.tasks.splice(this.tasks.indexOf(taskToDelete), 1);
	}

	getTask(taskId) {
		return this.getTasks.find((task) => task.id === taskId);
	}
}
