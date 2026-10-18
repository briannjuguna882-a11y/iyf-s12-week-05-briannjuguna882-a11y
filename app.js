
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const formError = document.getElementById("form-error");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

let todos = [];
let currentFilter = "all";
let nextId = 1;
let editingId = null;

// STEP 1: Create a task element
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.dataset.id = todo.id;

    if (todo.completed) {
        li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("toggle");
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `Complete "${todo.text}"`);

    let taskText;

    if (editingId === todo.id) {
        taskText = document.createElement("input");
        taskText.type = "text";
        taskText.classList.add("edit");
        taskText.value = todo.text;
        taskText.setAttribute("aria-label", "Edit task");
    } else {
        taskText = document.createElement("span");
        taskText.classList.add("todo-text");
        taskText.textContent = todo.text;
    }

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete");
    deleteButton.textContent = "✕";
    deleteButton.setAttribute("aria-label", `Delete "${todo.text}"`);

    li.append(checkbox, taskText, deleteButton);
    return li;
}

// STEP 1: Filter tasks
function visibleTodos() {
    if (currentFilter === "active") {
        return todos.filter(todo => !todo.completed);
    }

    if (currentFilter === "completed") {
        return todos.filter(todo => todo.completed);
    }

    return todos;
}

// STEP 1: Render the page from the array
function render() {
    todoList.replaceChildren(...visibleTodos().map(createTodoElement));
    updateStats();

    filters.forEach(button => {
        const active = button.dataset.filter === currentFilter;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    });

    if (editingId !== null) {
        const editInput = todoList.querySelector(".edit");
        if (editInput) {
            editInput.focus();
            editInput.select();
        }
    }
}

// STEP 1: Update remaining count
function updateStats() {
    const remaining = todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent =
        `${remaining} item${remaining === 1 ? "" : "s"} left`;
}

// STEP 2: Add a task
function addTodo(text) {
    todos.push({
        id: nextId++,
        text,
        completed: false
    });

    currentFilter = "all";
    render();
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const text = input.value.trim();

    if (!text) {
        formError.textContent = "Type a task first.";
        input.focus();
        return;
    }

    formError.textContent = "";
    addTodo(text);
    input.value = "";
    input.focus();
});

// STEP 3: Toggle and delete tasks
function toggleTodo(id) {
    const todo = todos.find(item => item.id === id);
    if (!todo) return;

    todo.completed = !todo.completed;
    render();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);

    if (editingId === id) {
        editingId = null;
    }

    render();
}

// ONE delegated click listener on the list
todoList.addEventListener("click", event => {
    const item = event.target.closest(".todo-item");
    if (!item) return;

    const id = Number(item.dataset.id);

    if (event.target.closest(".delete")) {
        deleteTodo(id);
        return;
    }

    if (event.target.classList.contains("toggle")) {
        toggleTodo(id);
    }
});

// STEP 4: Filters
function filterTodos(filter) {
    currentFilter = filter;
    render();
}

filters.forEach(button => {
    button.addEventListener("click", () => {
        filterTodos(button.dataset.filter);
    });
});

// STEP 4: Clear completed tasks
function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    render();
}

clearCompletedBtn.addEventListener("click", clearCompleted);

// STEP 5: Save or cancel editing
function saveEdit(id, value) {
    const todo = todos.find(item => item.id === id);

    if (todo && value.trim()) {
        todo.text = value.trim();
    }

    editingId = null;
    render();
}

todoList.addEventListener("dblclick", event => {
    const textElement = event.target.closest(".todo-text");
    if (!textElement) return;

    const item = textElement.closest(".todo-item");
    editingId = Number(item.dataset.id);
    render();
});

todoList.addEventListener("keydown", event => {
    if (!event.target.classList.contains("edit")) return;

    const item = event.target.closest(".todo-item");
    const id = Number(item.dataset.id);

    if (event.key === "Enter") {
        event.preventDefault();
        saveEdit(id, event.target.value);
    } else if (event.key === "Escape") {
        editingId = null;
        render();
    }
});

todoList.addEventListener("focusout", event => {
    if (!event.target.classList.contains("edit")) return;

    const item = event.target.closest(".todo-item");
    if (!item || editingId === null) return;

    saveEdit(Number(item.dataset.id), event.target.value);
});

// Initialize
render();
