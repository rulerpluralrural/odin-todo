export default class Task {
	constructor(name, dueDate, priority) {
		this.name = name;
		this.dueDate = dueDate;
		this.priority = priority;
		this.id = this.id = Math.floor(Math.random() * 500);
		this.complete = false;
	}
}
