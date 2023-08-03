import Task from "./Task"

export default class UI {

    static projects = [{ 
        id: 1,
        name: 'Sample Project 1',
        tasks: [] },{ 
        id: 2,
        name: 'Sample Project 2',
        tasks: [] 
        }]

        static addTasks() {

            // get project based on form input
            const tasksForm = document.getElementById('pop-up-tasks-form')
            const tasksTitle = document.getElementById('task-title')
            const tasksDate = document.getElementById('task-date')
            const tasksPriority = document.getElementById('task-priority')
            const tasksCancelButton = document.getElementById('task-cancel-btn')
            const taskAddButton = document.getElementById('task-submit-btn')
            const popUpTasks = document.getElementById('pop-up-tasks')
    
            tasksForm.addEventListener('submit', (e) => {
                e.preventDefault()

                const taskTitle = tasksTitle.value
                const taskDate = tasksDate.value
                const taskPriority = tasksPriority.value

                if (taskTitle == null || taskTitle == '') return
                if (taskDate == null || taskDate == '') return
                if (taskPriority == null || taskPriority == '') return

                tasksForm.reset()

                const selectedProject = document.querySelector('.active-project[data-project-id]')

                const activeProject = this.projects.find(project => project.id == selectedProject.dataset.projectId)

                activeProject.tasks.push(taskTitle, taskDate, taskPriority)

                console.log(this.projects)

                this.appendTasks(taskTitle, taskDate, taskPriority)
            })  
    
            taskAddButton.addEventListener('click', () => {
                const taskTitle = tasksTitle.value
                if (taskTitle == null || taskTitle == '') return
                popUpTasks.classList.add('hide')
                popUpTasks.style.transition = 'none'
            })
    
            tasksCancelButton.addEventListener('click', () => {
                popUpTasks.classList.add('hide')
                popUpTasks.style.transition = 'none'
                tasksTitle.value = null
            })
    
        }

    static appendTasks(title, date, priority) {
        const taskContainer = document.getElementById('todo-list')

            const tasksElement = document.createElement('div')
            tasksElement.classList.add('todo-card')
            tasksElement.id = 'todo-card'
            tasksElement.innerHTML += `
            <label for="task-1" class="todo">${title}
                <input type="checkbox" name="task-1" id="task-1">
                <span class="checkmark"></span>
            </label>
            <div class="todo-right-el">
                <p class="task-date">${date}</p>
                <p class="task-priority"${priority}</p>
                <i class="fa-solid fa-pen-to-square pen"></i>
                <i class="fa-solid fa-trash-can trash"></i>
            </div>
            `

        taskContainer.appendChild(tasksElement)

    }
        
    static showActiveProject() {

        const activeProject = document.querySelector('.active-project[data-project-id]')
        const addTaskContainer = document.getElementById('add-task-container')

        if (activeProject) {
            addTaskContainer.classList.remove('hide')
        }

        this.toggleTaskPopUp()
    }

    // Add Projects to UI
    static addProject() {

        // get project based on form input
        const projectsForm = document.getElementById('pop-up-projects-form')
        const projectsInput = document.getElementById('projects-title')
        const projectsCancelBtn = document.querySelector('#projects-cancel-btn')
        const projectAddBtn = document.querySelector('#projects-submit-btn')
        const popUpProjects = document.querySelector('#pop-up-projects')

        projectsForm.addEventListener('submit', (e) => {
            e.preventDefault()
            const projectName = projectsInput.value

            if (projectName == null || projectName == '') return
            const newProject = this.createProject(projectName)
            projectsInput.value = null
            this.projects.push(newProject)
            this.appendProject()
            console.log(this.projects)
        })

        projectAddBtn.addEventListener('click', () => {
            const projectName = projectsInput.value
            if (projectName == null || projectName == '') return
            popUpProjects.classList.add('hide')
            popUpProjects.style.transition = 'none'
        })

        projectsCancelBtn.addEventListener('click', () => {
            popUpProjects.classList.add('hide')
            popUpProjects.style.transition = 'none'
            projectsInput.value = null
        })

    }

    static appendProject() {

        const projectsContainer = document.getElementById('project-container')

        this.clearElement(projectsContainer)

        this.projects.forEach(project => {
            const projectElement = document.createElement('button')
            projectElement.classList.add('style-button')
            projectElement.classList.add('projects')
            projectElement.dataset.projectId = project.id

            projectElement.innerHTML += `
                <div class="left-el">
                    <i class="fa-solid fa-list-check"></i>
                    <span data-project-name>${project.name}</span>
                </div>
                <div class="right-el">
                    <div id="edit-btn" class="edit-btn">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div class="add-task-btn" data-button-task> 
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <div id="del-btn" class="del-btn">
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                </div>`

                projectElement.addEventListener('click', () => {
                    const activeProject = document.querySelector('.active-project[data-project-id]')
                    const contentHeader = document.getElementById('content-header')

                        if(activeProject){
                            activeProject.classList.remove('active-project')
                        }
                        projectElement.classList.add('active-project')
                        contentHeader.textContent = project.name
                        this.showActiveProject()
                })
                
            projectsContainer.appendChild(projectElement)
        })
    }

     // Create an object of task
    static createTask(name, date, priority) {
        return { date : date, name: name, priority: priority, complete: false }
    }

    // Create an object of project
    static createProject(name) {
        let randomId = Math.floor(Math.random() * 500)
        return { id : randomId, name: name, tasks: [] }
    }

    static clearElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild)
        }
    }

    static toggleTaskPopUp() {
        const popUpTasks = document.getElementById('pop-up-tasks')
        const closePopUp = document.querySelector('#close-pop-up-tasks')
        const addTaskBtn = document.querySelectorAll('[data-button-task]')

        addTaskBtn.forEach(button => button.addEventListener('click',() => {
            popUpTasks.classList.remove('hide')
        }))
        
        closePopUp.addEventListener('click', () => {
            popUpTasks.classList.add('hide')
        })

    }

    static toggleProjectPopUp() {

        const addProjectBtn = document.querySelector('#add-project-btn')
        const closePopUp = document.querySelector('#close-pop-up-projects')
        const popUpProjects = document.querySelector('#pop-up-projects')

        // show pop-up
        addProjectBtn.addEventListener('click', () => {
            popUpProjects.classList.remove('hide')
            popUpProjects.style.transition = 'opacity 500ms ease-in'
        })

        // close pop-up
        closePopUp.addEventListener('click', () => {
            popUpProjects.classList.add('hide')
            popUpProjects.style.transition = 'none'
        })
    }

};
