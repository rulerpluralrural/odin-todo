export default class Task {

    constructor(name, dueDate, priority) {
        this.name = name
        this.dueDate = dueDate
        this.priority = priority
    }

    getName() {
        return this.name
    }

    setName(name) {
        this.name = name
    } 

    getDate() {
        return this.dueDate
    }

    setDate(dueDate) {
        this.dueDate = dueDate
    }

    getPriority() {
        return this.priority
    }

    setPriority(priority) {
        this.priority = priority
    }
}