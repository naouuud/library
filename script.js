class Book {
    constructor(title, author, read) {
        this.title = title;
        this.author = author;
        this.read = read;
    }
}

let myLibrary = [];
let removalIndex = 0;
let toggleIndex = 0;

function displayBook(book) {
    const tBody = document.querySelector("tbody");
    const newRow = document.createElement("tr");
    const newTitle = document.createElement("td");
    newTitle.classList.add("title");
    newTitle.textContent = book.title;

    const newAuthor = document.createElement("td");
    newAuthor.classList.add("author");
    newAuthor.textContent = book.author;

    const newRead = document.createElement("td");
    newRead.classList.add("read-status");
    if (book.read === true) newRead.textContent = "Yes";
    else if (book.read === false) newRead.textContent = "No";
    else newRead.textContent = "Unknown";

    const newToggle = document.createElement('td');
    const toggleButton = document.createElement('button');
    toggleButton.setAttribute("toggle-index", toggleIndex);
    toggleButton.textContent = "Change"

    const newRemove = document.createElement("td");
    newRemove.classList.add("remove");

    const removeButton = document.createElement("button");
    removeButton.setAttribute("remove-index", removalIndex);
    removeButton.textContent = "Remove";

    newToggle.append(toggleButton);
    newRemove.appendChild(removeButton);
    newRow.appendChild(newTitle);
    newRow.appendChild(newAuthor);
    newRow.appendChild(newRead);
    newRow.appendChild(newToggle);
    newRow.appendChild(newRemove);
    tBody.appendChild(newRow);

    toggleButton.addEventListener("click", (e) => changeReadStatus(e));
    removeButton.addEventListener("click", (e) => remove(e));
    toggleIndex++;
    removalIndex++;
}

function reset() {
    let tBody = document.querySelector("tbody");
    tBody.innerHTML = "";
    removalIndex = 0;
    toggleIndex = 0;
    myLibrary.forEach((book) => displayBook(book));
}

function changeReadStatus(e) {
    index = e.target.getAttribute("toggle-index");
    myLibrary[index].read = !myLibrary[index].read;
    reset();
}

function remove(e) {
    index = e.target.getAttribute("remove-index");
    myLibrary.splice(index, 1);
    reset();
}

const addNewBook = document.querySelector(".add-book");
const form = document.querySelector('form');
const title = document.querySelector("input#title");
const titleError = document.querySelector("#title + .error");
const author = document.querySelector("input#author");
const authorError = document.querySelector("#author + .error")
const read = document.querySelector("select#has-read");
submit = document.querySelector(".submit");
addNewBook.addEventListener("click", () => {
    if (form.className === "hidden") {
        form.className = "visible";
    } else {
        form.className = "hidden";
    }
});

title.addEventListener("input", () => {
    const isValid = title.value.length === 0 || (title.value.length <= 10 && /^[A-Za-z0-9!?&$%#@*()\[\]{}|/\\:;., '"-]+$/.test(title.value));
    if (isValid) {
        title.className = "valid";
        titleError.style.padding = "0px";
        titleError.textContent = "";
    } else {
        title.className = "invalid";
        showError()
    }
});

submit.addEventListener("click", e => {
    e.preventDefault();
    const isValid = title.value.length <= 10 && /^[A-Za-z0-9!?&$%#@*()\[\]{}|/\\:;., '"-]+$/.test(title.value);
    if (isValid) {
        const book = new Book(title.value, author.value, Boolean(parseInt(read.value)));
        myLibrary.push(book);
        displayBook(book);
        title.value = "";
        author.value = "";
    } else if (title.value.length === 0) {
        titleError.style.padding = "4px";
        titleError.textContent = "You must provide a title.";
    } else {
        showError();
    }
});

function showError() {
    if (!/^[A-Za-z0-9!?&$%#@*()\[\]{}|/\\:;., '"-]+$/.test(title.value)) {
        titleError.style.padding = "4px";
        titleError.textContent = `You cannot use '${title.value.charAt(title.value.length - 1)}'.`;
    } else if (!title.value.length <= 10) {
        titleError.style.padding = "4px";
        titleError.textContent = "Your title must be less than 10 characters."
    }
}

// default content
const theHobbit = new Book("The Hobbit", "Tolkien", false);
const harryPotter = new Book("Harry Potter and the Prisoner of Azkaban", "JK Rowling", true);
const dune = new Book("Dune", "Frank Herbert", true);
myLibrary.push(theHobbit);
myLibrary.push(harryPotter);
myLibrary.push(dune);
myLibrary.forEach((book) => displayBook(book));