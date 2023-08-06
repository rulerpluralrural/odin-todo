import Task from "./Task";

export default class Project {
	constructor(name) {
		this.id = Math.floor(Math.random() * 500);
		this.name = name;
		this.tasks = [{
			name: 'Sample Task 1',
			dueDate: '09/28/2024',
			priority: 'Not Important',
			id: 33,
			complete: false
		}];
	}

	createTask(name, dueDate, priority) {
		const newTask = new Task(name, dueDate, priority);
		this.tasks.push(newTask);

		return newTask;
	}

	getTask(taskId) {
		return this.getTasks.find((task) => task.id === taskId);
	}
}
