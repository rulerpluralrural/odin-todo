import Todos from "./Todos";

export default class Task {
	constructor(name, dueDate, priority) {
		this.name = name;
		this.dueDate = dueDate;
		this.priority = priority;
		this.id = this.id = Math.floor(Math.random() * 500);
		this.complete = false;
	}

	/**
	 *
	 * @param {Partial<Task>} newTask
	 */

	editTask(newTask) {
		if (newTask.name) this.name = newTask.name
		if (newTask.dueDate) this.dueDate = newTask.dueDate
		if (newTask.priority) this.priority = newTask.priority
		if (newTask.complete) this.complete = newTask.complete
		Todos.saveToLocalStorage()
	}

	toggleComplete() {
		this.complete = !this.complete
		Todos.saveToLocalStorage()
	}
}
