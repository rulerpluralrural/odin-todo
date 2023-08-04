/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Project.js":
/*!************************!*\
  !*** ./src/Project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ "./src/Task.js");


class Project {

    constructor (name) {
        this.id = Math.floor(Math.random() * 500)
        this.name = name
        this.tasks = []
    }
    
    createTask(name, dueDate, priority) {
        const newTask = new _Task__WEBPACK_IMPORTED_MODULE_0__["default"](name, dueDate, priority)
        this.tasks.push(newTask)

        return newTask
    }

    getTasks() {
        return this.tasks
    }


}

/***/ }),

/***/ "./src/Task.js":
/*!*********************!*\
  !*** ./src/Task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
class Task {

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

/***/ }),

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ "./src/Task.js");
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ "./src/Project.js");



class UI {

    static projects = [new _Project__WEBPACK_IMPORTED_MODULE_1__["default"]('Sample Project 1'), new _Project__WEBPACK_IMPORTED_MODULE_1__["default"]('Sample Project 2')]

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

            const newProject = new _Project__WEBPACK_IMPORTED_MODULE_1__["default"](projectName)
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI */ "./src/UI.js");


_UI__WEBPACK_IMPORTED_MODULE_0__["default"].loadPage()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05xQjs7QUFFckIsMkNBQUUsVyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby8uL3NyYy9Qcm9qZWN0LmpzIiwid2VicGFjazovL29kaW4tdG9kby8uL3NyYy9UYXNrLmpzIiwid2VicGFjazovL29kaW4tdG9kby8uL3NyYy9VSS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRhc2sgZnJvbSBcIi4vVGFza1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuXG4gICAgY29uc3RydWN0b3IgKG5hbWUpIHtcbiAgICAgICAgdGhpcy5pZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUwMClcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLnRhc2tzID0gW11cbiAgICB9XG4gICAgXG4gICAgY3JlYXRlVGFzayhuYW1lLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICAgICAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sobmFtZSwgZHVlRGF0ZSwgcHJpb3JpdHkpXG4gICAgICAgIHRoaXMudGFza3MucHVzaChuZXdUYXNrKVxuXG4gICAgICAgIHJldHVybiBuZXdUYXNrXG4gICAgfVxuXG4gICAgZ2V0VGFza3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tzXG4gICAgfVxuXG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZVxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1MDApXG4gICAgICAgIHRoaXMuY29tcGxldGUgPSBmYWxzZVxuICAgIH1cblxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWVcbiAgICB9XG5cbiAgICBzZXROYW1lKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgIH0gXG5cbiAgICBnZXREYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kdWVEYXRlXG4gICAgfVxuXG4gICAgc2V0RGF0ZShkdWVEYXRlKSB7XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGVcbiAgICB9XG5cbiAgICBnZXRQcmlvcml0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpb3JpdHlcbiAgICB9XG5cbiAgICBzZXRQcmlvcml0eShwcmlvcml0eSkge1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcbiAgICB9XG5cbiAgICBkYXRlRm9ybWF0dGVkKCkge1xuICAgICAgICBjb25zdCBkYXkgPSB0aGlzLmR1ZURhdGUuc3BsaXQoJy8nKVswXVxuICAgICAgICBjb25zdCBtb250aCA9IHRoaXMuZHVlRGF0ZS5zcGxpdCgnLycpWzFdXG4gICAgICAgIGNvbnN0IHllYXIgPSB0aGlzLmR1ZURhdGUuc3BsaXQoJy8nKVsyXVxuICAgICAgICByZXR1cm4gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9YFxuICAgIH1cbn0iLCJpbXBvcnQgVGFzayBmcm9tIFwiLi9UYXNrXCJcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuL1Byb2plY3RcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG5cbiAgICBzdGF0aWMgcHJvamVjdHMgPSBbbmV3IFByb2plY3QoJ1NhbXBsZSBQcm9qZWN0IDEnKSwgbmV3IFByb2plY3QoJ1NhbXBsZSBQcm9qZWN0IDInKV1cblxuICAgIHN0YXRpYyBsb2FkUGFnZSgpIHtcbiAgICAgICAgdGhpcy50b2dnbGVUYXNrUG9wVXAoKVxuICAgICAgICB0aGlzLnRvZ2dsZVByb2plY3RQb3BVcCgpXG4gICAgICAgIHRoaXMuZ2V0UHJvamVjdCgpXG4gICAgICAgIHRoaXMuYWRkVGFza3MoKVxuICAgICAgICB0aGlzLmRpc3BsYXlUYXNrcygpXG4gICAgfVxuXG4gICAgc3RhdGljIGRpc3BsYXlUYXNrcygpIHtcblxuICAgICAgICBjb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tbGlzdCcpXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUtcHJvamVjdFtkYXRhLXByb2plY3QtaWRdJykgXG5cbiAgICAgICAgaWYgKHNlbGVjdGVkUHJvamVjdCA9PSBudWxsKSByZXR1cm4gXG4gICAgICAgIFxuICAgICAgICBjb25zdCBhY3RpdmVQcm9qZWN0ID0gdGhpcy5wcm9qZWN0cy5maW5kKHByb2plY3QgPT4gcHJvamVjdC5pZCA9PSBzZWxlY3RlZFByb2plY3QuZGF0YXNldC5wcm9qZWN0SWQpXG5cbiAgICAgICAgdGhpcy5jbGVhckVsZW1lbnQodGFza0NvbnRhaW5lcilcblxuICAgICAgICBpZiAoYWN0aXZlUHJvamVjdCkge1xuICAgICAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChhY3RpdmVQcm9qZWN0LmdldFRhc2tzKCkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkVGFza3MoKSB7XG5cbiAgICAgICAgLy8gZ2V0IHByb2plY3QgYmFzZWQgb24gZm9ybSBpbnB1dFxuICAgICAgICBjb25zdCB0YXNrc0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wLXVwLXRhc2tzLWZvcm0nKVxuICAgICAgICBjb25zdCB0YXNrc1RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stdGl0bGUnKVxuICAgICAgICBjb25zdCB0YXNrc0RhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kYXRlJylcbiAgICAgICAgY29uc3QgdGFza3NQcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXByaW9yaXR5JylcbiAgICAgICAgY29uc3QgdGFza3NDYW5jZWxCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1jYW5jZWwtYnRuJylcbiAgICAgICAgY29uc3QgdGFza0FkZEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXN1Ym1pdC1idG4nKVxuICAgICAgICBjb25zdCBwb3BVcFRhc2tzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcC11cC10YXNrcycpXG5cbiAgICAgICAgdGFza3NGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICAgICAgY29uc3QgdGFza1RpdGxlID0gdGFza3NUaXRsZS52YWx1ZVxuICAgICAgICAgICAgY29uc3QgdGFza0RhdGUgPSB0YXNrc0RhdGUudmFsdWVcbiAgICAgICAgICAgIGNvbnN0IHRhc2tQcmlvcml0eSA9IHRhc2tzUHJpb3JpdHkudmFsdWVcbiAgICAgICAgICAgIGNvbnN0IHRhc2tQcmlvcml0eVRleHQgPSB0YXNrc1ByaW9yaXR5Lm9wdGlvbnNbdGFza3NQcmlvcml0eS5zZWxlY3RlZEluZGV4XS50ZXh0XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhc2tQcmlvcml0eVRleHQpXG4gICAgICAgICAgICBpZiAodGFza1RpdGxlID09IG51bGwgfHwgdGFza1RpdGxlID09ICcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSBpZiAodGFza0RhdGUgPT0gbnVsbCB8fCB0YXNrRGF0ZSA9PSAnJykge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGFza1ByaW9yaXR5ID09IG51bGwgfHwgdGFza1ByaW9yaXR5ID09ICcnKXsgICBcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGFza3NGb3JtLnJlc2V0KClcblxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjdGl2ZS1wcm9qZWN0W2RhdGEtcHJvamVjdC1pZF0nKVxuXG4gICAgICAgICAgICBjb25zdCBhY3RpdmVQcm9qZWN0ID0gdGhpcy5wcm9qZWN0cy5maW5kKHByb2plY3QgPT4gcHJvamVjdC5pZCA9PSBzZWxlY3RlZFByb2plY3QuZGF0YXNldC5wcm9qZWN0SWQpXG5cbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZVByb2plY3RUYXNrID0gYWN0aXZlUHJvamVjdC5jcmVhdGVUYXNrKHRhc2tUaXRsZSwgdGFza0RhdGUsIHRhc2tQcmlvcml0eVRleHQpXG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFjdGl2ZVByb2plY3RUYXNrKVxuICAgICAgICAgICAgY29uc29sZS5sb2coYWN0aXZlUHJvamVjdClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFjdGl2ZVByb2plY3QuZ2V0VGFza3MoKSlcblxuICAgICAgICAgICAgdGhpcy5hcHBlbmRUYXNrcyhhY3RpdmVQcm9qZWN0VGFzaylcbiAgICAgICAgICAgIC8vIHRoaXMuc2hvd0FjdGl2ZVByb2plY3QoYWN0aXZlUHJvamVjdFRhc2spXG4gICAgICAgIH0pICBcblxuICAgICAgICB0YXNrQWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG4gICAgICAgICAgICBpZiAodGFza3NUaXRsZS52YWx1ZSA9PSBudWxsIHx8IHRhc2tzVGl0bGUudmFsdWUgPT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBlbHNlIGlmICh0YXNrc0RhdGUudmFsdWUgPT0gbnVsbCB8fCB0YXNrc0RhdGUudmFsdWUgPT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRhc2tzUHJpb3JpdHkudmFsdWUgPT0gbnVsbCB8fCB0YXNrc1ByaW9yaXR5LnZhbHVlID09ICcnKSB7ICBcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICB0YXNrc1RpdGxlLnZhbHVlICE9PSBudWxsICYmIHRhc2tzVGl0bGUudmFsdWUgIT09ICcnICYmIFxuICAgICAgICAgICAgICAgIHRhc2tzRGF0ZS52YWx1ZSAhPT0gbnVsbCAmJiB0YXNrc0RhdGUudmFsdWUgIT09ICcnICYmIHRhc2tzUHJpb3JpdHkudmFsdWUgIT09IG51bGwgJiYgdGFza3NQcmlvcml0eS52YWx1ZSAhPT0gJydcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBwb3BVcFRhc2tzLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIFxuICAgICAgICB0YXNrc0NhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHBvcFVwVGFza3MuY2xhc3NMaXN0LmFkZCgnaGlkZScpXG4gICAgICAgICAgICB0YXNrc1RpdGxlLnZhbHVlID0gbnVsbFxuICAgICAgICAgICAgdGFza3NEYXRlLnZhbHVlID0gbnVsbFxuICAgICAgICAgICAgdGFza3NQcmlvcml0eS52YWx1ZSA9IG51bGwgIFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBhcHBlbmRUYXNrcyh0YXNrKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tbGlzdCcpXG5cbiAgICAgICAgY29uc3QgdGFza3NFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIHRhc2tzRWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0b2RvLWNhcmQnKVxuICAgICAgICAgICAgdGFza3NFbGVtZW50LmlkID0gJ3RvZG8tY2FyZCdcbiAgICAgICAgICAgIHRhc2tzRWxlbWVudC5pbm5lckhUTUwgKz0gYFxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwidG9kb1wiPiR7dGFzay5uYW1lfVxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZWNrbWFya1wiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1yaWdodC1lbFwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidGFzay1kYXRlXCI+JHt0YXNrLmR1ZURhdGV9PC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidGFzay1wcmlvcml0eVwiPiR7dGFzay5wcmlvcml0eX08L3A+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1wZW4tdG8tc3F1YXJlIHBlblwiPjwvaT5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoLWNhbiB0cmFzaFwiPjwvaT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYFxuICAgICAgICBjb25zdCBjaGVja2JveCA9IHRhc2tzRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpXG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0YXNrLmNvbXBsZXRlXG4gICAgICAgIGNoZWNrYm94LmlkID0gdGFzay5pZFxuICAgICAgICBjb25zdCBsYWJlbCA9IHRhc2tzRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdsYWJlbCcpXG4gICAgICAgIGxhYmVsLmh0bWxGb3IgPSB0YXNrLmlkXG5cbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrc0VsZW1lbnQpXG4gICAgXG4gICAgfVxuXG4gICAgLy8gQWRkIFByb2plY3RzIHRvIFVJXG4gICAgc3RhdGljIGdldFByb2plY3QoKSB7XG5cbiAgICAgICAgLy8gZ2V0IHByb2plY3QgYmFzZWQgb24gZm9ybSBpbnB1dFxuICAgICAgICBjb25zdCBwcm9qZWN0c0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wLXVwLXByb2plY3RzLWZvcm0nKVxuICAgICAgICBjb25zdCBwcm9qZWN0c0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzLXRpdGxlJylcbiAgICAgICAgY29uc3QgcHJvamVjdHNDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdHMtY2FuY2VsLWJ0bicpXG4gICAgICAgIGNvbnN0IHByb2plY3RBZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdHMtc3VibWl0LWJ0bicpXG4gICAgICAgIGNvbnN0IHBvcFVwUHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wLXVwLXByb2plY3RzJylcblxuICAgICAgICBwcm9qZWN0c0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0c0lucHV0LnZhbHVlXG5cbiAgICAgICAgICAgIGlmIChwcm9qZWN0TmFtZSA9PSBudWxsIHx8IHByb2plY3ROYW1lID09ICcnKSByZXR1cm5cblxuICAgICAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3ROYW1lKVxuICAgICAgICAgICAgcHJvamVjdHNJbnB1dC52YWx1ZSA9IG51bGxcbiAgICAgICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KVxuICAgICAgICAgICAgdGhpcy5hcHBlbmRQcm9qZWN0KClcbiAgICAgICAgfSlcblxuICAgICAgICBwcm9qZWN0QWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0c0lucHV0LnZhbHVlXG4gICAgICAgICAgICBpZiAocHJvamVjdE5hbWUgPT0gbnVsbCB8fCBwcm9qZWN0TmFtZSA9PSAnJykgcmV0dXJuXG4gICAgICAgICAgICBwb3BVcFByb2plY3RzLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxuICAgICAgICAgICAgcG9wVXBQcm9qZWN0cy5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnXG4gICAgICAgIH0pXG5cbiAgICAgICAgcHJvamVjdHNDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBwb3BVcFByb2plY3RzLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxuICAgICAgICAgICAgcG9wVXBQcm9qZWN0cy5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnXG4gICAgICAgICAgICBwcm9qZWN0c0lucHV0LnZhbHVlID0gbnVsbFxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuYXBwZW5kUHJvamVjdCgpXG4gICAgfVxuXG4gICAgc3RhdGljIGFwcGVuZFByb2plY3QoKSB7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1jb250YWluZXInKVxuICAgICAgICBjb25zdCBhZGRUYXNrQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWNvbnRhaW5lcicpXG5cbiAgICAgICAgdGhpcy5jbGVhckVsZW1lbnQocHJvamVjdHNDb250YWluZXIpXG5cbiAgICAgICAgdGhpcy5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgICAgcHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc3R5bGUtYnV0dG9uJylcbiAgICAgICAgICAgIHByb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RzJylcbiAgICAgICAgICAgIHByb2plY3RFbGVtZW50LmRhdGFzZXQucHJvamVjdElkID0gcHJvamVjdC5pZFxuXG4gICAgICAgICAgICBwcm9qZWN0RWxlbWVudC5pbm5lckhUTUwgKz0gYFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0LWVsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtbGlzdC1jaGVja1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1wcm9qZWN0LW5hbWU+JHtwcm9qZWN0Lm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodC1lbFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZWRpdC1idG5cIiBjbGFzcz1cImVkaXQtYnRuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBlbi10by1zcXVhcmVcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkLXRhc2stYnRuXCIgZGF0YS1idXR0b24tdGFzaz4gXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBsdXNcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGVsLWJ0blwiIGNsYXNzPVwiZGVsLWJ0blwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaC1jYW5cIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PmBcblxuICAgICAgICAgICAgICAgIHByb2plY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjdGl2ZS1wcm9qZWN0W2RhdGEtcHJvamVjdC1pZF0nKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50SGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQtaGVhZGVyJylcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYWN0aXZlUHJvamVjdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlUHJvamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUtcHJvamVjdCcpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtcHJvamVjdCcpXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRUYXNrQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEhlYWRlci50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBwcm9qZWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0RWxlbWVudClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgY2xlYXJFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgdG9nZ2xlVGFza1BvcFVwKCkge1xuICAgICAgICBjb25zdCBwb3BVcFRhc2tzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcC11cC10YXNrcycpXG4gICAgICAgIGNvbnN0IGNsb3NlUG9wVXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtcG9wLXVwLXRhc2tzJylcbiAgICAgICAgY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWJ1dHRvbi10YXNrXScpXG5cbiAgICAgICAgYWRkVGFza0J0bi5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcbiAgICAgICAgICAgIHBvcFVwVGFza3MuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpXG4gICAgICAgIH0pKVxuICAgICAgICBcbiAgICAgICAgY2xvc2VQb3BVcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHBvcFVwVGFza3MuY2xhc3NMaXN0LmFkZCgnaGlkZScpXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBzdGF0aWMgdG9nZ2xlUHJvamVjdFBvcFVwKCkge1xuXG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtYnRuJylcbiAgICAgICAgY29uc3QgY2xvc2VQb3BVcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbG9zZS1wb3AtdXAtcHJvamVjdHMnKVxuICAgICAgICBjb25zdCBwb3BVcFByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcC11cC1wcm9qZWN0cycpXG5cbiAgICAgICAgLy8gc2hvdyBwb3AtdXBcbiAgICAgICAgYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHBvcFVwUHJvamVjdHMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpXG4gICAgICAgICAgICBwb3BVcFByb2plY3RzLnN0eWxlLnRyYW5zaXRpb24gPSAnb3BhY2l0eSA1MDBtcyBlYXNlLWluJ1xuICAgICAgICB9KVxuXG4gICAgICAgIC8vIGNsb3NlIHBvcC11cFxuICAgICAgICBjbG9zZVBvcFVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgcG9wVXBQcm9qZWN0cy5jbGFzc0xpc3QuYWRkKCdoaWRlJylcbiAgICAgICAgICAgIHBvcFVwUHJvamVjdHMuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJ1xuICAgICAgICB9KVxuICAgIH1cblxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFVJIGZyb20gXCIuL1VJXCJcblxuVUkubG9hZFBhZ2UoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==