import Todos from "./Todos"
import UI from "./UI"
import { createTaskElement } from "./Task_Element"

export const sidebarEventListener = () => {
    const sidebarUpperContainer = document.getElementById('sidebar-upper-container')
    const containerHeader = document.getElementById('content-header')
    const taskContainer = document.getElementById('todo-list')
    const addtaskButton = document.getElementById('add-task-container')

    sidebarUpperContainer.addEventListener('click', (e) => {
        const activeProject = document.querySelector('.active-project')
        if (e.target.tagName.toLowerCase() === 'button') {
            containerHeader.textContent = e.target.textContent
            if (activeProject) {
                activeProject.classList.remove("active-project");
            }
            e.target.classList.add("active-project");
            addtaskButton.classList.add('hide')
            UI.clearElement(taskContainer)
        }

        if (e.target.textContent === 'Tasks') {
            console.log('hi')
            Todos.projects.forEach((project) => {
                project.tasks.forEach((task) => {
                    UI.appendTask(task)
                })
            })
        } else if (e.target.textContent === 'Today') {
            console.log('hi')
        }
    })
}