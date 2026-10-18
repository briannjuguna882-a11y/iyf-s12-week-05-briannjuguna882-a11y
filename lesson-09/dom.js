// ============================================
// LESSON 9 — CLASSWORK EXERCISE: dom.js (Tasks 9.1–9.4)
// Copy dom-practice.html AND this file into the root of iyf-s12-week-05-{username}.
// Live Server → open dom-practice.html → F12 → Console.
//
// RULES: querySelector by default · textContent for text · classList for looks
//        (no element.style) · const/let only
// ============================================

// small helper: logs ✓ or ✗ so you can check yourself
const check = (label, ok) => console.log(`${ok ? "✓" : "✗"} ${label}`);


// ============================================
// STEP 1 — Task 9.1: select TEN ways. Store each in a const, then log it.
// ============================================

 // TODO 1: Select the h1
const heading = document.querySelector("h1");
console.log("1. H1:", heading);

// TODO 2: Select all elements with class "content"
const contentElements = document.querySelectorAll(".content");
console.log("2. Content elements:", contentElements);

// TODO 3: Select the form by ID
const contactForm = document.getElementById("contact-form");
console.log("3. Contact form:", contactForm);

// TODO 4: Select the email input inside the form
const emailInput = document.querySelector("#contact-form input[type='email']");
console.log("4. Email input:", emailInput);

// TODO 5: Select all list items in the nav
const navItems = document.querySelectorAll("nav li");
console.log("5. Navigation items:", navItems);

// TODO 6: Select the first .nav-link
const firstNavLink = document.querySelector(".nav-link");
console.log("6. First navigation link:", firstNavLink);

// TODO 7: Select the last paragraph in the article
const lastArticleParagraph = document.querySelector("article p:last-of-type");
console.log("7. Last article paragraph:", lastArticleParagraph);

// TODO 8: Select the submit button
const submitButton = document.querySelector("#contact-form button[type='submit']");
console.log("8. Submit button:", submitButton);

// TODO 9: Select every h2 in main
const mainHeadings = document.querySelectorAll("main h2");
console.log("9. Main headings:", mainHeadings);

// TODO 10: Select the footer
const pageFooter = document.querySelector("footer");
console.log("10. Footer:", pageFooter);

// Check a selector that matches nothing
const missingElement = document.querySelector(".does-not-exist");
console.log("Missing element:", missingElement);

// Convert the nav items NodeList into an array of their text
const navTexts = [...navItems].map(item => item.textContent);
console.log("Navigation text array:", navTexts);


 // TODO 1: From the header, find the nav inside it
const headerNav = document.querySelector("#main-header nav");
console.log("1. Nav inside header:", headerNav);

// TODO 2: From the first .nav-link, get its parent li
const firstNavItem = firstNavLink.parentElement;
console.log("2. Parent li:", firstNavItem);

// TODO 3: From the article, get its next sibling section
const article = document.querySelector("article");
const nextSection = article.nextElementSibling;
console.log("3. Article's next sibling:", nextSection);

// TODO 4: From the ul, get all its child li elements
const navList = document.querySelector(".nav-list");
const navChildren = navList.children;
console.log("4. Nav list children:", navChildren);

// TODO 5: From the footer, go up to the body
const pageBody = pageFooter.parentElement;
console.log("5. Footer's parent:", pageBody);

// TODO 6: From the first .nav-link, use closest() to reach the header
const closestHeader = firstNavLink.closest("header");
console.log("6. Closest header:", closestHeader);


// ============================================
// STEP 3 — Task 9.3: change things
// ============================================
// TODO 1  change the h1 text to something of yours
// TODO 2  point the first .nav-link at https://developer.mozilla.org, open in a new tab
//         (target="_blank" and rel="noopener")
// TODO 3  read the article's data-id and data-category with dataset; add data-status="reviewed"
// TODO 4  add the class "highlight" to the first .content paragraph,
//         toggle "accent" on the second — NO element.style
//
// TODO 5  THE INJECTION DEMO — run these two lines and watch:
//   const userInput = `<img src="x" onerror="alert('hacked!')">`;
//   document.getElementById("unsafe").innerHTML = userInput;   // what happens?
//   document.getElementById("safe").textContent = userInput;   // and now?
//   Write one sentence in a comment: which one would you use for a user's comment, and why?


// ============================================
// STEP 4 — Task 9.4: create, remove, clone
// ============================================

 // TODO 1: Create and append navigation items
function addNavItem(text, href) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");

    link.classList.add("nav-link");
    link.href = href;
    link.textContent = text;

    listItem.appendChild(link);
    navList.appendChild(listItem);
}

addNavItem("Blog", "#blog");
addNavItem("Portfolio", "#portfolio");

console.log("1. Added navigation items:", navList.children.length);

// TODO 2: Create a paragraph before the article's first paragraph
const newParagraph = document.createElement("p");
newParagraph.textContent = "This paragraph was created with JavaScript.";
article.insertBefore(newParagraph, article.querySelector("p"));

console.log("2. Inserted paragraph:", newParagraph);

// TODO 3: Clone the first navigation li and prepend it to the list
const clonedItem = navList.firstElementChild.cloneNode(true);
clonedItem.querySelector(".nav-link").textContent = "Cloned";
clonedItem.querySelector(".nav-link").href = "#cloned";
navList.prepend(clonedItem);

console.log("3. Cloned navigation item:", clonedItem);

// TODO 4: Remove the footer
pageFooter.remove();

console.log("4. Footer removed:", document.querySelector("footer") === null);


// ============================================
// STEP 5 — COMMIT as you go
//   git add dom-practice.html dom.js
//   git commit -m "Add: element selection practice"
//   git commit -m "Add: content, attribute and class changes"
//   git commit -m "Add: create and remove elements"
//   git push
// ============================================
