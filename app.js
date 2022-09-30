const modal = document.querySelector('#modal-add-book');
const addBook = document.querySelector('#btn-add-book');
const form = document.getElementById("form-add-book");

addBook.onclick = function(e) {
    form.reset();
    modal.showModal(); 
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.close();
    }
});