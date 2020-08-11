class Book {
    constructor(title,
        author,
        pages,
        date_finished,
        characters,
        problem,
        solution,
        genre_rationale,
        words_learned,
        something_learned,
        question,
        genre_id) {
            this.title = title
            this.author = author,
            this.pages = pages,
            this.date_finished = date_finished,
            this.characters = characters,
            this.problem = problem,
            this.solution = solution,
            this.genre_rationale = genre_rationale,
            this.words_learned = words_learned,
            this.something_learned = something_learned,
            this.question = question,
            this.genre_id = genre_id
        }
}

function addBook(e) {
    let formArea = document.getElementById('form-area')
    let formContent = `
        <form class="inputForm">
            <h2>Create a New Book Log Entry</h2>
            <h3 id="error"></h3>
            <label>Title:</label>
            <input type="text" id="Book Title"><br>
            <label>Author:</label>
            <input type="text" id="Book Author"><br>
            <label>Number of Pages:</label>
            <input type="number" id="Book Pages"><br>
            <label>Date Finished:</label>
            <input type="date" id="Date Finished"><br>
            <label>Main Characters (or for a nonfiction book, the main person or people the book is about):</label>
            <input type="text" id="Book Characters"><br>
            <label>Problem (or for a nonfiction book, the biggest challenges or issues the main person or people have to deal with):</label>
            <input type="text" id="Book Problem"><br>
            <label>Solution (or for a nonfiction book, the outcome of the main person's or people's struggles or efforts):</label>
            <input type="text" id="Book Solution"><br>
            <label>How You Know This Book Belongs to This Genre:</label>
            <input type="text" id="Genre Rationale"><br>
            <label>2 Words You Learned (include definitions):</label>
            <input type="text" id="Words Learned"><br>
            <label>The Most Important Thing You Learned from This Book:</label>
            <input type="text" id="Something Learned"><br>
            <label>A Question You Have about This Book:</label>
            <input type="text" id="Question"><br><br>
           
            <input type="hidden" id="genreID" value="${e.currentTarget.dataset.id}" data-id="${e.currentTarget.dataset.id}">
            <input type="button" value="Cancel" class="closeFormBtn">
            <input type="submit" value="Add Book" class="submitBook">
        </form>
    `

    formArea.innerHTML = formContent
 
    formArea.style.display = "block"

    let submitBook = document.querySelector("input.submitBook")
    
    submitBook.addEventListener("click", (e) => {
        let title = document.getElementById("Book Title").value
        let author = document.getElementById("Book Author").value
        let pages = document.getElementById("Book Pages").value
        let date = document.getElementById("Date Finished").value
        let characters = document.getElementById("Book Characters").value
        let problem = document.getElementById("Book Problem").value
        let solution = document.getElementById("Book Solution").value
        let genre_rationale = document.getElementById("Genre Rationale").value
        let words_learned = document.getElementById("Words Learned").value
        let something_learned = document.getElementById("Something Learned").value
        let question = document.getElementById("Question").value
        if (title == "" || author == "" || pages == "" || pages == NaN || date == "" || characters == "" || problem == "" || solution == "" || genre_rationale == "" || words_learned == "" || something_learned == "" || question == "") {
            e.preventDefault()
            error.innerHTML = "Make sure all fields are filled out correctly."
        } else {
            window.alert("Book log entry added!")
            newBook()
            e.preventDefault()

            formArea.style.display = "none"
        }
    })

    let closeForm = document.querySelector("input.closeFormBtn")
    closeForm.addEventListener("click", (e) => {
        formArea.style.display = "none"
    })

    window.onclick = (e) => {
        if (e.target == formArea) {
            formArea.style.display = "none"
        }
    }
}

