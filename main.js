/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });


class Project {

    static projects = [{ 
        id: 1,
        name: 'Sample Project 1',
        tasks: [] },{ 
        id: 2,
        name: 'Sample Project 2',
        tasks: [] 
        }]
        
        static sideBtn() {
            const sidebarBtn = document.querySelectorAll('[data-sidebar-btn]')
    
            sidebarBtn.forEach(button => {
                button.addEventListener('click', () => {
                    const tasksHeader = document.getElementById('content-header')
    
                    const todoBtn = document.getElementById('todo')
    
                    tasksHeader.textContent = button.textContent
                })
            })
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

    // Create an object of project
    static createProject(name) {
        let randomId = Math.floor(Math.random() * 500)
        return { id : randomId, name: name, tasks: [] }
    }

    static appendTasks() {
     
        this.appendProject()
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
                    <div id="add-task-btn" class="add-task-btn"> 
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


/***/ }),

/***/ "./src/sidebar.js":
/*!************************!*\
  !*** ./src/sidebar.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sidebar)
/* harmony export */ });


class Sidebar {

    static sideBtn() {
        const sidebarBtn = document.querySelectorAll('[data-sidebar-btn]')

        sidebarBtn.forEach(button => {
            button.addEventListener('click', () => {
                const tasksHeader = document.getElementById('content-header')

                const todoBtn = document.getElementById('todo')

                tasksHeader.textContent = button.textContent
            })
        })
    }

    // static showTasks(value) {
    //     const tasksHeader = document.getElementById('content-header')

    //     tasksHeader.textContent = value
    // }

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
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sidebar */ "./src/sidebar.js");



