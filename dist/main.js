/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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


class UI {

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


_UI__WEBPACK_IMPORTED_MODULE_0__["default"].addTasks()
_UI__WEBPACK_IMPORTED_MODULE_0__["default"].appendProject()
_UI__WEBPACK_IMPORTED_MODULE_0__["default"].addProject()
_UI__WEBPACK_IMPORTED_MODULE_0__["default"].toggleProjectPopUp()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDL0J5Qjs7QUFFVjs7QUFFZjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLEtBQUs7QUFDNUMsMENBQTBDLFNBQVM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGFBQWE7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOzs7Ozs7O1VDdk9BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOcUI7O0FBRXJCLDJDQUFFO0FBQ0YsMkNBQUU7QUFDRiwyQ0FBRTtBQUNGLDJDQUFFLHFCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL1Rhc2suanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL1VJLmpzIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZVxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcbiAgICB9XG5cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lXG4gICAgfVxuXG4gICAgc2V0TmFtZShuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICB9IFxuXG4gICAgZ2V0RGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHVlRGF0ZVxuICAgIH1cblxuICAgIHNldERhdGUoZHVlRGF0ZSkge1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlXG4gICAgfVxuXG4gICAgZ2V0UHJpb3JpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByaW9yaXR5XG4gICAgfVxuXG4gICAgc2V0UHJpb3JpdHkocHJpb3JpdHkpIHtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5XG4gICAgfVxufSIsImltcG9ydCBUYXNrIGZyb20gXCIuL1Rhc2tcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG5cbiAgICBzdGF0aWMgcHJvamVjdHMgPSBbeyBcbiAgICAgICAgaWQ6IDEsXG4gICAgICAgIG5hbWU6ICdTYW1wbGUgUHJvamVjdCAxJyxcbiAgICAgICAgdGFza3M6IFtdIH0seyBcbiAgICAgICAgaWQ6IDIsXG4gICAgICAgIG5hbWU6ICdTYW1wbGUgUHJvamVjdCAyJyxcbiAgICAgICAgdGFza3M6IFtdIFxuICAgICAgICB9XVxuXG4gICAgICAgIHN0YXRpYyBhZGRUYXNrcygpIHtcblxuICAgICAgICAgICAgLy8gZ2V0IHByb2plY3QgYmFzZWQgb24gZm9ybSBpbnB1dFxuICAgICAgICAgICAgY29uc3QgdGFza3NGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcC11cC10YXNrcy1mb3JtJylcbiAgICAgICAgICAgIGNvbnN0IHRhc2tzVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay10aXRsZScpXG4gICAgICAgICAgICBjb25zdCB0YXNrc0RhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kYXRlJylcbiAgICAgICAgICAgIGNvbnN0IHRhc2tzUHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1wcmlvcml0eScpXG4gICAgICAgICAgICBjb25zdCB0YXNrc0NhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWNhbmNlbC1idG4nKVxuICAgICAgICAgICAgY29uc3QgdGFza0FkZEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXN1Ym1pdC1idG4nKVxuICAgICAgICAgICAgY29uc3QgcG9wVXBUYXNrcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3AtdXAtdGFza3MnKVxuICAgIFxuICAgICAgICAgICAgdGFza3NGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrVGl0bGUgPSB0YXNrc1RpdGxlLnZhbHVlXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0RhdGUgPSB0YXNrc0RhdGUudmFsdWVcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrUHJpb3JpdHkgPSB0YXNrc1ByaW9yaXR5LnZhbHVlXG5cbiAgICAgICAgICAgICAgICBpZiAodGFza1RpdGxlID09IG51bGwgfHwgdGFza1RpdGxlID09ICcnKSByZXR1cm5cbiAgICAgICAgICAgICAgICBpZiAodGFza0RhdGUgPT0gbnVsbCB8fCB0YXNrRGF0ZSA9PSAnJykgcmV0dXJuXG4gICAgICAgICAgICAgICAgaWYgKHRhc2tQcmlvcml0eSA9PSBudWxsIHx8IHRhc2tQcmlvcml0eSA9PSAnJykgcmV0dXJuXG5cbiAgICAgICAgICAgICAgICB0YXNrc0Zvcm0ucmVzZXQoKVxuXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjdGl2ZS1wcm9qZWN0W2RhdGEtcHJvamVjdC1pZF0nKVxuXG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlUHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZChwcm9qZWN0ID0+IHByb2plY3QuaWQgPT0gc2VsZWN0ZWRQcm9qZWN0LmRhdGFzZXQucHJvamVjdElkKVxuXG4gICAgICAgICAgICAgICAgYWN0aXZlUHJvamVjdC50YXNrcy5wdXNoKHRhc2tUaXRsZSwgdGFza0RhdGUsIHRhc2tQcmlvcml0eSlcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvamVjdHMpXG5cbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFRhc2tzKHRhc2tUaXRsZSwgdGFza0RhdGUsIHRhc2tQcmlvcml0eSlcbiAgICAgICAgICAgIH0pICBcbiAgICBcbiAgICAgICAgICAgIHRhc2tBZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza1RpdGxlID0gdGFza3NUaXRsZS52YWx1ZVxuICAgICAgICAgICAgICAgIGlmICh0YXNrVGl0bGUgPT0gbnVsbCB8fCB0YXNrVGl0bGUgPT0gJycpIHJldHVyblxuICAgICAgICAgICAgICAgIHBvcFVwVGFza3MuY2xhc3NMaXN0LmFkZCgnaGlkZScpXG4gICAgICAgICAgICAgICAgcG9wVXBUYXNrcy5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnXG4gICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgdGFza3NDYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcG9wVXBUYXNrcy5jbGFzc0xpc3QuYWRkKCdoaWRlJylcbiAgICAgICAgICAgICAgICBwb3BVcFRhc2tzLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSdcbiAgICAgICAgICAgICAgICB0YXNrc1RpdGxlLnZhbHVlID0gbnVsbFxuICAgICAgICAgICAgfSlcbiAgICBcbiAgICAgICAgfVxuXG4gICAgc3RhdGljIGFwcGVuZFRhc2tzKHRpdGxlLCBkYXRlLCBwcmlvcml0eSkge1xuICAgICAgICBjb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tbGlzdCcpXG5cbiAgICAgICAgICAgIGNvbnN0IHRhc2tzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICB0YXNrc0VsZW1lbnQuY2xhc3NMaXN0LmFkZCgndG9kby1jYXJkJylcbiAgICAgICAgICAgIHRhc2tzRWxlbWVudC5pZCA9ICd0b2RvLWNhcmQnXG4gICAgICAgICAgICB0YXNrc0VsZW1lbnQuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0YXNrLTFcIiBjbGFzcz1cInRvZG9cIj4ke3RpdGxlfVxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwidGFzay0xXCIgaWQ9XCJ0YXNrLTFcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZWNrbWFya1wiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1yaWdodC1lbFwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidGFzay1kYXRlXCI+JHtkYXRlfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRhc2stcHJpb3JpdHlcIiR7cHJpb3JpdHl9PC9wPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGVuLXRvLXNxdWFyZSBwZW5cIj48L2k+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaC1jYW4gdHJhc2hcIj48L2k+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIGBcblxuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tzRWxlbWVudClcblxuICAgIH1cbiAgICAgICAgXG4gICAgc3RhdGljIHNob3dBY3RpdmVQcm9qZWN0KCkge1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlLXByb2plY3RbZGF0YS1wcm9qZWN0LWlkXScpXG4gICAgICAgIGNvbnN0IGFkZFRhc2tDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2stY29udGFpbmVyJylcblxuICAgICAgICBpZiAoYWN0aXZlUHJvamVjdCkge1xuICAgICAgICAgICAgYWRkVGFza0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJylcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9nZ2xlVGFza1BvcFVwKClcbiAgICB9XG5cbiAgICAvLyBBZGQgUHJvamVjdHMgdG8gVUlcbiAgICBzdGF0aWMgYWRkUHJvamVjdCgpIHtcblxuICAgICAgICAvLyBnZXQgcHJvamVjdCBiYXNlZCBvbiBmb3JtIGlucHV0XG4gICAgICAgIGNvbnN0IHByb2plY3RzRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3AtdXAtcHJvamVjdHMtZm9ybScpXG4gICAgICAgIGNvbnN0IHByb2plY3RzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMtdGl0bGUnKVxuICAgICAgICBjb25zdCBwcm9qZWN0c0NhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cy1jYW5jZWwtYnRuJylcbiAgICAgICAgY29uc3QgcHJvamVjdEFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cy1zdWJtaXQtYnRuJylcbiAgICAgICAgY29uc3QgcG9wVXBQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3AtdXAtcHJvamVjdHMnKVxuXG4gICAgICAgIHByb2plY3RzRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3RzSW5wdXQudmFsdWVcblxuICAgICAgICAgICAgaWYgKHByb2plY3ROYW1lID09IG51bGwgfHwgcHJvamVjdE5hbWUgPT0gJycpIHJldHVyblxuICAgICAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IHRoaXMuY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZSlcbiAgICAgICAgICAgIHByb2plY3RzSW5wdXQudmFsdWUgPSBudWxsXG4gICAgICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdClcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kUHJvamVjdCgpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnByb2plY3RzKVxuICAgICAgICB9KVxuXG4gICAgICAgIHByb2plY3RBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3RzSW5wdXQudmFsdWVcbiAgICAgICAgICAgIGlmIChwcm9qZWN0TmFtZSA9PSBudWxsIHx8IHByb2plY3ROYW1lID09ICcnKSByZXR1cm5cbiAgICAgICAgICAgIHBvcFVwUHJvamVjdHMuY2xhc3NMaXN0LmFkZCgnaGlkZScpXG4gICAgICAgICAgICBwb3BVcFByb2plY3RzLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSdcbiAgICAgICAgfSlcblxuICAgICAgICBwcm9qZWN0c0NhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHBvcFVwUHJvamVjdHMuY2xhc3NMaXN0LmFkZCgnaGlkZScpXG4gICAgICAgICAgICBwb3BVcFByb2plY3RzLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSdcbiAgICAgICAgICAgIHByb2plY3RzSW5wdXQudmFsdWUgPSBudWxsXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBzdGF0aWMgYXBwZW5kUHJvamVjdCgpIHtcblxuICAgICAgICBjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWNvbnRhaW5lcicpXG5cbiAgICAgICAgdGhpcy5jbGVhckVsZW1lbnQocHJvamVjdHNDb250YWluZXIpXG5cbiAgICAgICAgdGhpcy5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgICAgcHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc3R5bGUtYnV0dG9uJylcbiAgICAgICAgICAgIHByb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RzJylcbiAgICAgICAgICAgIHByb2plY3RFbGVtZW50LmRhdGFzZXQucHJvamVjdElkID0gcHJvamVjdC5pZFxuXG4gICAgICAgICAgICBwcm9qZWN0RWxlbWVudC5pbm5lckhUTUwgKz0gYFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0LWVsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtbGlzdC1jaGVja1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1wcm9qZWN0LW5hbWU+JHtwcm9qZWN0Lm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodC1lbFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZWRpdC1idG5cIiBjbGFzcz1cImVkaXQtYnRuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBlbi10by1zcXVhcmVcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkLXRhc2stYnRuXCIgZGF0YS1idXR0b24tdGFzaz4gXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBsdXNcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGVsLWJ0blwiIGNsYXNzPVwiZGVsLWJ0blwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaC1jYW5cIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PmBcblxuICAgICAgICAgICAgICAgIHByb2plY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjdGl2ZS1wcm9qZWN0W2RhdGEtcHJvamVjdC1pZF0nKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50SGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQtaGVhZGVyJylcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYWN0aXZlUHJvamVjdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlUHJvamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUtcHJvamVjdCcpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtcHJvamVjdCcpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50SGVhZGVyLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dBY3RpdmVQcm9qZWN0KClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEVsZW1lbnQpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgIC8vIENyZWF0ZSBhbiBvYmplY3Qgb2YgdGFza1xuICAgIHN0YXRpYyBjcmVhdGVUYXNrKG5hbWUsIGRhdGUsIHByaW9yaXR5KSB7XG4gICAgICAgIHJldHVybiB7IGRhdGUgOiBkYXRlLCBuYW1lOiBuYW1lLCBwcmlvcml0eTogcHJpb3JpdHksIGNvbXBsZXRlOiBmYWxzZSB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGFuIG9iamVjdCBvZiBwcm9qZWN0XG4gICAgc3RhdGljIGNyZWF0ZVByb2plY3QobmFtZSkge1xuICAgICAgICBsZXQgcmFuZG9tSWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1MDApXG4gICAgICAgIHJldHVybiB7IGlkIDogcmFuZG9tSWQsIG5hbWU6IG5hbWUsIHRhc2tzOiBbXSB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNsZWFyRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHRvZ2dsZVRhc2tQb3BVcCgpIHtcbiAgICAgICAgY29uc3QgcG9wVXBUYXNrcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3AtdXAtdGFza3MnKVxuICAgICAgICBjb25zdCBjbG9zZVBvcFVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlLXBvcC11cC10YXNrcycpXG4gICAgICAgIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1idXR0b24tdGFza10nKVxuXG4gICAgICAgIGFkZFRhc2tCdG4uZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB7XG4gICAgICAgICAgICBwb3BVcFRhc2tzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxuICAgICAgICB9KSlcbiAgICAgICAgXG4gICAgICAgIGNsb3NlUG9wVXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBwb3BVcFRhc2tzLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgc3RhdGljIHRvZ2dsZVByb2plY3RQb3BVcCgpIHtcblxuICAgICAgICBjb25zdCBhZGRQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWJ0bicpXG4gICAgICAgIGNvbnN0IGNsb3NlUG9wVXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtcG9wLXVwLXByb2plY3RzJylcbiAgICAgICAgY29uc3QgcG9wVXBQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3AtdXAtcHJvamVjdHMnKVxuXG4gICAgICAgIC8vIHNob3cgcG9wLXVwXG4gICAgICAgIGFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBwb3BVcFByb2plY3RzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxuICAgICAgICAgICAgcG9wVXBQcm9qZWN0cy5zdHlsZS50cmFuc2l0aW9uID0gJ29wYWNpdHkgNTAwbXMgZWFzZS1pbidcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBjbG9zZSBwb3AtdXBcbiAgICAgICAgY2xvc2VQb3BVcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHBvcFVwUHJvamVjdHMuY2xhc3NMaXN0LmFkZCgnaGlkZScpXG4gICAgICAgICAgICBwb3BVcFByb2plY3RzLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSdcbiAgICAgICAgfSlcbiAgICB9XG5cbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBVSSBmcm9tIFwiLi9VSVwiXG5cblVJLmFkZFRhc2tzKClcblVJLmFwcGVuZFByb2plY3QoKVxuVUkuYWRkUHJvamVjdCgpXG5VSS50b2dnbGVQcm9qZWN0UG9wVXAoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==