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
	constructor(name) {
		this.id = Math.floor(Math.random() * 500);
		this.name = name;
		this.tasks = [];
	}

	createTask(name, dueDate, priority) {
		const newTask = new _Task__WEBPACK_IMPORTED_MODULE_0__["default"](name, dueDate, priority);
		this.tasks.push(newTask);

		return newTask;
	}

	getTask(taskId) {
		return this.getTasks.find((task) => task.id === taskId);
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
		this.name = name;
		this.dueDate = dueDate;
		this.priority = priority;
		this.id = this.id = Math.floor(Math.random() * 500);
		this.complete = false;
	}

	getName() {
		return this.name;
	}

	setName(name) {
		this.name = name;
	}

	getDate() {
		return this.dueDate;
	}

	setDate(dueDate) {
		this.dueDate = dueDate;
	}

	getPriority() {
		return this.priority;
	}

	setPriority(priority) {
		this.priority = priority;
	}

	dateFormatted() {
		const day = this.dueDate.split("/")[0];
		const month = this.dueDate.split("/")[1];
		const year = this.dueDate.split("/")[2];
		return `${month}/${day}/${year}`;
	}
}


/***/ }),

/***/ "./src/Todos.js":
/*!**********************!*\
  !*** ./src/Todos.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todos)
/* harmony export */ });
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ "./src/Project.js");


class Todos {
	static projects = [
		new _Project__WEBPACK_IMPORTED_MODULE_0__["default"]("Sample Project 1"),
		new _Project__WEBPACK_IMPORTED_MODULE_0__["default"]("Sample Project 2"),
	];

	static deleteProject(projectId) {
		const projectToDelete = this.projects.find(
			(project) => project.id === projectId
		);
		this.projects.splice(this.projects.indexOf(projectToDelete), 1);
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
/* harmony import */ var _Ui_task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ui_task */ "./src/Ui_task.js");
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Project */ "./src/Project.js");
/* harmony import */ var _Todos__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Todos */ "./src/Todos.js");





class UI {
	static loadPage() {
		this.toggleProjectPopUp();
		this.handleProjectForm();
		this.handleTaskForm();
	}

	static displayTasks() {
		const taskContainer = document.getElementById("todo-list");
		const containerHeader = document.getElementById("content-header");
		const selectedProject = document.querySelector(".active-project");
		const activeProject = _Todos__WEBPACK_IMPORTED_MODULE_3__["default"].projects.find(
			(project) => project.id == selectedProject.dataset.projectId
		);

		this.clearElement(taskContainer);

		containerHeader.textContent = activeProject.name;

		for (const task of activeProject.tasks) {
			this.appendTasks(task);
		}
	}

	static handleTaskForm() {
		const tasksForm = document.getElementById("pop-up-tasks-form");
		const tasksTitle = document.getElementById("task-title");
		const tasksDate = document.getElementById("task-date");
		const tasksPriority = document.getElementById("task-priority");
		const tasksCancelButton = document.getElementById("task-cancel-btn");
		const taskAddButton = document.getElementById("task-submit-btn");
		const popUpTasks = document.getElementById("pop-up-tasks");

		tasksForm.addEventListener("submit", (e) => {
			e.preventDefault();

			const taskTitle = tasksTitle.value;
			const taskDate = tasksDate.value;
			const taskPriority = tasksPriority.value;
			const taskPriorityText =
				tasksPriority.options[tasksPriority.selectedIndex].text;

			if (taskTitle == null || taskTitle == "") {
				return;
			} else if (taskDate == null || taskDate == "") {
				return;
			} else if (taskPriority == null || taskPriority == "") {
				return;
			}

			tasksForm.reset();

			const selectedProject = document.querySelector(
				".active-project"
			);

			const activeProject = _Todos__WEBPACK_IMPORTED_MODULE_3__["default"].projects.find(
				(project) => project.id == selectedProject.dataset.projectId
			);
			const activeProjectTask = activeProject.createTask(
				taskTitle,
				taskDate,
				taskPriorityText
			);

			console.log(activeProjectTask);

			this.appendTasks(activeProjectTask);
		});

		taskAddButton.addEventListener("click", () => {
			if (tasksTitle.value == null || tasksTitle.value == "") {
				return;
			} else if (tasksDate.value == null || tasksDate.value == "") {
				return;
			} else if (tasksPriority.value == null || tasksPriority.value == "") {
				return;
			} else if (
				tasksTitle.value !== null &&
				tasksTitle.value !== "" &&
				tasksDate.value !== null &&
				tasksDate.value !== "" &&
				tasksPriority.value !== null &&
				tasksPriority.value !== ""
			) {
				popUpTasks.classList.add("hide");
			}
		});

		tasksCancelButton.addEventListener("click", () => {
			popUpTasks.classList.add("hide");
			tasksTitle.value = null;
			tasksDate.value = null;
			tasksPriority.value = null;
		});
	}

