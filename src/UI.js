import Task from "./Task"
import Project from "./Project"

export default class UI {

    static projects = [new Project('Sample Project 1'), new Project('Sample Project 2')]

    static loadPage() {
        this.toggleTaskPopUp()
        this.toggleProjectPopUp()
        this.getProject()
        this.addTasks()
        this.displayTasks()
    }

    static displayTasks() {

        const taskContainer = document.getElementById('todo-list')
        const selectedProject = document.querySelector('.active-project[data-project-id]') 

        if (selectedProject == null) return 
        
        const activeProject = this.projects.find(project => project.id == selectedProject.dataset.projectId)

        this.clearElement(taskContainer)

        if (activeProject) {
            taskContainer.appendChild(activeProject.getTasks())
        }
    }

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
            const taskPriorityText = tasksPriority.options[tasksPriority.selectedIndex].text

            console.log(taskPriorityText)
            if (taskTitle == null || taskTitle == '') {
                return
            } 
            else if (taskDate == null || taskDate == '') {
                return
            }
            else if (taskPriority == null || taskPriority == ''){   
                return
            }

            tasksForm.reset()

            const selectedProject = document.querySelector('.active-project[data-project-id]')

            const activeProject = this.projects.find(project => project.id == selectedProject.dataset.projectId)

            const activeProjectTask = activeProject.createTask(taskTitle, taskDate, taskPriorityText)

            console.log(activeProjectTask)
            console.log(activeProject)
            console.log(activeProject.getTasks())

            this.appendTasks(activeProjectTask)
            // this.showActiveProject(activeProjectTask)
        })  

        taskAddButton.addEventListener('click', () => {

            if (tasksTitle.value == null || tasksTitle.value == '') {
                return
            } 
            else if (tasksDate.value == null || tasksDate.value == '') {
                return
            }
            else if (tasksPriority.value == null || tasksPriority.value == '') {  
                return
            } 
            else if (
                tasksTitle.value !== null && tasksTitle.value !== '' && 
                tasksDate.value !== null && tasksDate.value !== '' && tasksPriority.value !== null && tasksPriority.value !== ''
                ) {
                popUpTasks.classList.add('hide')
            }
        })
    
        tasksCancelButton.addEventListener('click', () => {
            popUpTasks.classList.add('hide')
            tasksTitle.value = null
            tasksDate.value = null
            tasksPriority.value = null  
        })
    }

    static appendTasks(task) {
        
        const taskContainer = document.getElementById('todo-list')

        const tasksElement = document.createElement('div')
            tasksElement.classList.add('todo-card')
            tasksElement.id = 'todo-card'
            tasksElement.innerHTML += `
            <label class="todo">${task.name}
                <input type="checkbox">
                <span class="checkmark"></span>
            </label>
            <div class="todo-right-el">
                <p class="task-date">${task.dueDate}</p>
                <p class="task-priority">${task.priority}</p>
                <i class="fa-solid fa-pen-to-square pen"></i>
                <i class="fa-solid fa-trash-can trash"></i>
            </div>
            `
        const checkbox = tasksElement.querySelector('input')
        checkbox.checked = task.complete
        checkbox.id = task.id
        const label = tasksElement.querySelector('label')
        label.htmlFor = task.id

        taskContainer.appendChild(tasksElement)
    
    }

    // Add Projects to UI
    static getProject() {

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

            const newProject = new Project(projectName)
            projectsInput.value = null
            this.projects.push(newProject)
            this.appendProject()
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

        this.appendProject()
    }

    static appendProject() {

        const projectsContainer = document.getElementById('project-container')
        const addTaskContainer = document.getElementById('add-task-container')

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
                        addTaskContainer.classList.remove('hide')
                        contentHeader.textContent = project.name
                })
                
            projectsContainer.appendChild(projectElement)
        })
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
