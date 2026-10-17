console.log("DOM Practice Started!");

// 1. Select the header by its ID
const header = document.getElementById("main-header");
console.log("Header:", header);

// 2. Select all elements with the class "content"
const contents = document.getElementsByClassName("content");
console.log("Content paragraphs:", contents);

// 3. Select all paragraph elements
const paragraphs = document.getElementsByTagName("p");
console.log("All paragraphs:", paragraphs);

// 4. Select the first navigation link
const firstLink = document.querySelector(".nav-link");
console.log("First link:", firstLink);

// 5. Select all navigation links
const allLinks = document.querySelectorAll(".nav-link");
console.log("All links:", allLinks);

// Practice Tasks

// 6. Select the h1 element
const heading = document.querySelector("h1");
console.log("Heading:", heading);

// 7. Select the contact form
const contactForm = document.getElementById("contact-form");
console.log("Contact form:", contactForm);

// 8. Select the email input
const emailInput = document.getElementById("email");
console.log("Email input:", emailInput);

// 9. Select all list items in the navigation
const navItems = document.querySelectorAll(".nav-list li");
console.log("Navigation items:", navItems);

// 10. Select the last paragraph
const lastParagraph = document.querySelector("footer p");
console.log("Last paragraph:", lastParagraph);

// TASK 9.2: TRAVERSING THE DOM

// 1. Select the header, then find the nav inside it
const mainHeader = document.querySelector("#main-header");
const headerNav = mainHeader.querySelector("nav");
console.log("Nav inside header:", headerNav);

// 2. Select the first navigation link, then get its parent li
const firstNavLink = document.querySelector(".nav-link");
const parentListItem = firstNavLink.parentElement;
console.log("Parent list item:", parentListItem);

// 3. Select the article, then get its next sibling
const articleElement = document.querySelector("article");
const nextSection = articleElement.nextElementSibling;
console.log("Next sibling of article:", nextSection);

// 4. Select the ul, then get all its child li elements
const navList = document.querySelector(".nav-list");
const listItems = navList.children;
console.log("Children of nav list:", listItems);

// 5. Start from the footer and navigate up to the body
const pageFooter = document.querySelector("footer");
const pageBody = pageFooter.parentElement;
console.log("Body from footer:", pageBody);

// TASK 9.3: MODIFYING CONTENT

// 1. Change the main heading
const pageHeading = document.querySelector("h1");
pageHeading.textContent = "My DOM Manipulation Practice";
console.log("Updated heading:", pageHeading.textContent);

// 2. Change the article title
const articleTitle = document.querySelector(".title");
articleTitle.textContent = "Learning JavaScript DOM";

// 3. Change a link's destination
const homeLink = document.querySelector(".nav-link");
homeLink.setAttribute("href", "https://developer.mozilla.org");
console.log("Home link:", homeLink.getAttribute("href"));

// 4. Add a data attribute
homeLink.dataset.category = "learning";
console.log("Link category:", homeLink.dataset.category);

// 5. Change the container's styles
const mainContainer = document.querySelector(".container");
mainContainer.style.backgroundColor = "#f0f0f0";
mainContainer.style.padding = "30px";
mainContainer.style.borderRadius = "8px";

// TASK 9.4: ADDING, REMOVING AND CLONING ELEMENTS

// 1. Create a new paragraph
const newParagraph = document.createElement("p");
newParagraph.textContent = "This paragraph was added using JavaScript!";
newParagraph.className = "content highlight";

// Add the paragraph to the article
const practiceArticle = document.querySelector("article");
practiceArticle.appendChild(newParagraph);

console.log("New paragraph added:", newParagraph);

// 2. Create a new navigation item
function addNavItem(text, href) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");

    link.textContent = text;
    link.href = href;
    link.className = "nav-link";

    listItem.appendChild(link);
    document.querySelector(".nav-list").appendChild(listItem);
}

// Add two new navigation items
addNavItem("Blog", "/blog");
addNavItem("Portfolio", "/portfolio");

console.log("New navigation items added!");

// 3. Clone an existing navigation item
const originalItem = document.querySelector(".nav-list li");
const clonedItem = originalItem.cloneNode(true);

clonedItem.querySelector("a").textContent = "Cloned Link";
clonedItem.querySelector("a").href = "#cloned";

document.querySelector(".nav-list").appendChild(clonedItem);

console.log("Navigation item cloned:", clonedItem);

// 4. Demonstrate removing an element
const temporaryParagraph = document.createElement("p");
temporaryParagraph.textContent = "This paragraph will be removed.";
practiceArticle.appendChild(temporaryParagraph);

temporaryParagraph.remove();

console.log("Temporary paragraph removed!");

// TASK 10.1: CLICK COUNTER

let count = 0;

const countDisplay = document.getElementById("count");
const increaseButton = document.getElementById("increase-btn");
const decreaseButton = document.getElementById("decrease-btn");
const resetButton = document.getElementById("reset-btn");

function updateCount() {
    countDisplay.textContent = count;
}

increaseButton.addEventListener("click", function () {
    count++;
    updateCount();
});

decreaseButton.addEventListener("click", function () {
    if (count > 0) {
        count--;
        updateCount();
    }
});

resetButton.addEventListener("click", function () {
    count = 0;
    updateCount();
});

console.log("Click Counter is ready!");

// TASK 10.2: THE EVENT OBJECT

const eventButton = document.getElementById("event-button");

eventButton.addEventListener("click", function (event) {
    console.log("Target:", event.target);
    console.log("Current Target:", event.currentTarget);
    console.log("Event type:", event.type);
    console.log("Mouse position:", event.clientX, event.clientY);
});

// Keyboard shortcuts
const shortcutForm = document.getElementById("shortcut-form");
const shortcutMessage = document.getElementById("shortcut-message");

document.addEventListener("keydown", function (event) {
    // Ctrl+S: show a saved message instead of opening Save
    if (event.ctrlKey && event.key.toLowerCase() === "s") {
        event.preventDefault();
        shortcutMessage.textContent = "Saved!";
        console.log("Saved!");
    }

    // Escape: clear the form inputs
    if (event.key === "Escape") {
        shortcutForm.reset();
        shortcutMessage.textContent = "Form inputs cleared!";
        console.log("Form inputs cleared!");
    }

    // Ctrl+Enter: submit the form
    if (event.ctrlKey && event.key === "Enter") {
        event.preventDefault();
        shortcutForm.requestSubmit();
    }
});

// Handle form submission
shortcutForm.addEventListener("submit", function (event) {
    event.preventDefault();
    shortcutMessage.textContent = "Form submitted successfully!";
    console.log("Form submitted successfully!");
});

console.log("Event Object practice is ready!");

// TASK 10.3: EVENT DELEGATION

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// One click listener handles task completion and deletion
taskList.addEventListener("click", function (event) {
    const deleteButton = event.target.closest(".delete-task");

    if (deleteButton && taskList.contains(deleteButton)) {
        deleteButton.closest(".task-item").remove();
        return;
    }

    const taskItem = event.target.closest(".task-item");

    if (taskItem && taskList.contains(taskItem)) {
        taskItem.classList.toggle("completed");
    }
});

// Add new tasks
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const listItem = document.createElement("li");
    listItem.className = "task-item";

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-task";
    deleteButton.textContent = "Delete";

    listItem.append(taskSpan, deleteButton);
    taskList.appendChild(listItem);

    taskInput.value = "";
    taskInput.focus();
});

console.log("Event Delegation practice is ready!");