_project__WEBPACK_IMPORTED_MODULE_0__["default"].appendTasks()
_project__WEBPACK_IMPORTED_MODULE_0__["default"].addProject()
_project__WEBPACK_IMPORTED_MODULE_0__["default"].toggleProjectPopUp()
_project__WEBPACK_IMPORTED_MODULE_0__["default"].sideBtn()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBRWU7O0FBRWY7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGFBQWE7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzlJZTs7QUFFZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7VUN4QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOK0I7QUFDQTs7QUFFL0IsZ0RBQU87QUFDUCxnREFBTztBQUNQLGdEQUFPO0FBQ1AsZ0RBQU8sVSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL29kaW4tdG9kby8uL3NyYy9zaWRlYmFyLmpzIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XG5cbiAgICBzdGF0aWMgcHJvamVjdHMgPSBbeyBcbiAgICAgICAgaWQ6IDEsXG4gICAgICAgIG5hbWU6ICdTYW1wbGUgUHJvamVjdCAxJyxcbiAgICAgICAgdGFza3M6IFtdIH0seyBcbiAgICAgICAgaWQ6IDIsXG4gICAgICAgIG5hbWU6ICdTYW1wbGUgUHJvamVjdCAyJyxcbiAgICAgICAgdGFza3M6IFtdIFxuICAgICAgICB9XVxuICAgICAgICBcbiAgICAgICAgc3RhdGljIHNpZGVCdG4oKSB7XG4gICAgICAgICAgICBjb25zdCBzaWRlYmFyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2lkZWJhci1idG5dJylcbiAgICBcbiAgICAgICAgICAgIHNpZGViYXJCdG4uZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFza3NIZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudC1oZWFkZXInKVxuICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2RvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8nKVxuICAgIFxuICAgICAgICAgICAgICAgICAgICB0YXNrc0hlYWRlci50ZXh0Q29udGVudCA9IGJ1dHRvbi50ZXh0Q29udGVudFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAvLyBBZGQgUHJvamVjdHMgdG8gVUlcbiAgICBzdGF0aWMgYWRkUHJvamVjdCgpIHtcblxuICAgICAgICAvLyBnZXQgcHJvamVjdCBiYXNlZCBvbiBmb3JtIGlucHV0XG4gICAgICAgIGNvbnN0IHByb2plY3RzRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3AtdXAtcHJvamVjdHMtZm9ybScpXG4gICAgICAgIGNvbnN0IHByb2plY3RzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMtdGl0bGUnKVxuICAgICAgICBjb25zdCBwcm9qZWN0c0NhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cy1jYW5jZWwtYnRuJylcbiAgICAgICAgY29uc3QgcHJvamVjdEFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cy1zdWJtaXQtYnRuJylcbiAgICAgICAgY29uc3QgcG9wVXBQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3AtdXAtcHJvamVjdHMnKVxuXG4gICAgICAgIHByb2plY3RzRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3RzSW5wdXQudmFsdWVcblxuICAgICAgICAgICAgaWYgKHByb2plY3ROYW1lID09IG51bGwgfHwgcHJvamVjdE5hbWUgPT0gJycpIHJldHVyblxuICAgICAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IHRoaXMuY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZSlcbiAgICAgICAgICAgIHByb2plY3RzSW5wdXQudmFsdWUgPSBudWxsXG4gICAgICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdClcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kUHJvamVjdCgpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnByb2plY3RzKVxuICAgICAgICB9KVxuXG4gICAgICAgIHByb2plY3RBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3RzSW5wdXQudmFsdWVcbiAgICAgICAgICAgIGlmIChwcm9qZWN0TmFtZSA9PSBudWxsIHx8IHByb2plY3ROYW1lID09ICcnKSByZXR1cm5cbiAgICAgICAgICAgIHBvcFVwUHJvamVjdHMuY2xhc3NMaXN0LmFkZCgnaGlkZScpXG4gICAgICAgICAgICBwb3BVcFByb2plY3RzLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSdcbiAgICAgICAgfSlcblxuICAgICAgICBwcm9qZWN0c0NhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHBvcFVwUHJvamVjdHMuY2xhc3NMaXN0LmFkZCgnaGlkZScpXG4gICAgICAgICAgICBwb3BVcFByb2plY3RzLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSdcbiAgICAgICAgICAgIHByb2plY3RzSW5wdXQudmFsdWUgPSBudWxsXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgYW4gb2JqZWN0IG9mIHByb2plY3RcbiAgICBzdGF0aWMgY3JlYXRlUHJvamVjdChuYW1lKSB7XG4gICAgICAgIGxldCByYW5kb21JZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUwMClcbiAgICAgICAgcmV0dXJuIHsgaWQgOiByYW5kb21JZCwgbmFtZTogbmFtZSwgdGFza3M6IFtdIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgYXBwZW5kVGFza3MoKSB7XG4gICAgIFxuICAgICAgICB0aGlzLmFwcGVuZFByb2plY3QoKVxuICAgIH1cblxuICAgIHN0YXRpYyBhcHBlbmRQcm9qZWN0KCkge1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtY29udGFpbmVyJylcblxuICAgICAgICB0aGlzLmNsZWFyRWxlbWVudChwcm9qZWN0c0NvbnRhaW5lcilcblxuICAgICAgICB0aGlzLnByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICAgICAgICBwcm9qZWN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzdHlsZS1idXR0b24nKVxuICAgICAgICAgICAgcHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncHJvamVjdHMnKVxuICAgICAgICAgICAgcHJvamVjdEVsZW1lbnQuZGF0YXNldC5wcm9qZWN0SWQgPSBwcm9qZWN0LmlkXG5cbiAgICAgICAgICAgIHByb2plY3RFbGVtZW50LmlubmVySFRNTCArPSBgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxlZnQtZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1saXN0LWNoZWNrXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXByb2plY3QtbmFtZT4ke3Byb2plY3QubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpZ2h0LWVsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJlZGl0LWJ0blwiIGNsYXNzPVwiZWRpdC1idG5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGVuLXRvLXNxdWFyZVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJhZGQtdGFzay1idG5cIiBjbGFzcz1cImFkZC10YXNrLWJ0blwiPiBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGx1c1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJkZWwtYnRuXCIgY2xhc3M9XCJkZWwtYnRuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoLWNhblwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+YFxuXG4gICAgICAgICAgICAgICAgcHJvamVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlLXByb2plY3RbZGF0YS1wcm9qZWN0LWlkXScpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRIZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudC1oZWFkZXInKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhY3RpdmVQcm9qZWN0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVQcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZS1wcm9qZWN0JylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZS1wcm9qZWN0JylcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRIZWFkZXIudGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEVsZW1lbnQpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGNsZWFyRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHRvZ2dsZVByb2plY3RQb3BVcCgpIHtcblxuICAgICAgICBjb25zdCBhZGRQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWJ0bicpXG4gICAgICAgIGNvbnN0IGNsb3NlUG9wVXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtcG9wLXVwLXByb2plY3RzJylcbiAgICAgICAgY29uc3QgcG9wVXBQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3AtdXAtcHJvamVjdHMnKVxuXG4gICAgICAgIC8vIHNob3cgcG9wLXVwXG4gICAgICAgIGFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBwb3BVcFByb2plY3RzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxuICAgICAgICAgICAgcG9wVXBQcm9qZWN0cy5zdHlsZS50cmFuc2l0aW9uID0gJ29wYWNpdHkgNTAwbXMgZWFzZS1pbidcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBjbG9zZSBwb3AtdXBcbiAgICAgICAgY2xvc2VQb3BVcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHBvcFVwUHJvamVjdHMuY2xhc3NMaXN0LmFkZCgnaGlkZScpXG4gICAgICAgICAgICBwb3BVcFByb2plY3RzLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSdcbiAgICAgICAgfSlcbiAgICB9XG5cbn07XG4iLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lkZWJhciB7XG5cbiAgICBzdGF0aWMgc2lkZUJ0bigpIHtcbiAgICAgICAgY29uc3Qgc2lkZWJhckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNpZGViYXItYnRuXScpXG5cbiAgICAgICAgc2lkZWJhckJ0bi5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza3NIZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudC1oZWFkZXInKVxuXG4gICAgICAgICAgICAgICAgY29uc3QgdG9kb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvJylcblxuICAgICAgICAgICAgICAgIHRhc2tzSGVhZGVyLnRleHRDb250ZW50ID0gYnV0dG9uLnRleHRDb250ZW50XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vIHN0YXRpYyBzaG93VGFza3ModmFsdWUpIHtcbiAgICAvLyAgICAgY29uc3QgdGFza3NIZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudC1oZWFkZXInKVxuXG4gICAgLy8gICAgIHRhc2tzSGVhZGVyLnRleHRDb250ZW50ID0gdmFsdWVcbiAgICAvLyB9XG5cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIlxuaW1wb3J0IFNpZGViYXIgZnJvbSBcIi4vc2lkZWJhclwiXG5cblByb2plY3QuYXBwZW5kVGFza3MoKVxuUHJvamVjdC5hZGRQcm9qZWN0KClcblByb2plY3QudG9nZ2xlUHJvamVjdFBvcFVwKClcblByb2plY3Quc2lkZUJ0bigpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9