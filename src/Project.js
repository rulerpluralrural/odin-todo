import Task from "./Task"

export default class Project {

    constructor (name) {
        this.id = Math.floor(Math.random() * 500)
        this.name = name
        this.tasks = []
    }
    
    createTask(name, dueDate, priority) {
        const newTask = new Task(name, dueDate, priority)
        this.tasks.push(newTask)

        return newTask
    }

    getTasks() {
        return this.tasks
    }


}