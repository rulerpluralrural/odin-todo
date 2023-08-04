export default class Task {

    constructor(name, dueDate, priority) {
        this.name = name
        this.dueDate = dueDate
        this.priority = priority
        this.id = this.id = Math.floor(Math.random() * 500)
        this.complete = false
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

    dateFormatted() {
        const day = this.dueDate.split('/')[0]
        const month = this.dueDate.split('/')[1]
        const year = this.dueDate.split('/')[2]
        return `${month}/${day}/${year}`
    }
}