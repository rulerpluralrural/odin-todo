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
		this.tasks = [{
			name: 'Sample Task 1',
			dueDate: '09/28/2024',
			priority: 'Not Important',
			id: 33,
			complete: false
		}];
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

/***/ "./src/Task_Element.js":
/*!*****************************!*\
  !*** ./src/Task_Element.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTaskElement: () => (/* binding */ createTaskElement),
/* harmony export */   taskHandler: () => (/* binding */ taskHandler)
/* harmony export */ });
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ "./src/Project.js");


function createTaskElement(task) {
	const tasksElement = document.createElement("div");
	tasksElement.classList.add("todo-card");
	tasksElement.innerHTML += `
        <label class="todo">${task.name}
            <input type="checkbox">
            <span class="checkmark"></span>
        </label>
        <div class="todo-right-el">
            <p class="task-date">${task.dueDate}</p>
            <p class="task-priority">${task.priority}</p>
            <i class="fa-solid fa-pen-to-square pen" data-edit-task></i>
            <i class="fa-solid fa-trash-can trash" data-delete-task></i>
        </div>
        `;
	const checkbox = tasksElement.querySelector("input");
	checkbox.checked = task.complete;
	checkbox.id = task.id;
	const label = tasksElement.querySelector("label");
	label.htmlFor = task.id;

	return tasksElement;
}

function taskHandler() {
	const editTask = document.querySelector("[data-edit-task]");
	const deleteTask = document.querySelector("[data-delete-task]");

	editTask.addEventListener("click", (e) => {
        const selectedTaskId = e.target.parentNode.parentNode.children[0].children[0].id
        handleEditTaskForm(selectedTaskId)
    });

	// deleteTask.addEventListener("click", handleDeleteTask);
}

const handleEditTaskForm = (selectedTaskId) => {
    console.log(selectedTaskId)
	const popUpEditTaskForm = document.getElementById("pop-up-tasks-edit");
	const editTaskFormContainer = document.getElementById("edit-tasks-form");

	popUpEditTaskForm.classList.remove("hide");

	const editTaskForm = document.createElement("form");
    editTaskForm.classList.add('form')
    editTaskForm.classList.add('pop-up-tasks-form')
	editTaskForm.innerHTML += `
    <label for="edit-task-title">Title</label>
		<input type="text" name="task-title" id="edit-task-title" maxlength="30" required>
		<label for="date">Due Date</label>
		<input type="date" name="date" class="task-date" id="edit-task-date" required>
		<label for="priority">Priority</label>
		<select name="edit-task-priority" id="edit-task-priority" required>
			<option value="" disabled="" selected="">How important is this task?</option>
			<option value="not-important">Not Important</option>
			<option value="important">Important !</option>
		</select>
		<div class="form-buttons">
			<button type="submit" class="edit-task-submit-btn" id="edit-task-submit-btn">Add</button>
			<button	button class="edit-task-cancel-btn" id="edit-task-cancel-btn" type="button">Cancel</button>
		</div>
    `;
    editTaskFormContainer.appendChild(editTaskForm)

    editTaskForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const editTaskTitle = document.getElementById('edit-task-title')
        const editTaskDate = document.getElementById('edit-task-date')
        const editTaskPriority = document.getElementById('edit-task-priority')
        
        if (editTaskTitle.value == null || editTaskTitle.value == "") {
            return;
        } else if (editTaskDate.value == null || editTaskDate.value == "") {
            return;
        } else if (editTaskPriority.value == null || editTaskPriority.value == "") {
            return;
        } else if (
            editTaskTitle.value !== null &&
            editTaskTitle.value !== "" &&
            editTaskDate.value !== null &&
            editTaskDate.value !== "" &&
            editTaskPriority.value !== null &&
            editTaskPriority.value !== ""
        ) {
            popUpEditTaskForm.classList.add("hide");
        }

        const findSelectedTaskId = _Project__WEBPACK_IMPORTED_MODULE_0__["default"].tasks.find((task) => task.id == selectedTaskId.id)

        console.log(findSelectedTaskId)
    })

};


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
/* harmony import */ var _Task_Element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Task_Element */ "./src/Task_Element.js");
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Project */ "./src/Project.js");
/* harmony import */ var _Todos__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Todos */ "./src/Todos.js");





