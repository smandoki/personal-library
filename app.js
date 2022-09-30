const modal = document.querySelector('#modal-add-book');
const addBook = document.querySelector('#btn-add-book');
const form = document.getElementById("form-add-book");
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
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}