const BASE_URL = "http://localhost:3000"

window.addEventListener('load', () => {
    listGenres()
    setMainLinks()
})

function setMainLinks() {
    document.getElementById("mainLinks").innerHTML += 
    `<button id="genreList">Genre List</button>
    <br>
    <button id="renderGenreForm">Add a Genre</button>
    `

    let genreList = document.getElementById('genreList')
    genreList.addEventListener('click', listGenres)

    let renderGenreForm = document.getElementById('renderGenreForm')
    renderGenreForm.addEventListener('click', showGenreForm)
}

function genreBooks(e) {
    resetFormArea();
    document.getElementById("genreSection").innerHTML = ""
    let genreSection = document.getElementById("genreSection")
    fetch(BASE_URL + "/books")
    .then(resp => resp.json())
    .then(books => {
        let booksToGenre = books.filter(book => {
            let bookGenreId = book.genre_id.toString()
            let genreId = e
            return bookGenreId.match(genreId)
        })

        if (booksToGenre == 0) {
            genreSection.innerHTML = `<h3>You haven't added any books to this genre yet.</h3>`
        } else {
            genreSection.innerHTML += booksToGenre.map(book => `
            <div class="genreItem">
            <a href="#" data-id="${book.id}"> ${book.title}</a><br><br>
            <button data-id="${book.id}"class="editBook" onclick="editBook(${book.id})" class="editBook">Edit Book</button>
            <button data-id="${book.id}" class="deleteBook" onclick="deleteBook(${book.id})" class="deleteBook">Delete Book</button>
            </div>
        `).join("");
        }
        
        let renderBooks = document.querySelectorAll("a")
        renderBooks.forEach(book => {
            book.addEventListener("click", (e) => {
                e.preventDefault()
                renderBook(e.currentTarget.dataset.id)
            })
        })
    })
}
