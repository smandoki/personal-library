const modal = document.querySelector('#modal-add-book');
const addBook = document.querySelector('#btn-add-book');
const form = document.getElementById("form-add-book");
const table = document.querySelector('table');
const books = [];

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

    read.innerHTML = `<button onclick="toggleStatus()" class="${color}">${readStatus}</button>`;
    remove.innerHTML = '<button onclick="removeBook();" class="red"><i class="bi bi-trash"></i></button>';
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}