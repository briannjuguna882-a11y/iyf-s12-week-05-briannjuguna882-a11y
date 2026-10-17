// 1. Select the HTML elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");
const statusMessage = document.getElementById("status-message");

// 2. Application state
let todos = [];
let currentFilter = "all";
let nextId = 1;

// 3. Create a task element
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = "todo-item";

    if (todo.completed) {
        li.classList.add("completed");
    }

    li.dataset.id = todo.id;

    const taskText = document.createElement("span");
    taskText.className = "todo-text";
    taskText.textContent = todo.text;
    taskText.tabIndex = 0;
    taskText.setAttribute("role", "button");
    taskText.setAttribute(
        "aria-label",
        `Mark ${todo.text} ${todo.completed ? "active" : "completed"}`
    );

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${todo.text}`);
    deleteButton.dataset.action = "delete";

    li.append(taskText, deleteButton);

    return li;
}

// 4. Update the remaining-task count
function updateStats() {
    const remaining = todos.filter(todo => !todo.completed).length;

    itemsLeft.textContent =
        `${remaining} ${remaining === 1 ? "item" : "items"} left`;
}

// 5. Display tasks according to the selected filter
function renderTodos() {
    todoList.replaceChildren();

    const visibleTodos = todos.filter(todo => {
        if (currentFilter === "active") {
            return !todo.completed;
        }

        if (currentFilter === "completed") {
            return todo.completed;
        }

        return true;
    });

    visibleTodos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
    });

    updateStats();

    filters.forEach(button => {
        const isActive = button.dataset.filter === currentFilter;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

// 6. Add a new task
function addTodo(text) {
    const trimmedText = text.trim();

    if (!trimmedText) {
        statusMessage.textContent = "Please enter a task first.";
        input.focus();
        return;
    }

    todos.push({
        id: nextId++,
        text: trimmedText,
        completed: false
    });

    currentFilter = "all";
    input.value = "";
    statusMessage.textContent = "Task added successfully.";

    renderTodos();
    input.focus();
}

// 7. Toggle a task between active and completed
function toggleTodo(id) {
    const todo = todos.find(item => item.id === id);

    if (!todo) return;

    todo.completed = !todo.completed;

    statusMessage.textContent = todo.completed
        ? "Task marked as completed."
        : "Task marked as active.";

    renderTodos();
}

// 8. Delete a task
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);

    statusMessage.textContent = "Task deleted.";
    renderTodos();
}

// 9. Change the current filter
function filterTodos(filter) {
    currentFilter = filter;
    renderTodos();
}

// 10. Handle form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();
    addTodo(input.value);
});

// 11. Use ONE event listener for task clicks
todoList.addEventListener("click", function(event) {
    const li = event.target.closest(".todo-item");

    if (!li || !todoList.contains(li)) return;

    const id = Number(li.dataset.id);

    if (event.target.closest('[data-action="delete"]')) {
        deleteTodo(id);
        return;
    }

    if (event.target.closest(".todo-text")) {
        toggleTodo(id);
    }
});

// Allow keyboard users to complete tasks with Enter or Space
todoList.addEventListener("keydown", function(event) {
    if (
        event.target.classList.contains("todo-text") &&
        (event.key === "Enter" || event.key === " ")
    ) {
        event.preventDefault();
        toggleTodo(Number(event.target.closest(".todo-item").dataset.id));
    }
});

// 12. Handle the filter buttons
filters.forEach(button => {
    button.addEventListener("click", function() {
        filterTodos(button.dataset.filter);
    });
});

// 13. Remove all completed tasks
clearCompletedBtn.addEventListener("click", function() {
    const completedCount = todos.filter(todo => todo.completed).length;

    todos = todos.filter(todo => !todo.completed);

    statusMessage.textContent = completedCount
        ? `${completedCount} completed task(s) cleared.`
        : "There are no completed tasks to clear.";

    renderTodos();
});

// 14. Start the application
renderTodos();

console.log("To-Do List app is ready!");