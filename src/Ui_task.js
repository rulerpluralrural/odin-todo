
export default function(task) {
    
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