	static appendTasks(task) {
		const taskContainer = document.getElementById("todo-list");
		taskContainer.appendChild((0,_Ui_task__WEBPACK_IMPORTED_MODULE_1__["default"])(task));
	}

	static handleProjectForm() {
		const projectsForm = document.getElementById("pop-up-projects-form");
		const projectsInput = document.getElementById("projects-title");
		const projectsCancelBtn = document.querySelector("#projects-cancel-btn");
		const projectAddBtn = document.querySelector("#projects-submit-btn");
		const popUpProjects = document.querySelector("#pop-up-projects");

		projectsForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const projectName = projectsInput.value;

			if (projectName == null || projectName == "") return;

			const newProject = new _Project__WEBPACK_IMPORTED_MODULE_2__["default"](projectName);
			projectsInput.value = null;
			_Todos__WEBPACK_IMPORTED_MODULE_3__["default"].projects.push(newProject);
			this.appendProject();
		});

		projectAddBtn.addEventListener("click", () => {
			const projectName = projectsInput.value;
			if (projectName == null || projectName == "") return;
			popUpProjects.classList.add("hide");
			popUpProjects.style.transition = "none";
		});

		projectsCancelBtn.addEventListener("click", () => {
			popUpProjects.classList.add("hide");
			popUpProjects.style.transition = "none";
			projectsInput.value = null;
		});

		this.appendProject();
	}

	static appendProject() {
		const projectsContainer = document.getElementById("project-container");
		const taskContainer = document.getElementById("todo-list");
		const addTaskContainer = document.getElementById("add-task-container");

		this.clearElement(projectsContainer);

		_Todos__WEBPACK_IMPORTED_MODULE_3__["default"].projects.forEach((project) => {
			const projectElement = document.createElement("button");
			projectElement.classList.add("style-button");
			projectElement.classList.add("projects");
			projectElement.dataset.projectId = project.id;

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
                    <div class="del-btn" data-delete-project>
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                </div>`;

			projectElement.addEventListener("click", (e) => {
				const activeProject = document.querySelector(".active-project");
				const projectTitle = projectElement.children[0].children[1];

				if (e.target.classList.contains("fa-trash-can")) {
                    _Todos__WEBPACK_IMPORTED_MODULE_3__["default"].deleteProject(project.id)
                    projectElement.remove()
					return;
				} else if (e.target.classList.contains("fa-plus")) {
					this.toggleTaskPopUp();
					return;
				} else if (e.target.classList.contains("fa-pen-to-square")) {
					this.toggleEditProject(projectTitle, project);
					return;
				}

				if (activeProject) {
					activeProject.classList.remove("active-project");
				}

				projectElement.classList.add("active-project");
				addTaskContainer.classList.remove("hide");
				this.addTaskButtonHandler();
				this.displayTasks();
			});

			projectsContainer.appendChild(projectElement);
		});
	}

	static clearElement(element) {
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
	}

	static addTaskButtonHandler() {
		const popUpTasks = document.getElementById("pop-up-tasks");
		const addTaskBtn = document.getElementById("add-task-container");
		const closePopUp = document.getElementById("close-pop-up-tasks");

		addTaskBtn.addEventListener("click", () => {
			popUpTasks.classList.remove("hide");
		});

		closePopUp.addEventListener("click", () => {
			popUpTasks.classList.add("hide");
		});
	}

	static toggleTaskPopUp() {
		const popUpTasks = document.getElementById("pop-up-tasks");
		const closePopUp = document.getElementById("close-pop-up-tasks");

		popUpTasks.classList.remove("hide");

		closePopUp.addEventListener("click", () => {
			popUpTasks.classList.add("hide");
		});
	}

	static toggleEditProject(projectName, project) {
		const containerHeader = document.getElementById("content-header");
		const editProjectPopUp = document.getElementById("pop-up-projects-edit");
		const editProjectContainer = document.getElementById("edit-project-form");

        editProjectContainer.innerHTML = ''

		const editProjectForm = document.createElement("form");
        editProjectForm.classList.add("pop-up-projects-form")
		editProjectForm.innerHTML = `
        <label for="edit-project-title">Change Project Title</label>
        <input type="text" name="edit-project-title" id="edit-project-title" maxlength="30" required>
        <div class="form-buttons">
            <button type="submit" class="submit-btn" id="edit-project-confirm-btn">Confirm</button>
            <button class="cancel-btn" id="edit-project-cancel-btn" type="button">Cancel</button>
        </div>
        `;
        editProjectContainer.appendChild(editProjectForm)
        const editProjectTitle = document.getElementById("edit-project-title");
        const editProjectCancelButton = document.getElementById(
			"edit-project-cancel-btn"
		);
		const closeEditProject = document.getElementById("close-edit-project");
		editProjectPopUp.classList.remove("hide");
        editProjectTitle.value = project.name;

		editProjectForm.addEventListener("submit", (e) => {
			e.preventDefault();

			if (editProjectTitle.value === null || editProjectTitle === "") return;
			if (editProjectTitle.value !== null || editProjectTitle.value !== "") {
				editProjectPopUp.classList.add("hide");
			}
			projectName.textContent = editProjectTitle.value;
			project.name = editProjectTitle.value;
			containerHeader.textContent = editProjectTitle.value;
		});

		editProjectCancelButton.addEventListener("click", () => {
			editProjectPopUp.classList.add("hide");
		});

		closeEditProject.addEventListener("click", () => {
			editProjectPopUp.classList.add("hide");
		});
	}

	static toggleProjectPopUp() {
		const addProjectBtn = document.querySelector("#add-project-btn");
		const closePopUp = document.querySelector("#close-pop-up-projects");
		const popUpProjects = document.querySelector("#pop-up-projects");

		// show pop-up
		addProjectBtn.addEventListener("click", () => {
			popUpProjects.classList.remove("hide");
			popUpProjects.style.transition = "opacity 500ms ease-in";
		});

		// close pop-up
		closePopUp.addEventListener("click", () => {
			popUpProjects.classList.add("hide");
			popUpProjects.style.transition = "none";
		});
	}
}


/***/ }),

/***/ "./src/Ui_task.js":
/*!************************!*\
  !*** ./src/Ui_task.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(task) {
    
    const tasksElement = document.createElement("div");
    tasksElement.classList.add("todo-card");
    tasksElement.id = "todo-card";
    tasksElement.innerHTML += `
        <label class="todo">${task.name}
            <input type="checkbox">
            <span class="checkmark"></span>
        </label>
        <div class="todo-right-el">
            <p class="task-date">${task.dueDate}</p>
            <p class="task-priority">${task.priority}</p>
            <i class="fa-solid fa-pen-to-square pen"></i>
            <i class="fa-solid fa-trash-can trash" data-delete-task></i>
        </div>
        `;
    const checkbox = tasksElement.querySelector("input");
    checkbox.checked = task.complete;
    checkbox.id = task.id;
    const label = tasksElement.querySelector("label");
    label.htmlFor = task.id;

    return tasksElement
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDeFNBLDZCQUFlLG9DQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsYUFBYTtBQUNoRCx1Q0FBdUMsY0FBYztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7O1VDekJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOcUI7O0FBRXJCLDJDQUFFLFciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8vLi9zcmMvUHJvamVjdC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8vLi9zcmMvVGFzay5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8vLi9zcmMvVG9kb3MuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL1VJLmpzIiwid2VicGFjazovL29kaW4tdG9kby8uL3NyYy9VaV90YXNrLmpzIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFzayBmcm9tIFwiLi9UYXNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuXHRjb25zdHJ1Y3RvcihuYW1lKSB7XG5cdFx0dGhpcy5pZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUwMCk7XG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHR0aGlzLnRhc2tzID0gW107XG5cdH1cblxuXHRjcmVhdGVUYXNrKG5hbWUsIGR1ZURhdGUsIHByaW9yaXR5KSB7XG5cdFx0Y29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKG5hbWUsIGR1ZURhdGUsIHByaW9yaXR5KTtcblx0XHR0aGlzLnRhc2tzLnB1c2gobmV3VGFzayk7XG5cblx0XHRyZXR1cm4gbmV3VGFzaztcblx0fVxuXG5cdGdldFRhc2sodGFza0lkKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0VGFza3MuZmluZCgodGFzaykgPT4gdGFzay5pZCA9PT0gdGFza0lkKTtcblx0fVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG5cdGNvbnN0cnVjdG9yKG5hbWUsIGR1ZURhdGUsIHByaW9yaXR5KSB7XG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHR0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuXHRcdHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcblx0XHR0aGlzLmlkID0gdGhpcy5pZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUwMCk7XG5cdFx0dGhpcy5jb21wbGV0ZSA9IGZhbHNlO1xuXHR9XG5cblx0Z2V0TmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5uYW1lO1xuXHR9XG5cblx0c2V0TmFtZShuYW1lKSB7XG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0fVxuXG5cdGdldERhdGUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZHVlRGF0ZTtcblx0fVxuXG5cdHNldERhdGUoZHVlRGF0ZSkge1xuXHRcdHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG5cdH1cblxuXHRnZXRQcmlvcml0eSgpIHtcblx0XHRyZXR1cm4gdGhpcy5wcmlvcml0eTtcblx0fVxuXG5cdHNldFByaW9yaXR5KHByaW9yaXR5KSB7XG5cdFx0dGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuXHR9XG5cblx0ZGF0ZUZvcm1hdHRlZCgpIHtcblx0XHRjb25zdCBkYXkgPSB0aGlzLmR1ZURhdGUuc3BsaXQoXCIvXCIpWzBdO1xuXHRcdGNvbnN0IG1vbnRoID0gdGhpcy5kdWVEYXRlLnNwbGl0KFwiL1wiKVsxXTtcblx0XHRjb25zdCB5ZWFyID0gdGhpcy5kdWVEYXRlLnNwbGl0KFwiL1wiKVsyXTtcblx0XHRyZXR1cm4gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9YDtcblx0fVxufVxuIiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vUHJvamVjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvcyB7XG5cdHN0YXRpYyBwcm9qZWN0cyA9IFtcblx0XHRuZXcgUHJvamVjdChcIlNhbXBsZSBQcm9qZWN0IDFcIiksXG5cdFx0bmV3IFByb2plY3QoXCJTYW1wbGUgUHJvamVjdCAyXCIpLFxuXHRdO1xuXG5cdHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3RJZCkge1xuXHRcdGNvbnN0IHByb2plY3RUb0RlbGV0ZSA9IHRoaXMucHJvamVjdHMuZmluZChcblx0XHRcdChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkID09PSBwcm9qZWN0SWRcblx0XHQpO1xuXHRcdHRoaXMucHJvamVjdHMuc3BsaWNlKHRoaXMucHJvamVjdHMuaW5kZXhPZihwcm9qZWN0VG9EZWxldGUpLCAxKTtcblx0fVxuXG59XG4iLCJpbXBvcnQgVGFzayBmcm9tIFwiLi9UYXNrXCI7XG5pbXBvcnQgVWlfdGFzayBmcm9tIFwiLi9VaV90YXNrXCI7XG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9Qcm9qZWN0XCI7XG5pbXBvcnQgVG9kb3MgZnJvbSBcIi4vVG9kb3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xuXHRzdGF0aWMgbG9hZFBhZ2UoKSB7XG5cdFx0dGhpcy50b2dnbGVQcm9qZWN0UG9wVXAoKTtcblx0XHR0aGlzLmhhbmRsZVByb2plY3RGb3JtKCk7XG5cdFx0dGhpcy5oYW5kbGVUYXNrRm9ybSgpO1xuXHR9XG5cblx0c3RhdGljIGRpc3BsYXlUYXNrcygpIHtcblx0XHRjb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvLWxpc3RcIik7XG5cdFx0Y29uc3QgY29udGFpbmVySGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50LWhlYWRlclwiKTtcblx0XHRjb25zdCBzZWxlY3RlZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjdGl2ZS1wcm9qZWN0XCIpO1xuXHRcdGNvbnN0IGFjdGl2ZVByb2plY3QgPSBUb2Rvcy5wcm9qZWN0cy5maW5kKFxuXHRcdFx0KHByb2plY3QpID0+IHByb2plY3QuaWQgPT0gc2VsZWN0ZWRQcm9qZWN0LmRhdGFzZXQucHJvamVjdElkXG5cdFx0KTtcblxuXHRcdHRoaXMuY2xlYXJFbGVtZW50KHRhc2tDb250YWluZXIpO1xuXG5cdFx0Y29udGFpbmVySGVhZGVyLnRleHRDb250ZW50ID0gYWN0aXZlUHJvamVjdC5uYW1lO1xuXG5cdFx0Zm9yIChjb25zdCB0YXNrIG9mIGFjdGl2ZVByb2plY3QudGFza3MpIHtcblx0XHRcdHRoaXMuYXBwZW5kVGFza3ModGFzayk7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGhhbmRsZVRhc2tGb3JtKCkge1xuXHRcdGNvbnN0IHRhc2tzRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9wLXVwLXRhc2tzLWZvcm1cIik7XG5cdFx0Y29uc3QgdGFza3NUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay10aXRsZVwiKTtcblx0XHRjb25zdCB0YXNrc0RhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZGF0ZVwiKTtcblx0XHRjb25zdCB0YXNrc1ByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXByaW9yaXR5XCIpO1xuXHRcdGNvbnN0IHRhc2tzQ2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWNhbmNlbC1idG5cIik7XG5cdFx0Y29uc3QgdGFza0FkZEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1zdWJtaXQtYnRuXCIpO1xuXHRcdGNvbnN0IHBvcFVwVGFza3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvcC11cC10YXNrc1wiKTtcblxuXHRcdHRhc2tzRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGNvbnN0IHRhc2tUaXRsZSA9IHRhc2tzVGl0bGUudmFsdWU7XG5cdFx0XHRjb25zdCB0YXNrRGF0ZSA9IHRhc2tzRGF0ZS52YWx1ZTtcblx0XHRcdGNvbnN0IHRhc2tQcmlvcml0eSA9IHRhc2tzUHJpb3JpdHkudmFsdWU7XG5cdFx0XHRjb25zdCB0YXNrUHJpb3JpdHlUZXh0ID1cblx0XHRcdFx0dGFza3NQcmlvcml0eS5vcHRpb25zW3Rhc2tzUHJpb3JpdHkuc2VsZWN0ZWRJbmRleF0udGV4dDtcblxuXHRcdFx0aWYgKHRhc2tUaXRsZSA9PSBudWxsIHx8IHRhc2tUaXRsZSA9PSBcIlwiKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH0gZWxzZSBpZiAodGFza0RhdGUgPT0gbnVsbCB8fCB0YXNrRGF0ZSA9PSBcIlwiKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH0gZWxzZSBpZiAodGFza1ByaW9yaXR5ID09IG51bGwgfHwgdGFza1ByaW9yaXR5ID09IFwiXCIpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR0YXNrc0Zvcm0ucmVzZXQoKTtcblxuXHRcdFx0Y29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihcblx0XHRcdFx0XCIuYWN0aXZlLXByb2plY3RcIlxuXHRcdFx0KTtcblxuXHRcdFx0Y29uc3QgYWN0aXZlUHJvamVjdCA9IFRvZG9zLnByb2plY3RzLmZpbmQoXG5cdFx0XHRcdChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkID09IHNlbGVjdGVkUHJvamVjdC5kYXRhc2V0LnByb2plY3RJZFxuXHRcdFx0KTtcblx0XHRcdGNvbnN0IGFjdGl2ZVByb2plY3RUYXNrID0gYWN0aXZlUHJvamVjdC5jcmVhdGVUYXNrKFxuXHRcdFx0XHR0YXNrVGl0bGUsXG5cdFx0XHRcdHRhc2tEYXRlLFxuXHRcdFx0XHR0YXNrUHJpb3JpdHlUZXh0XG5cdFx0XHQpO1xuXG5cdFx0XHRjb25zb2xlLmxvZyhhY3RpdmVQcm9qZWN0VGFzayk7XG5cblx0XHRcdHRoaXMuYXBwZW5kVGFza3MoYWN0aXZlUHJvamVjdFRhc2spO1xuXHRcdH0pO1xuXG5cdFx0dGFza0FkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0aWYgKHRhc2tzVGl0bGUudmFsdWUgPT0gbnVsbCB8fCB0YXNrc1RpdGxlLnZhbHVlID09IFwiXCIpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fSBlbHNlIGlmICh0YXNrc0RhdGUudmFsdWUgPT0gbnVsbCB8fCB0YXNrc0RhdGUudmFsdWUgPT0gXCJcIikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9IGVsc2UgaWYgKHRhc2tzUHJpb3JpdHkudmFsdWUgPT0gbnVsbCB8fCB0YXNrc1ByaW9yaXR5LnZhbHVlID09IFwiXCIpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fSBlbHNlIGlmIChcblx0XHRcdFx0dGFza3NUaXRsZS52YWx1ZSAhPT0gbnVsbCAmJlxuXHRcdFx0XHR0YXNrc1RpdGxlLnZhbHVlICE9PSBcIlwiICYmXG5cdFx0XHRcdHRhc2tzRGF0ZS52YWx1ZSAhPT0gbnVsbCAmJlxuXHRcdFx0XHR0YXNrc0RhdGUudmFsdWUgIT09IFwiXCIgJiZcblx0XHRcdFx0dGFza3NQcmlvcml0eS52YWx1ZSAhPT0gbnVsbCAmJlxuXHRcdFx0XHR0YXNrc1ByaW9yaXR5LnZhbHVlICE9PSBcIlwiXG5cdFx0XHQpIHtcblx0XHRcdFx0cG9wVXBUYXNrcy5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRhc2tzQ2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRwb3BVcFRhc2tzLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuXHRcdFx0dGFza3NUaXRsZS52YWx1ZSA9IG51bGw7XG5cdFx0XHR0YXNrc0RhdGUudmFsdWUgPSBudWxsO1xuXHRcdFx0dGFza3NQcmlvcml0eS52YWx1ZSA9IG51bGw7XG5cdFx0fSk7XG5cdH1cblxuXHRzdGF0aWMgYXBwZW5kVGFza3ModGFzaykge1xuXHRcdGNvbnN0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG8tbGlzdFwiKTtcblx0XHR0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKFVpX3Rhc2sodGFzaykpO1xuXHR9XG5cblx0c3RhdGljIGhhbmRsZVByb2plY3RGb3JtKCkge1xuXHRcdGNvbnN0IHByb2plY3RzRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9wLXVwLXByb2plY3RzLWZvcm1cIik7XG5cdFx0Y29uc3QgcHJvamVjdHNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdHMtdGl0bGVcIik7XG5cdFx0Y29uc3QgcHJvamVjdHNDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzLWNhbmNlbC1idG5cIik7XG5cdFx0Y29uc3QgcHJvamVjdEFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHMtc3VibWl0LWJ0blwiKTtcblx0XHRjb25zdCBwb3BVcFByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwb3AtdXAtcHJvamVjdHNcIik7XG5cblx0XHRwcm9qZWN0c0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Y29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0c0lucHV0LnZhbHVlO1xuXG5cdFx0XHRpZiAocHJvamVjdE5hbWUgPT0gbnVsbCB8fCBwcm9qZWN0TmFtZSA9PSBcIlwiKSByZXR1cm47XG5cblx0XHRcdGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0TmFtZSk7XG5cdFx0XHRwcm9qZWN0c0lucHV0LnZhbHVlID0gbnVsbDtcblx0XHRcdFRvZG9zLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG5cdFx0XHR0aGlzLmFwcGVuZFByb2plY3QoKTtcblx0XHR9KTtcblxuXHRcdHByb2plY3RBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGNvbnN0IHByb2plY3ROYW1lID0gcHJvamVjdHNJbnB1dC52YWx1ZTtcblx0XHRcdGlmIChwcm9qZWN0TmFtZSA9PSBudWxsIHx8IHByb2plY3ROYW1lID09IFwiXCIpIHJldHVybjtcblx0XHRcdHBvcFVwUHJvamVjdHMuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG5cdFx0XHRwb3BVcFByb2plY3RzLnN0eWxlLnRyYW5zaXRpb24gPSBcIm5vbmVcIjtcblx0XHR9KTtcblxuXHRcdHByb2plY3RzQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRwb3BVcFByb2plY3RzLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuXHRcdFx0cG9wVXBQcm9qZWN0cy5zdHlsZS50cmFuc2l0aW9uID0gXCJub25lXCI7XG5cdFx0XHRwcm9qZWN0c0lucHV0LnZhbHVlID0gbnVsbDtcblx0XHR9KTtcblxuXHRcdHRoaXMuYXBwZW5kUHJvamVjdCgpO1xuXHR9XG5cblx0c3RhdGljIGFwcGVuZFByb2plY3QoKSB7XG5cdFx0Y29uc3QgcHJvamVjdHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtY29udGFpbmVyXCIpO1xuXHRcdGNvbnN0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG8tbGlzdFwiKTtcblx0XHRjb25zdCBhZGRUYXNrQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1jb250YWluZXJcIik7XG5cblx0XHR0aGlzLmNsZWFyRWxlbWVudChwcm9qZWN0c0NvbnRhaW5lcik7XG5cblx0XHRUb2Rvcy5wcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG5cdFx0XHRjb25zdCBwcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0XHRwcm9qZWN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic3R5bGUtYnV0dG9uXCIpO1xuXHRcdFx0cHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInByb2plY3RzXCIpO1xuXHRcdFx0cHJvamVjdEVsZW1lbnQuZGF0YXNldC5wcm9qZWN0SWQgPSBwcm9qZWN0LmlkO1xuXG5cdFx0XHRwcm9qZWN0RWxlbWVudC5pbm5lckhUTUwgKz0gYFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0LWVsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtbGlzdC1jaGVja1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1wcm9qZWN0LW5hbWU+JHtwcm9qZWN0Lm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodC1lbFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZWRpdC1idG5cIiBjbGFzcz1cImVkaXQtYnRuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBlbi10by1zcXVhcmVcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkLXRhc2stYnRuXCIgZGF0YS1idXR0b24tdGFzaz4gXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBsdXNcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVsLWJ0blwiIGRhdGEtZGVsZXRlLXByb2plY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoLWNhblwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+YDtcblxuXHRcdFx0cHJvamVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGFjdGl2ZVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjdGl2ZS1wcm9qZWN0XCIpO1xuXHRcdFx0XHRjb25zdCBwcm9qZWN0VGl0bGUgPSBwcm9qZWN0RWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlblsxXTtcblxuXHRcdFx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmEtdHJhc2gtY2FuXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIFRvZG9zLmRlbGV0ZVByb2plY3QocHJvamVjdC5pZClcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdEVsZW1lbnQucmVtb3ZlKClcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmEtcGx1c1wiKSkge1xuXHRcdFx0XHRcdHRoaXMudG9nZ2xlVGFza1BvcFVwKCk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImZhLXBlbi10by1zcXVhcmVcIikpIHtcblx0XHRcdFx0XHR0aGlzLnRvZ2dsZUVkaXRQcm9qZWN0KHByb2plY3RUaXRsZSwgcHJvamVjdCk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGFjdGl2ZVByb2plY3QpIHtcblx0XHRcdFx0XHRhY3RpdmVQcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmUtcHJvamVjdFwiKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHByb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmUtcHJvamVjdFwiKTtcblx0XHRcdFx0YWRkVGFza0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcblx0XHRcdFx0dGhpcy5hZGRUYXNrQnV0dG9uSGFuZGxlcigpO1xuXHRcdFx0XHR0aGlzLmRpc3BsYXlUYXNrcygpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RFbGVtZW50KTtcblx0XHR9KTtcblx0fVxuXG5cdHN0YXRpYyBjbGVhckVsZW1lbnQoZWxlbWVudCkge1xuXHRcdHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcblx0XHRcdGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgYWRkVGFza0J1dHRvbkhhbmRsZXIoKSB7XG5cdFx0Y29uc3QgcG9wVXBUYXNrcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9wLXVwLXRhc2tzXCIpO1xuXHRcdGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWNvbnRhaW5lclwiKTtcblx0XHRjb25zdCBjbG9zZVBvcFVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZS1wb3AtdXAtdGFza3NcIik7XG5cblx0XHRhZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRwb3BVcFRhc2tzLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuXHRcdH0pO1xuXG5cdFx0Y2xvc2VQb3BVcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0cG9wVXBUYXNrcy5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcblx0XHR9KTtcblx0fVxuXG5cdHN0YXRpYyB0b2dnbGVUYXNrUG9wVXAoKSB7XG5cdFx0Y29uc3QgcG9wVXBUYXNrcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9wLXVwLXRhc2tzXCIpO1xuXHRcdGNvbnN0IGNsb3NlUG9wVXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlLXBvcC11cC10YXNrc1wiKTtcblxuXHRcdHBvcFVwVGFza3MuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG5cblx0XHRjbG9zZVBvcFVwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRwb3BVcFRhc2tzLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuXHRcdH0pO1xuXHR9XG5cblx0c3RhdGljIHRvZ2dsZUVkaXRQcm9qZWN0KHByb2plY3ROYW1lLCBwcm9qZWN0KSB7XG5cdFx0Y29uc3QgY29udGFpbmVySGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50LWhlYWRlclwiKTtcblx0XHRjb25zdCBlZGl0UHJvamVjdFBvcFVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3AtdXAtcHJvamVjdHMtZWRpdFwiKTtcblx0XHRjb25zdCBlZGl0UHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC1wcm9qZWN0LWZvcm1cIik7XG5cbiAgICAgICAgZWRpdFByb2plY3RDb250YWluZXIuaW5uZXJIVE1MID0gJydcblxuXHRcdGNvbnN0IGVkaXRQcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICAgICAgICBlZGl0UHJvamVjdEZvcm0uY2xhc3NMaXN0LmFkZChcInBvcC11cC1wcm9qZWN0cy1mb3JtXCIpXG5cdFx0ZWRpdFByb2plY3RGb3JtLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGxhYmVsIGZvcj1cImVkaXQtcHJvamVjdC10aXRsZVwiPkNoYW5nZSBQcm9qZWN0IFRpdGxlPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImVkaXQtcHJvamVjdC10aXRsZVwiIGlkPVwiZWRpdC1wcm9qZWN0LXRpdGxlXCIgbWF4bGVuZ3RoPVwiMzBcIiByZXF1aXJlZD5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tYnV0dG9uc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJzdWJtaXQtYnRuXCIgaWQ9XCJlZGl0LXByb2plY3QtY29uZmlybS1idG5cIj5Db25maXJtPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2FuY2VsLWJ0blwiIGlkPVwiZWRpdC1wcm9qZWN0LWNhbmNlbC1idG5cIiB0eXBlPVwiYnV0dG9uXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgICAgICBlZGl0UHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0UHJvamVjdEZvcm0pXG4gICAgICAgIGNvbnN0IGVkaXRQcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtcHJvamVjdC10aXRsZVwiKTtcbiAgICAgICAgY29uc3QgZWRpdFByb2plY3RDYW5jZWxCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcblx0XHRcdFwiZWRpdC1wcm9qZWN0LWNhbmNlbC1idG5cIlxuXHRcdCk7XG5cdFx0Y29uc3QgY2xvc2VFZGl0UHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2UtZWRpdC1wcm9qZWN0XCIpO1xuXHRcdGVkaXRQcm9qZWN0UG9wVXAuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG4gICAgICAgIGVkaXRQcm9qZWN0VGl0bGUudmFsdWUgPSBwcm9qZWN0Lm5hbWU7XG5cblx0XHRlZGl0UHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRpZiAoZWRpdFByb2plY3RUaXRsZS52YWx1ZSA9PT0gbnVsbCB8fCBlZGl0UHJvamVjdFRpdGxlID09PSBcIlwiKSByZXR1cm47XG5cdFx0XHRpZiAoZWRpdFByb2plY3RUaXRsZS52YWx1ZSAhPT0gbnVsbCB8fCBlZGl0UHJvamVjdFRpdGxlLnZhbHVlICE9PSBcIlwiKSB7XG5cdFx0XHRcdGVkaXRQcm9qZWN0UG9wVXAuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG5cdFx0XHR9XG5cdFx0XHRwcm9qZWN0TmFtZS50ZXh0Q29udGVudCA9IGVkaXRQcm9qZWN0VGl0bGUudmFsdWU7XG5cdFx0XHRwcm9qZWN0Lm5hbWUgPSBlZGl0UHJvamVjdFRpdGxlLnZhbHVlO1xuXHRcdFx0Y29udGFpbmVySGVhZGVyLnRleHRDb250ZW50ID0gZWRpdFByb2plY3RUaXRsZS52YWx1ZTtcblx0XHR9KTtcblxuXHRcdGVkaXRQcm9qZWN0Q2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRlZGl0UHJvamVjdFBvcFVwLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuXHRcdH0pO1xuXG5cdFx0Y2xvc2VFZGl0UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0ZWRpdFByb2plY3RQb3BVcC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcblx0XHR9KTtcblx0fVxuXG5cdHN0YXRpYyB0b2dnbGVQcm9qZWN0UG9wVXAoKSB7XG5cdFx0Y29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXByb2plY3QtYnRuXCIpO1xuXHRcdGNvbnN0IGNsb3NlUG9wVXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Nsb3NlLXBvcC11cC1wcm9qZWN0c1wiKTtcblx0XHRjb25zdCBwb3BVcFByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwb3AtdXAtcHJvamVjdHNcIik7XG5cblx0XHQvLyBzaG93IHBvcC11cFxuXHRcdGFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdHBvcFVwUHJvamVjdHMuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG5cdFx0XHRwb3BVcFByb2plY3RzLnN0eWxlLnRyYW5zaXRpb24gPSBcIm9wYWNpdHkgNTAwbXMgZWFzZS1pblwiO1xuXHRcdH0pO1xuXG5cdFx0Ly8gY2xvc2UgcG9wLXVwXG5cdFx0Y2xvc2VQb3BVcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0cG9wVXBQcm9qZWN0cy5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcblx0XHRcdHBvcFVwUHJvamVjdHMuc3R5bGUudHJhbnNpdGlvbiA9IFwibm9uZVwiO1xuXHRcdH0pO1xuXHR9XG59XG4iLCJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRhc2spIHtcbiAgICBcbiAgICBjb25zdCB0YXNrc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRhc2tzRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidG9kby1jYXJkXCIpO1xuICAgIHRhc2tzRWxlbWVudC5pZCA9IFwidG9kby1jYXJkXCI7XG4gICAgdGFza3NFbGVtZW50LmlubmVySFRNTCArPSBgXG4gICAgICAgIDxsYWJlbCBjbGFzcz1cInRvZG9cIj4ke3Rhc2submFtZX1cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hlY2ttYXJrXCI+PC9zcGFuPlxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1yaWdodC1lbFwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJ0YXNrLWRhdGVcIj4ke3Rhc2suZHVlRGF0ZX08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInRhc2stcHJpb3JpdHlcIj4ke3Rhc2sucHJpb3JpdHl9PC9wPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1wZW4tdG8tc3F1YXJlIHBlblwiPjwvaT5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtdHJhc2gtY2FuIHRyYXNoXCIgZGF0YS1kZWxldGUtdGFzaz48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgIGNvbnN0IGNoZWNrYm94ID0gdGFza3NFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgICBjaGVja2JveC5jaGVja2VkID0gdGFzay5jb21wbGV0ZTtcbiAgICBjaGVja2JveC5pZCA9IHRhc2suaWQ7XG4gICAgY29uc3QgbGFiZWwgPSB0YXNrc0VsZW1lbnQucXVlcnlTZWxlY3RvcihcImxhYmVsXCIpO1xuICAgIGxhYmVsLmh0bWxGb3IgPSB0YXNrLmlkO1xuXG4gICAgcmV0dXJuIHRhc2tzRWxlbWVudFxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFVJIGZyb20gXCIuL1VJXCJcblxuVUkubG9hZFBhZ2UoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==