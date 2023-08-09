import Task from "./Task";
import Todos from "./Todos";

import { isToday, isThisWeek, toDate } from "date-fns";

export default class Project {
	id;
	name;
	tasks;
	/**
	 * @param {string} name
	 * @param {Task[]} tasks
	 */
	constructor(name, tasks = []) {
		this.id = Math.floor(Math.random() * 500);
		this.name = name;
		this.tasks = tasks;
	}

	/**
	 * @param {string} name
	 * @param {Date} dueDate
	 * @param {string} priority
	 */
	createTask(name, dueDate, priority) {
		const newTask = new Task(name, dueDate, priority);
		this.tasks.push(newTask);
		Todos.saveToLocalStorage();	
		return newTask;
	}

	/**
	 * @param {number} taskId
	 */
	deleteTask(taskId) {
		const taskToDelete = this.tasks.find((task) => task.id === taskId);
		if (taskToDelete) this.tasks.splice(this.tasks.indexOf(taskToDelete), 1);
		Todos.saveToLocalStorage()
	}

	/**
	 * @param {string} name
	 */
	edit(name) {
		this.name = name
		Todos.saveToLocalStorage()
	}

	/**
	 * @param {string} taskId
	 */
	getTask(taskId) {
		return this.tasks.find(
			(/** @type {{ id: any; }} */ task) => task.id === taskId
		);
	}

	getImportantTasks() {
		return this.tasks.filter((task) => {
			return task.priority === "Important";
		});
	}

	getTasksToday() {
		return this.tasks.filter((task) => {
			const taskDate = new Date(task.dueDate);
			return isToday(toDate(taskDate));
		});
	}

	getTasksThisWeek() {
		return this.tasks.filter((task) => {
			console.log(task.dueDate);
			const taskDate = new Date(task.dueDate);
			return isThisWeek(new Date(taskDate));
		});
	}
}
