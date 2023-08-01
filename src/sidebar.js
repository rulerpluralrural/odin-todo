

export default class Sidebar {

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