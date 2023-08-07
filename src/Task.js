export default class Task {
	constructor(name, dueDate, priority) {
		this.name = name;
		this.dueDate = dueDate;
		this.priority = priority;
		this.id = this.id = Math.floor(Math.random() * 500);
		this.complete = false;
	}

	dateFormatted() {
		const day = this.dueDate.split("/")[0];
		const month = this.dueDate.split("/")[1];
		const year = this.dueDate.split("/")[2];
		return `${month}/${day}/${year}`;
	}
}