class UI {
	static loadPage() {
		this.toggleProjectPopUp();
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
			this.appendTask(task)
		}
		(0,_Task_Element__WEBPACK_IMPORTED_MODULE_1__.taskHandler)()
	}

	static handleTaskForm() {
		const popUpTasks = document.getElementById("pop-up-tasks");
		const taskFormContainer = document.getElementById("pop-up-tasks-form");

		taskFormContainer.innerHTML = "";

		const tasksForm = document.createElement("form");
		tasksForm.classList.add("form");
		tasksForm.classList.add("pop-up-tasks-form");

		tasksForm.innerHTML += `
		<label for="task-title">Title</label>
		<input type="text" name="task-title" id="task-title" maxlength="30" required>
		<label for="date">Due Date</label>
		<input type="date" name="date" class="task-date" id="task-date" required>
		<label for="priority">Priority</label>
		<select name="priority" id="task-priority" required>
			<option value="" disabled="" selected="">How important is this task?</option>
			<option value="not-important">Not Important</option>
			<option value="important">Important !</option>
		</select>
		<div class="form-buttons">
			<button type="submit" class="task-submit-btn" id="task-submit-btn">Add</button>
			<button	button class="task-cancel-btn" id="task-cancel-btn" type="button">Cancel</button>
		</div>
		`;
		taskFormContainer.appendChild(tasksForm);

		tasksForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const tasksTitle = document.getElementById("task-title");
			const tasksDate = document.getElementById("task-date");
			const tasksPriority = document.getElementById("task-priority");

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

			const selectedProject = document.querySelector('.active-project')

			const activeProject = _Todos__WEBPACK_IMPORTED_MODULE_3__["default"].projects.find(
				(project) => project.id == selectedProject.dataset.projectId
			);

			const activeProjectTask = activeProject.createTask(
				tasksTitle.value,
				tasksDate.value,
				tasksPriority.options[tasksPriority.selectedIndex].text
			);
			tasksForm.reset();

			this.appendTask(activeProjectTask)
		});

		const tasksCancelButton = document.getElementById("task-cancel-btn");

		tasksCancelButton.addEventListener("click", () => {
			popUpTasks.classList.add("hide");
			tasksForm.reset();
		});
	}

	static appendTask(activeProjectTask) {
		const taskContainer = document.getElementById("todo-list");

		taskContainer.appendChild((0,_Task_Element__WEBPACK_IMPORTED_MODULE_1__.createTaskElement)(activeProjectTask));
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
                    <div class="del-btn" data-delete-project>
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                </div>`;

			projectElement.addEventListener("click", (e) => {
				const activeProject = document.querySelector(".active-project");
				const projectTitle = projectElement.children[0].children[1];

				if (e.target.classList.contains("fa-trash-can")) {
					_Todos__WEBPACK_IMPORTED_MODULE_3__["default"].deleteProject(project.id);
					projectElement.remove();
					console.log(_Todos__WEBPACK_IMPORTED_MODULE_3__["default"].projects);
					return;
				} else if (e.target.classList.contains("fa-pen-to-square")) {
					this.toggleEditProject(projectTitle, project);
					console.log(_Todos__WEBPACK_IMPORTED_MODULE_3__["default"].projects);
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

		this.handleTaskForm()
	}

	static toggleEditProject(projectName, project) {
		const containerHeader = document.getElementById("content-header");
		const editProjectPopUp = document.getElementById("pop-up-projects-edit");
		const editProjectContainer = document.getElementById("edit-project-form");

		editProjectContainer.innerHTML = "";

		const editProjectForm = document.createElement("form");
		editProjectForm.classList.add("pop-up-projects-form");
		editProjectForm.classList.add("form");
		editProjectForm.innerHTML = `
        <label for="edit-project-title">Change Project Title</label>
        <input type="text" name="edit-project-title" id="edit-project-title" maxlength="30" required>
        <div class="form-buttons">
            <button type="submit" class="submit-btn" id="edit-project-confirm-btn">Confirm</button>
            <button class="cancel-btn" id="edit-project-cancel-btn" type="button">Cancel</button>
        </div>
        `;
		editProjectContainer.appendChild(editProjectForm);
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

		this.handleProjectForm();
	}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnFCOztBQUVyQiwyQ0FBRSxXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL1Rhc2suanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL1Rhc2tfRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8vLi9zcmMvVG9kb3MuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL1VJLmpzIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFzayBmcm9tIFwiLi9UYXNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuXHRjb25zdHJ1Y3RvcihuYW1lKSB7XG5cdFx0dGhpcy5pZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUwMCk7XG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHR0aGlzLnRhc2tzID0gW3tcblx0XHRcdG5hbWU6ICdTYW1wbGUgVGFzayAxJyxcblx0XHRcdGR1ZURhdGU6ICcwOS8yOC8yMDI0Jyxcblx0XHRcdHByaW9yaXR5OiAnTm90IEltcG9ydGFudCcsXG5cdFx0XHRpZDogMzMsXG5cdFx0XHRjb21wbGV0ZTogZmFsc2Vcblx0XHR9XTtcblx0fVxuXG5cdGNyZWF0ZVRhc2sobmFtZSwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcblx0XHRjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sobmFtZSwgZHVlRGF0ZSwgcHJpb3JpdHkpO1xuXHRcdHRoaXMudGFza3MucHVzaChuZXdUYXNrKTtcblxuXHRcdHJldHVybiBuZXdUYXNrO1xuXHR9XG5cblx0Z2V0VGFzayh0YXNrSWQpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRUYXNrcy5maW5kKCh0YXNrKSA9PiB0YXNrLmlkID09PSB0YXNrSWQpO1xuXHR9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcblx0Y29uc3RydWN0b3IobmFtZSwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHRcdHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG5cdFx0dGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuXHRcdHRoaXMuaWQgPSB0aGlzLmlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNTAwKTtcblx0XHR0aGlzLmNvbXBsZXRlID0gZmFsc2U7XG5cdH1cblxuXHRnZXROYW1lKCkge1xuXHRcdHJldHVybiB0aGlzLm5hbWU7XG5cdH1cblxuXHRzZXROYW1lKG5hbWUpIHtcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHR9XG5cblx0Z2V0RGF0ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5kdWVEYXRlO1xuXHR9XG5cblx0c2V0RGF0ZShkdWVEYXRlKSB7XG5cdFx0dGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcblx0fVxuXG5cdGdldFByaW9yaXR5KCkge1xuXHRcdHJldHVybiB0aGlzLnByaW9yaXR5O1xuXHR9XG5cblx0c2V0UHJpb3JpdHkocHJpb3JpdHkpIHtcblx0XHR0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG5cdH1cblxuXHRkYXRlRm9ybWF0dGVkKCkge1xuXHRcdGNvbnN0IGRheSA9IHRoaXMuZHVlRGF0ZS5zcGxpdChcIi9cIilbMF07XG5cdFx0Y29uc3QgbW9udGggPSB0aGlzLmR1ZURhdGUuc3BsaXQoXCIvXCIpWzFdO1xuXHRcdGNvbnN0IHllYXIgPSB0aGlzLmR1ZURhdGUuc3BsaXQoXCIvXCIpWzJdO1xuXHRcdHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn1gO1xuXHR9XG59XG4iLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9Qcm9qZWN0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUYXNrRWxlbWVudCh0YXNrKSB7XG5cdGNvbnN0IHRhc2tzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdHRhc2tzRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidG9kby1jYXJkXCIpO1xuXHR0YXNrc0VsZW1lbnQuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPGxhYmVsIGNsYXNzPVwidG9kb1wiPiR7dGFzay5uYW1lfVxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGVja21hcmtcIj48L3NwYW4+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLXJpZ2h0LWVsXCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInRhc2stZGF0ZVwiPiR7dGFzay5kdWVEYXRlfTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwidGFzay1wcmlvcml0eVwiPiR7dGFzay5wcmlvcml0eX08L3A+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBlbi10by1zcXVhcmUgcGVuXCIgZGF0YS1lZGl0LXRhc2s+PC9pPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaC1jYW4gdHJhc2hcIiBkYXRhLWRlbGV0ZS10YXNrPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG5cdGNvbnN0IGNoZWNrYm94ID0gdGFza3NFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcblx0Y2hlY2tib3guY2hlY2tlZCA9IHRhc2suY29tcGxldGU7XG5cdGNoZWNrYm94LmlkID0gdGFzay5pZDtcblx0Y29uc3QgbGFiZWwgPSB0YXNrc0VsZW1lbnQucXVlcnlTZWxlY3RvcihcImxhYmVsXCIpO1xuXHRsYWJlbC5odG1sRm9yID0gdGFzay5pZDtcblxuXHRyZXR1cm4gdGFza3NFbGVtZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGFza0hhbmRsZXIoKSB7XG5cdGNvbnN0IGVkaXRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWVkaXQtdGFza11cIik7XG5cdGNvbnN0IGRlbGV0ZVRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtZGVsZXRlLXRhc2tdXCIpO1xuXG5cdGVkaXRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRhc2tJZCA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5pZFxuICAgICAgICBoYW5kbGVFZGl0VGFza0Zvcm0oc2VsZWN0ZWRUYXNrSWQpXG4gICAgfSk7XG5cblx0Ly8gZGVsZXRlVGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlRGVsZXRlVGFzayk7XG59XG5cbmNvbnN0IGhhbmRsZUVkaXRUYXNrRm9ybSA9IChzZWxlY3RlZFRhc2tJZCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHNlbGVjdGVkVGFza0lkKVxuXHRjb25zdCBwb3BVcEVkaXRUYXNrRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9wLXVwLXRhc2tzLWVkaXRcIik7XG5cdGNvbnN0IGVkaXRUYXNrRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC10YXNrcy1mb3JtXCIpO1xuXG5cdHBvcFVwRWRpdFRhc2tGb3JtLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuXG5cdGNvbnN0IGVkaXRUYXNrRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICAgIGVkaXRUYXNrRm9ybS5jbGFzc0xpc3QuYWRkKCdmb3JtJylcbiAgICBlZGl0VGFza0Zvcm0uY2xhc3NMaXN0LmFkZCgncG9wLXVwLXRhc2tzLWZvcm0nKVxuXHRlZGl0VGFza0Zvcm0uaW5uZXJIVE1MICs9IGBcbiAgICA8bGFiZWwgZm9yPVwiZWRpdC10YXNrLXRpdGxlXCI+VGl0bGU8L2xhYmVsPlxuXHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0YXNrLXRpdGxlXCIgaWQ9XCJlZGl0LXRhc2stdGl0bGVcIiBtYXhsZW5ndGg9XCIzMFwiIHJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJkYXRlXCI+RHVlIERhdGU8L2xhYmVsPlxuXHRcdDxpbnB1dCB0eXBlPVwiZGF0ZVwiIG5hbWU9XCJkYXRlXCIgY2xhc3M9XCJ0YXNrLWRhdGVcIiBpZD1cImVkaXQtdGFzay1kYXRlXCIgcmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cInByaW9yaXR5XCI+UHJpb3JpdHk8L2xhYmVsPlxuXHRcdDxzZWxlY3QgbmFtZT1cImVkaXQtdGFzay1wcmlvcml0eVwiIGlkPVwiZWRpdC10YXNrLXByaW9yaXR5XCIgcmVxdWlyZWQ+XG5cdFx0XHQ8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQ9XCJcIiBzZWxlY3RlZD1cIlwiPkhvdyBpbXBvcnRhbnQgaXMgdGhpcyB0YXNrPzwvb3B0aW9uPlxuXHRcdFx0PG9wdGlvbiB2YWx1ZT1cIm5vdC1pbXBvcnRhbnRcIj5Ob3QgSW1wb3J0YW50PC9vcHRpb24+XG5cdFx0XHQ8b3B0aW9uIHZhbHVlPVwiaW1wb3J0YW50XCI+SW1wb3J0YW50ICE8L29wdGlvbj5cblx0XHQ8L3NlbGVjdD5cblx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1idXR0b25zXCI+XG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImVkaXQtdGFzay1zdWJtaXQtYnRuXCIgaWQ9XCJlZGl0LXRhc2stc3VibWl0LWJ0blwiPkFkZDwvYnV0dG9uPlxuXHRcdFx0PGJ1dHRvblx0YnV0dG9uIGNsYXNzPVwiZWRpdC10YXNrLWNhbmNlbC1idG5cIiBpZD1cImVkaXQtdGFzay1jYW5jZWwtYnRuXCIgdHlwZT1cImJ1dHRvblwiPkNhbmNlbDwvYnV0dG9uPlxuXHRcdDwvZGl2PlxuICAgIGA7XG4gICAgZWRpdFRhc2tGb3JtQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRUYXNrRm9ybSlcblxuICAgIGVkaXRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY29uc3QgZWRpdFRhc2tUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LXRhc2stdGl0bGUnKVxuICAgICAgICBjb25zdCBlZGl0VGFza0RhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC10YXNrLWRhdGUnKVxuICAgICAgICBjb25zdCBlZGl0VGFza1ByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQtdGFzay1wcmlvcml0eScpXG4gICAgICAgIFxuICAgICAgICBpZiAoZWRpdFRhc2tUaXRsZS52YWx1ZSA9PSBudWxsIHx8IGVkaXRUYXNrVGl0bGUudmFsdWUgPT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKGVkaXRUYXNrRGF0ZS52YWx1ZSA9PSBudWxsIHx8IGVkaXRUYXNrRGF0ZS52YWx1ZSA9PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoZWRpdFRhc2tQcmlvcml0eS52YWx1ZSA9PSBudWxsIHx8IGVkaXRUYXNrUHJpb3JpdHkudmFsdWUgPT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgZWRpdFRhc2tUaXRsZS52YWx1ZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgZWRpdFRhc2tUaXRsZS52YWx1ZSAhPT0gXCJcIiAmJlxuICAgICAgICAgICAgZWRpdFRhc2tEYXRlLnZhbHVlICE9PSBudWxsICYmXG4gICAgICAgICAgICBlZGl0VGFza0RhdGUudmFsdWUgIT09IFwiXCIgJiZcbiAgICAgICAgICAgIGVkaXRUYXNrUHJpb3JpdHkudmFsdWUgIT09IG51bGwgJiZcbiAgICAgICAgICAgIGVkaXRUYXNrUHJpb3JpdHkudmFsdWUgIT09IFwiXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBwb3BVcEVkaXRUYXNrRm9ybS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpbmRTZWxlY3RlZFRhc2tJZCA9IFByb2plY3QudGFza3MuZmluZCgodGFzaykgPT4gdGFzay5pZCA9PSBzZWxlY3RlZFRhc2tJZC5pZClcblxuICAgICAgICBjb25zb2xlLmxvZyhmaW5kU2VsZWN0ZWRUYXNrSWQpXG4gICAgfSlcblxufTtcbiIsImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL1Byb2plY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kb3Mge1xuXHRzdGF0aWMgcHJvamVjdHMgPSBbXG5cdFx0bmV3IFByb2plY3QoXCJTYW1wbGUgUHJvamVjdCAxXCIpLFxuXHRcdG5ldyBQcm9qZWN0KFwiU2FtcGxlIFByb2plY3QgMlwiKSxcblx0XTtcblxuXHRzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qZWN0SWQpIHtcblx0XHRjb25zdCBwcm9qZWN0VG9EZWxldGUgPSB0aGlzLnByb2plY3RzLmZpbmQoXG5cdFx0XHQocHJvamVjdCkgPT4gcHJvamVjdC5pZCA9PT0gcHJvamVjdElkXG5cdFx0KTtcblx0XHR0aGlzLnByb2plY3RzLnNwbGljZSh0aGlzLnByb2plY3RzLmluZGV4T2YocHJvamVjdFRvRGVsZXRlKSwgMSk7XG5cdH1cblxufVxuIiwiaW1wb3J0IFRhc2sgZnJvbSBcIi4vVGFza1wiO1xuaW1wb3J0IHsgY3JlYXRlVGFza0VsZW1lbnQsIHRhc2tIYW5kbGVyIH0gZnJvbSBcIi4vVGFza19FbGVtZW50XCI7XG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9Qcm9qZWN0XCI7XG5pbXBvcnQgVG9kb3MgZnJvbSBcIi4vVG9kb3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xuXHRzdGF0aWMgbG9hZFBhZ2UoKSB7XG5cdFx0dGhpcy50b2dnbGVQcm9qZWN0UG9wVXAoKTtcblx0fVxuXG5cdHN0YXRpYyBkaXNwbGF5VGFza3MoKSB7XG5cdFx0Y29uc3QgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kby1saXN0XCIpO1xuXHRcdGNvbnN0IGNvbnRhaW5lckhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudC1oZWFkZXJcIik7XG5cdFx0Y29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY3RpdmUtcHJvamVjdFwiKTtcblx0XHRjb25zdCBhY3RpdmVQcm9qZWN0ID0gVG9kb3MucHJvamVjdHMuZmluZChcblx0XHRcdChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkID09IHNlbGVjdGVkUHJvamVjdC5kYXRhc2V0LnByb2plY3RJZFxuXHRcdCk7XG5cblx0XHR0aGlzLmNsZWFyRWxlbWVudCh0YXNrQ29udGFpbmVyKTtcblx0XHRjb250YWluZXJIZWFkZXIudGV4dENvbnRlbnQgPSBhY3RpdmVQcm9qZWN0Lm5hbWU7XG5cdFx0Zm9yIChjb25zdCB0YXNrIG9mIGFjdGl2ZVByb2plY3QudGFza3MpIHtcblx0XHRcdHRoaXMuYXBwZW5kVGFzayh0YXNrKVxuXHRcdH1cblx0XHR0YXNrSGFuZGxlcigpXG5cdH1cblxuXHRzdGF0aWMgaGFuZGxlVGFza0Zvcm0oKSB7XG5cdFx0Y29uc3QgcG9wVXBUYXNrcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9wLXVwLXRhc2tzXCIpO1xuXHRcdGNvbnN0IHRhc2tGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3AtdXAtdGFza3MtZm9ybVwiKTtcblxuXHRcdHRhc2tGb3JtQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cblx0XHRjb25zdCB0YXNrc0Zvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcblx0XHR0YXNrc0Zvcm0uY2xhc3NMaXN0LmFkZChcImZvcm1cIik7XG5cdFx0dGFza3NGb3JtLmNsYXNzTGlzdC5hZGQoXCJwb3AtdXAtdGFza3MtZm9ybVwiKTtcblxuXHRcdHRhc2tzRm9ybS5pbm5lckhUTUwgKz0gYFxuXHRcdDxsYWJlbCBmb3I9XCJ0YXNrLXRpdGxlXCI+VGl0bGU8L2xhYmVsPlxuXHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0YXNrLXRpdGxlXCIgaWQ9XCJ0YXNrLXRpdGxlXCIgbWF4bGVuZ3RoPVwiMzBcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwiZGF0ZVwiPkR1ZSBEYXRlPC9sYWJlbD5cblx0XHQ8aW5wdXQgdHlwZT1cImRhdGVcIiBuYW1lPVwiZGF0ZVwiIGNsYXNzPVwidGFzay1kYXRlXCIgaWQ9XCJ0YXNrLWRhdGVcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwicHJpb3JpdHlcIj5Qcmlvcml0eTwvbGFiZWw+XG5cdFx0PHNlbGVjdCBuYW1lPVwicHJpb3JpdHlcIiBpZD1cInRhc2stcHJpb3JpdHlcIiByZXF1aXJlZD5cblx0XHRcdDxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlZD1cIlwiIHNlbGVjdGVkPVwiXCI+SG93IGltcG9ydGFudCBpcyB0aGlzIHRhc2s/PC9vcHRpb24+XG5cdFx0XHQ8b3B0aW9uIHZhbHVlPVwibm90LWltcG9ydGFudFwiPk5vdCBJbXBvcnRhbnQ8L29wdGlvbj5cblx0XHRcdDxvcHRpb24gdmFsdWU9XCJpbXBvcnRhbnRcIj5JbXBvcnRhbnQgITwvb3B0aW9uPlxuXHRcdDwvc2VsZWN0PlxuXHRcdDxkaXYgY2xhc3M9XCJmb3JtLWJ1dHRvbnNcIj5cblx0XHRcdDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwidGFzay1zdWJtaXQtYnRuXCIgaWQ9XCJ0YXNrLXN1Ym1pdC1idG5cIj5BZGQ8L2J1dHRvbj5cblx0XHRcdDxidXR0b25cdGJ1dHRvbiBjbGFzcz1cInRhc2stY2FuY2VsLWJ0blwiIGlkPVwidGFzay1jYW5jZWwtYnRuXCIgdHlwZT1cImJ1dHRvblwiPkNhbmNlbDwvYnV0dG9uPlxuXHRcdDwvZGl2PlxuXHRcdGA7XG5cdFx0dGFza0Zvcm1Db250YWluZXIuYXBwZW5kQ2hpbGQodGFza3NGb3JtKTtcblxuXHRcdHRhc2tzRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRjb25zdCB0YXNrc1RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXRpdGxlXCIpO1xuXHRcdFx0Y29uc3QgdGFza3NEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWRhdGVcIik7XG5cdFx0XHRjb25zdCB0YXNrc1ByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXByaW9yaXR5XCIpO1xuXG5cdFx0XHRpZiAodGFza3NUaXRsZS52YWx1ZSA9PSBudWxsIHx8IHRhc2tzVGl0bGUudmFsdWUgPT0gXCJcIikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9IGVsc2UgaWYgKHRhc2tzRGF0ZS52YWx1ZSA9PSBudWxsIHx8IHRhc2tzRGF0ZS52YWx1ZSA9PSBcIlwiKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH0gZWxzZSBpZiAodGFza3NQcmlvcml0eS52YWx1ZSA9PSBudWxsIHx8IHRhc2tzUHJpb3JpdHkudmFsdWUgPT0gXCJcIikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0XHR0YXNrc1RpdGxlLnZhbHVlICE9PSBudWxsICYmXG5cdFx0XHRcdHRhc2tzVGl0bGUudmFsdWUgIT09IFwiXCIgJiZcblx0XHRcdFx0dGFza3NEYXRlLnZhbHVlICE9PSBudWxsICYmXG5cdFx0XHRcdHRhc2tzRGF0ZS52YWx1ZSAhPT0gXCJcIiAmJlxuXHRcdFx0XHR0YXNrc1ByaW9yaXR5LnZhbHVlICE9PSBudWxsICYmXG5cdFx0XHRcdHRhc2tzUHJpb3JpdHkudmFsdWUgIT09IFwiXCJcblx0XHRcdCkge1xuXHRcdFx0XHRwb3BVcFRhc2tzLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBzZWxlY3RlZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlLXByb2plY3QnKVxuXG5cdFx0XHRjb25zdCBhY3RpdmVQcm9qZWN0ID0gVG9kb3MucHJvamVjdHMuZmluZChcblx0XHRcdFx0KHByb2plY3QpID0+IHByb2plY3QuaWQgPT0gc2VsZWN0ZWRQcm9qZWN0LmRhdGFzZXQucHJvamVjdElkXG5cdFx0XHQpO1xuXG5cdFx0XHRjb25zdCBhY3RpdmVQcm9qZWN0VGFzayA9IGFjdGl2ZVByb2plY3QuY3JlYXRlVGFzayhcblx0XHRcdFx0dGFza3NUaXRsZS52YWx1ZSxcblx0XHRcdFx0dGFza3NEYXRlLnZhbHVlLFxuXHRcdFx0XHR0YXNrc1ByaW9yaXR5Lm9wdGlvbnNbdGFza3NQcmlvcml0eS5zZWxlY3RlZEluZGV4XS50ZXh0XG5cdFx0XHQpO1xuXHRcdFx0dGFza3NGb3JtLnJlc2V0KCk7XG5cblx0XHRcdHRoaXMuYXBwZW5kVGFzayhhY3RpdmVQcm9qZWN0VGFzaylcblx0XHR9KTtcblxuXHRcdGNvbnN0IHRhc2tzQ2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWNhbmNlbC1idG5cIik7XG5cblx0XHR0YXNrc0NhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0cG9wVXBUYXNrcy5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcblx0XHRcdHRhc2tzRm9ybS5yZXNldCgpO1xuXHRcdH0pO1xuXHR9XG5cblx0c3RhdGljIGFwcGVuZFRhc2soYWN0aXZlUHJvamVjdFRhc2spIHtcblx0XHRjb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvLWxpc3RcIik7XG5cblx0XHR0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZVRhc2tFbGVtZW50KGFjdGl2ZVByb2plY3RUYXNrKSk7XG5cdH1cblxuXHRzdGF0aWMgaGFuZGxlUHJvamVjdEZvcm0oKSB7XG5cdFx0Y29uc3QgcHJvamVjdHNGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3AtdXAtcHJvamVjdHMtZm9ybVwiKTtcblx0XHRjb25zdCBwcm9qZWN0c0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0cy10aXRsZVwiKTtcblx0XHRjb25zdCBwcm9qZWN0c0NhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHMtY2FuY2VsLWJ0blwiKTtcblx0XHRjb25zdCBwcm9qZWN0QWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cy1zdWJtaXQtYnRuXCIpO1xuXHRcdGNvbnN0IHBvcFVwUHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BvcC11cC1wcm9qZWN0c1wiKTtcblxuXHRcdHByb2plY3RzRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3RzSW5wdXQudmFsdWU7XG5cblx0XHRcdGlmIChwcm9qZWN0TmFtZSA9PSBudWxsIHx8IHByb2plY3ROYW1lID09IFwiXCIpIHJldHVybjtcblxuXHRcdFx0Y29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3ROYW1lKTtcblx0XHRcdHByb2plY3RzSW5wdXQudmFsdWUgPSBudWxsO1xuXHRcdFx0VG9kb3MucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcblx0XHRcdHRoaXMuYXBwZW5kUHJvamVjdCgpO1xuXHRcdH0pO1xuXG5cdFx0cHJvamVjdEFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0Y29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0c0lucHV0LnZhbHVlO1xuXHRcdFx0aWYgKHByb2plY3ROYW1lID09IG51bGwgfHwgcHJvamVjdE5hbWUgPT0gXCJcIikgcmV0dXJuO1xuXHRcdFx0cG9wVXBQcm9qZWN0cy5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcblx0XHRcdHBvcFVwUHJvamVjdHMuc3R5bGUudHJhbnNpdGlvbiA9IFwibm9uZVwiO1xuXHRcdH0pO1xuXG5cdFx0cHJvamVjdHNDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdHBvcFVwUHJvamVjdHMuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG5cdFx0XHRwb3BVcFByb2plY3RzLnN0eWxlLnRyYW5zaXRpb24gPSBcIm5vbmVcIjtcblx0XHRcdHByb2plY3RzSW5wdXQudmFsdWUgPSBudWxsO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5hcHBlbmRQcm9qZWN0KCk7XG5cdH1cblxuXHRzdGF0aWMgYXBwZW5kUHJvamVjdCgpIHtcblx0XHRjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1jb250YWluZXJcIik7XG5cdFx0Y29uc3QgYWRkVGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stY29udGFpbmVyXCIpO1xuXG5cdFx0dGhpcy5jbGVhckVsZW1lbnQocHJvamVjdHNDb250YWluZXIpO1xuXG5cdFx0VG9kb3MucHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuXHRcdFx0Y29uc3QgcHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdFx0cHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInN0eWxlLWJ1dHRvblwiKTtcblx0XHRcdHByb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0c1wiKTtcblx0XHRcdHByb2plY3RFbGVtZW50LmRhdGFzZXQucHJvamVjdElkID0gcHJvamVjdC5pZDtcblxuXHRcdFx0cHJvamVjdEVsZW1lbnQuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGVmdC1lbFwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWxpc3QtY2hlY2tcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtcHJvamVjdC1uYW1lPiR7cHJvamVjdC5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmlnaHQtZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImVkaXQtYnRuXCIgY2xhc3M9XCJlZGl0LWJ0blwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1wZW4tdG8tc3F1YXJlXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlbC1idG5cIiBkYXRhLWRlbGV0ZS1wcm9qZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaC1jYW5cIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PmA7XG5cblx0XHRcdHByb2plY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0XHRjb25zdCBhY3RpdmVQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY3RpdmUtcHJvamVjdFwiKTtcblx0XHRcdFx0Y29uc3QgcHJvamVjdFRpdGxlID0gcHJvamVjdEVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV07XG5cblx0XHRcdFx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImZhLXRyYXNoLWNhblwiKSkge1xuXHRcdFx0XHRcdFRvZG9zLmRlbGV0ZVByb2plY3QocHJvamVjdC5pZCk7XG5cdFx0XHRcdFx0cHJvamVjdEVsZW1lbnQucmVtb3ZlKCk7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coVG9kb3MucHJvamVjdHMpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJmYS1wZW4tdG8tc3F1YXJlXCIpKSB7XG5cdFx0XHRcdFx0dGhpcy50b2dnbGVFZGl0UHJvamVjdChwcm9qZWN0VGl0bGUsIHByb2plY3QpO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFRvZG9zLnByb2plY3RzKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYWN0aXZlUHJvamVjdCkge1xuXHRcdFx0XHRcdGFjdGl2ZVByb2plY3QuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZS1wcm9qZWN0XCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZS1wcm9qZWN0XCIpO1xuXHRcdFx0XHRhZGRUYXNrQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuXHRcdFx0XHR0aGlzLmFkZFRhc2tCdXR0b25IYW5kbGVyKCk7XG5cdFx0XHRcdHRoaXMuZGlzcGxheVRhc2tzKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cHJvamVjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEVsZW1lbnQpO1xuXHRcdH0pO1xuXHR9XG5cblx0c3RhdGljIGNsZWFyRWxlbWVudChlbGVtZW50KSB7XG5cdFx0d2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xuXHRcdFx0ZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBhZGRUYXNrQnV0dG9uSGFuZGxlcigpIHtcblx0XHRjb25zdCBwb3BVcFRhc2tzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3AtdXAtdGFza3NcIik7XG5cdFx0Y29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stY29udGFpbmVyXCIpO1xuXHRcdGNvbnN0IGNsb3NlUG9wVXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlLXBvcC11cC10YXNrc1wiKTtcblxuXHRcdGFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdHBvcFVwVGFza3MuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG5cdFx0fSk7XG5cblx0XHRjbG9zZVBvcFVwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRwb3BVcFRhc2tzLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5oYW5kbGVUYXNrRm9ybSgpXG5cdH1cblxuXHRzdGF0aWMgdG9nZ2xlRWRpdFByb2plY3QocHJvamVjdE5hbWUsIHByb2plY3QpIHtcblx0XHRjb25zdCBjb250YWluZXJIZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnQtaGVhZGVyXCIpO1xuXHRcdGNvbnN0IGVkaXRQcm9qZWN0UG9wVXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvcC11cC1wcm9qZWN0cy1lZGl0XCIpO1xuXHRcdGNvbnN0IGVkaXRQcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LXByb2plY3QtZm9ybVwiKTtcblxuXHRcdGVkaXRQcm9qZWN0Q29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cblx0XHRjb25zdCBlZGl0UHJvamVjdEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcblx0XHRlZGl0UHJvamVjdEZvcm0uY2xhc3NMaXN0LmFkZChcInBvcC11cC1wcm9qZWN0cy1mb3JtXCIpO1xuXHRcdGVkaXRQcm9qZWN0Rm9ybS5jbGFzc0xpc3QuYWRkKFwiZm9ybVwiKTtcblx0XHRlZGl0UHJvamVjdEZvcm0uaW5uZXJIVE1MID0gYFxuICAgICAgICA8bGFiZWwgZm9yPVwiZWRpdC1wcm9qZWN0LXRpdGxlXCI+Q2hhbmdlIFByb2plY3QgVGl0bGU8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZWRpdC1wcm9qZWN0LXRpdGxlXCIgaWQ9XCJlZGl0LXByb2plY3QtdGl0bGVcIiBtYXhsZW5ndGg9XCIzMFwiIHJlcXVpcmVkPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1idXR0b25zXCI+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cInN1Ym1pdC1idG5cIiBpZD1cImVkaXQtcHJvamVjdC1jb25maXJtLWJ0blwiPkNvbmZpcm08L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjYW5jZWwtYnRuXCIgaWQ9XCJlZGl0LXByb2plY3QtY2FuY2VsLWJ0blwiIHR5cGU9XCJidXR0b25cIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG5cdFx0ZWRpdFByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdFByb2plY3RGb3JtKTtcblx0XHRjb25zdCBlZGl0UHJvamVjdFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LXByb2plY3QtdGl0bGVcIik7XG5cdFx0Y29uc3QgZWRpdFByb2plY3RDYW5jZWxCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcblx0XHRcdFwiZWRpdC1wcm9qZWN0LWNhbmNlbC1idG5cIlxuXHRcdCk7XG5cdFx0Y29uc3QgY2xvc2VFZGl0UHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2UtZWRpdC1wcm9qZWN0XCIpO1xuXHRcdGVkaXRQcm9qZWN0UG9wVXAuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG5cdFx0ZWRpdFByb2plY3RUaXRsZS52YWx1ZSA9IHByb2plY3QubmFtZTtcblxuXHRcdGVkaXRQcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGlmIChlZGl0UHJvamVjdFRpdGxlLnZhbHVlID09PSBudWxsIHx8IGVkaXRQcm9qZWN0VGl0bGUgPT09IFwiXCIpIHJldHVybjtcblx0XHRcdGlmIChlZGl0UHJvamVjdFRpdGxlLnZhbHVlICE9PSBudWxsIHx8IGVkaXRQcm9qZWN0VGl0bGUudmFsdWUgIT09IFwiXCIpIHtcblx0XHRcdFx0ZWRpdFByb2plY3RQb3BVcC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcblx0XHRcdH1cblx0XHRcdHByb2plY3ROYW1lLnRleHRDb250ZW50ID0gZWRpdFByb2plY3RUaXRsZS52YWx1ZTtcblx0XHRcdHByb2plY3QubmFtZSA9IGVkaXRQcm9qZWN0VGl0bGUudmFsdWU7XG5cdFx0XHRjb250YWluZXJIZWFkZXIudGV4dENvbnRlbnQgPSBlZGl0UHJvamVjdFRpdGxlLnZhbHVlO1xuXHRcdH0pO1xuXG5cdFx0ZWRpdFByb2plY3RDYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGVkaXRQcm9qZWN0UG9wVXAuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG5cdFx0fSk7XG5cblx0XHRjbG9zZUVkaXRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRlZGl0UHJvamVjdFBvcFVwLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuXHRcdH0pO1xuXHR9XG5cblx0c3RhdGljIHRvZ2dsZVByb2plY3RQb3BVcCgpIHtcblx0XHRjb25zdCBhZGRQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtcHJvamVjdC1idG5cIik7XG5cdFx0Y29uc3QgY2xvc2VQb3BVcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xvc2UtcG9wLXVwLXByb2plY3RzXCIpO1xuXHRcdGNvbnN0IHBvcFVwUHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BvcC11cC1wcm9qZWN0c1wiKTtcblxuXHRcdC8vIHNob3cgcG9wLXVwXG5cdFx0YWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0cG9wVXBQcm9qZWN0cy5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcblx0XHRcdHBvcFVwUHJvamVjdHMuc3R5bGUudHJhbnNpdGlvbiA9IFwib3BhY2l0eSA1MDBtcyBlYXNlLWluXCI7XG5cdFx0fSk7XG5cblx0XHQvLyBjbG9zZSBwb3AtdXBcblx0XHRjbG9zZVBvcFVwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRwb3BVcFByb2plY3RzLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuXHRcdFx0cG9wVXBQcm9qZWN0cy5zdHlsZS50cmFuc2l0aW9uID0gXCJub25lXCI7XG5cdFx0fSk7XG5cblx0XHR0aGlzLmhhbmRsZVByb2plY3RGb3JtKCk7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFVJIGZyb20gXCIuL1VJXCJcblxuVUkubG9hZFBhZ2UoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==