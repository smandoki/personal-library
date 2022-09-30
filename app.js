const modal = document.querySelector('#modal-add-book');
const addBook = document.querySelector('#btn-add-book');
const form = document.getElementById("form-add-book");
const table = document.querySelector('table');
const books = [];
let autoIncId = 1;

addBook.onclick = function(e) {
    form.reset();
    modal.showModal(); 
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.close();
    }
});

function createBook() {
    const book = new Book(
        autoIncId++,
        form.title.value,
        form.author.value,
        form.pages.value,
        form.read.checked
    );

    books.push(book);
    createRow(book);
}

function createRow(book) {
    const row = table.insertRow();
    row.setAttribute('id', book.id);

    const title = row.insertCell();
    const author = row.insertCell();
    const pages = row.insertCell();
    const read = row.insertCell();
    const remove = row.insertCell();

    title.innerText = book.title;
    author.innerText = book.author;
    pages.innerText = book.pages;

    const readStatus = book.read ? 'read' : 'not read';
    const color = book.read ? 'green' : 'red';

    read.innerHTML = `<button onclick="toggleStatus(${book.id}, event)" class="${color}">${readStatus}</button>`;
    remove.innerHTML = `<button onclick="removeBook(${book.id})" class="red"><i class="bi bi-trash"></i></button>`;
}

function removeBook(id) {
    const row = document.getElementById(id).rowIndex;

    table.deleteRow(row);

    const indexOfBook = books.findIndex(book => book.id === id);
    books.pop(indexOfBook);
}

function toggleStatus(id, e) {
    const book = books.find(book => book.id === id);
    book.toggleStatus();

    const button = e.target;

    if (book.read) {
        button.innerText = 'read';
        button.classList.remove('red');
        button.classList.add('green');
    } else {
        button.innerText = 'not read';
        button.classList.remove('green');
        button.classList.add('red');
    }
}

class Book {
    constructor(id, title, author, pages, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleStatus() {
        this.read = !this.read;
    }
}