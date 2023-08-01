

export default class Project {

    static projects = [{ id: 1,
    name: 'Sample Project',
    tasks: [] }]

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

    // Create an object of project
    static createProject(name) {
        let randomId = Math.floor(Math.random() * 500)
        return { id : randomId, name: name, tasks: [] }
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
                    <span>${project.name}</span>
                </div>
                <div class="right-el">
                    <div id="edit-btn" class="edit-btn">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div id="add-task-btn" class="add-task-btn"> 
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <div id="del-btn" class="del-btn">
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                </div>`

                projectElement.addEventListener('click', () => {
                    const activeProject = document.querySelector('.active[data-project-id]')

                        if(activeProject){
                            activeProject.classList.remove('active')
                        }
                        projectElement.classList.add('active')

                })
                
            projectsContainer.appendChild(projectElement)
        })
    }

    static clearElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild)
        }
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