function newBook() {
    let newbook = new Book(
        document.getElementById("Book Title").value,
        document.getElementById("Book Author").value,
        document.getElementById("Book Pages").value,
        document.getElementById("Date Finished").value,
        document.getElementById("Book Characters").value,
        document.getElementById("Book Problem").value,
        document.getElementById("Book Solution").value,
        document.getElementById("Genre Rationale").value,
        document.getElementById("Words Learned").value,
        document.getElementById("Something Learned").value,
        document.getElementById("Question").value,
        document.getElementById("genreID").value
    )

    fetch(BASE_URL + "/books", {
        method: "POST",
        body: JSON.stringify(newbook),
        headers: {
           'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

function renderBook(id) {
    document.getElementById("form-area").innerHTML = ""

    let formArea = document.getElementById("form-area")

    fetch(BASE_URL + `/books/${id}`)
    .then(resp => resp.json())
    .then(book => {
        let formAreaContent = `
        <div class="book-info">
            <h2>Book Log Entry</h2>
            <h4>Title:</h4>
            <p>${book.title}</p>
            <h4>Author:</h4>
            <p>${book.author}</p>
            
            <h4>Number of Pages:</h4>
            <p>${book.pages}</p>
            <h4>Date Finished:</h4>
            <p>${book.date_finished}</p>
            <h4>Main Characters or People:</h4>
            <p>${book.characters}</p>
            <h4>Problem/Challenges:</h4>
            <p>${book.problem}</p>
            <h4>Solution/Outcome:</h4>
            <p>${book.solution}</p>
            <h4>How You Know This Book Belongs to This Genre:</h4>
            <p>${book.genre_rationale}</p>
            <h4>2 Words You Learned:</h4>
            <p>${book.words_learned}</p>
            <h4>The Most Important Thing You Learned from This Book:</h4>
            <p>${book.something_learned}</p>
            <h4>A Question You Have about This Book:</h4>
            <p>${book.question}</p>
            <input type="button" value="Close" class="closeFormBtn">
        </div>
        `
        formArea.innerHTML = formAreaContent

        formArea.style.display = "block"

        let closeForm = document.querySelector("input.closeFormBtn")
        closeForm.addEventListener("click", (e) => {
        formArea.style.display = "none"
    })
        
        window.onclick = (e) => {
            if (e.target == formArea) {
            formArea.style.display = "none"
            }
        }
    })
}

function editBook(id) {
    fetch(BASE_URL + `/books/${id}`)
    .then(resp => resp.json())
    .then(book => {
        let formArea = document.getElementById('form-area')
        let formContent = `
        <form class="inputForm">
            <h2>Edit Book Log Entry</h2>
            <h3 id="error"></h3>
            <label>Title:</label>
            <input type="text" id="Book Title" value="${book.title}"><br>
            <label>Author:</label>
            <input type="text" id="Book Author" value="${book.author}"><br>
            <label>Number of Pages:</label>
            <input type="number" id="Book Pages" value="${book.pages}"><br>
            <label>Date Finished:</label>
            <input type="date" id="Date Finished" value="${book.date_finished}"><br>
            <label>Main Characters (or for a nonfiction book, the main person or people the book is about):</label>
            <input type="text" id="Book Characters" value="${book.characters}"><br>
            <label>Problem (or for a nonfiction book, the biggest challenges or issues the main person or people have to deal with):</label>
            <input type="text" id="Book Problem" value="${book.problem}"><br>
            <label>Solution (or for a nonfiction book, the outcome of the main person's or people's struggles or efforts):</label>
            <input type="text" id="Book Solution" value="${book.solution}"><br>
            <label>How You Know This Book Belongs to This Genre:</label>
            <input type="text" id="Genre Rationale" value="${book.genre_rationale}"><br>
            <label>2 Words You Learned (include definitions):</label>
            <input type="text" id="Words Learned" value="${book.words_learned}"><br>
            <label>The Most Important Thing You Learned from This Book:</label>
            <input type="text" id="Something Learned" value="${book.something_learned}"><br>
            <label>A Question You Have about This Book:</label>
            <input type="text" id="Question" value="${book.question}"><br>
            <input type="hidden" id="genreID" value="${book.genre_id}" data-id="${book.genre_id}">
            <input type="button" value="Cancel" class="closeFormBtn">
            <input type="submit" class="editBook" value="Edit Book" class="editBook" data-id="${book.id}">
        </form>
        `
        formArea.innerHTML = formContent
        
        formArea.style.display = "block"
        let editBook = document.querySelector("input.editBook")
        editBook.addEventListener("click", (e) => {
            let title = document.getElementById("Book Title").value
            let author = document.getElementById("Book Author").value
            let pages = document.getElementById("Book Pages").value
            let date = document.getElementById("Date Finished").value
            let characters = document.getElementById("Book Characters").value
            let problem = document.getElementById("Book Problem").value
            let solution = document.getElementById("Book Solution").value
            let genre_rationale = document.getElementById("Genre Rationale").value
            let words_learned = document.getElementById("Words Learned").value
            let something_learned = document.getElementById("Something Learned").value
            let question = document.getElementById("Question").value
            if (title == "" || author == "" || pages == "" || pages == NaN || date == "" || characters == "" || problem == "" || solution == "" || genre_rationale == "" || words_learned == "" || something_learned == "" || question == "") {
                e.preventDefault()
                error.innerHTML = "Make sure all fields are filled out correctly."
            } else {
                window.alert("Book log entry updated!")
                updateBook(e.currentTarget.dataset.id)
                e.preventDefault()
                formArea.style.display = "none"
            }
        })

        let closeForm = document.querySelector("input.closeFormBtn")
        closeForm.addEventListener("click", (e) => {
            formArea.style.display = "none"
        })

        window.onclick = (e) => {
            if (e.target == formArea) {
            formArea.style.display = "none"
            }
        }

    })
}

function updateBook(id) {
    let updateBook = new Book(
        document.getElementById("Book Title").value,
        document.getElementById("Book Author").value,
        document.getElementById("Book Pages").value,
        document.getElementById("Date Finished").value,
        document.getElementById("Book Characters").value,
        document.getElementById("Book Problem").value,
        document.getElementById("Book Solution").value,
        document.getElementById("Genre Rationale").value,
        document.getElementById("Words Learned").value,
        document.getElementById("Something Learned").value,
        document.getElementById("Question").value,
        document.getElementById("genreID").value,
    )

    fetch(BASE_URL + `/books/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updateBook),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(book => {
        let content = document.querySelectorAll(`div a[data-id="${book.id}"]`)[0].parentElement

        content.innerHTML = `
            <a href="#" data-id="${book.id}">${book.title}</a><br><br>
            <button data-id="${book.id}" class="editBook" onclick="editBook(${book.id})"; return false;>Edit Book</button>
            <button data-id="${book.id}" class="deleteBook" onclick="deleteBook(${book.id})"; return false;>Delete Book</button>
        `
        let showBooks = document.querySelectorAll("a")
        showBooks.forEach(book => {
            book.addEventListener("click", (e) => {
                e.preventDefault()
                renderBook(e.currentTarget.dataset.id)
            })
        })
    })
}

function deleteBook(id) {
    
    const confirmation = confirm("Are you sure you want to delete this book log entry?")
    if (confirmation) {
        fetch(BASE_URL + `/books/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(document.querySelectorAll(`div a[data-id="${id}"]`)[0].parentElement.remove())
        window.alert("This entry has been deleted.")
    } else {
        return false;
    }

}