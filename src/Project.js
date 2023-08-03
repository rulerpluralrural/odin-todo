export default class Project {

    constructor (id, name, tasks) {
        this.id = id
        this.name = name
        this.tasks = tasks
    }

    getId() {
        return this.randomId
    }

    setId(id) {
        let randomId = Math.floor(Math.random() * 500)
        this.id = id
    }

    getName() {
        return this.name
    }

    
}