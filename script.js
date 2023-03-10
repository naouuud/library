class Book {
    constructor(title, author, read) {
        this.title = title;
        this.author = author;
        this.read = read;
    }
}

let myLibrary = [];

const theHobbit = new Book("The Hobbit", "Tolkien", false);
const harryPotter = new Book("Harry Potter and the Prisoner of Azkaban", "JK Rowling", true);
const dune = new Book("Dune", "Frank Herbert", true);
myLibrary.push(theHobbit);
myLibrary.push(harryPotter);
myLibrary.push(dune);

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

myLibrary.forEach((book) => displayBook(book));

let submit;
let addingBook;
const addBook = document.querySelector(".add-book");
addBook.addEventListener("click", () => {
    const container = document.querySelector(".container");
    const form = document.createElement("div");
    form.classList.add("add-book-form");
    form.innerHTML = `<form action="" method="get"><label for="title">Book Title: </label><input type="text" name="title" id="title"><label for="author">Author: </label><input type="text" name="author" id="author"><label for="has-read">Have you read this book?</label><select name="read" id="has-read"><option value="0" selected>No</option><option value="1">Yes</option></select><input type="submit" class="submit"></form>`;
    if (!addingBook) {
        container.appendChild(form);
        addingBook = true;
    }
    else {
        const form = document.querySelector(".add-book-form");
        container.removeChild(form);
        addingBook = false;
    }
    submit = document.querySelector(".submit");
    if (submit) {
        submit.addEventListener("click", (e) => {
            e.preventDefault();
            let title = document.querySelector("input#title");
            let author = document.querySelector("input#author");
            let read = document.querySelector("select#has-read");
            console.log(read.value);
            const book = new Book(title.value, author.value, Boolean(parseInt(read.value)));
            myLibrary.push(book);
            displayBook(book);
            title.value = "";
            author.value = "";
        })
    }
})