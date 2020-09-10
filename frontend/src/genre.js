class Genre {
    constructor(name) {
        this.name = name
    };
}

function listGenres() {
    resetFormArea()
    document.getElementById("genreSection").innerHTML = ""
    let genreSection = document.getElementById("genreSection") 
    fetch(BASE_URL + "/genres")
    .then(resp => resp.json())
    .then(genres => {
        genres.sort()

    genreSection.innerHTML += genres.map(genre => `
        <div class="genreItem">
        <a href="#" data-name="${genre.name}" data-id="${genre.id}">${genre.name}</a><br><br>
        <button data-name="${genre.name}" class="addBook" data-id="${genre.id}">Add Book</button>
        <button data-id="${genre.id}" class="editGenre" onclick="editGenre(${genre.id})"; return false;>Edit Genre Name</button>
        <button data-id="${genre.id}" class="deleteGenre" onclick="deleteGenre(${genre.id})"; return false;>Delete Genre</button>
        </div>
    `).join('')

    let newBook = document.querySelectorAll("button.addBook")
    newBook.forEach(addBookButton => {
        addBookButton.addEventListener("click", (e) => {
            addBook(e)
            e.preventDefault()
        })
    })

    let booksByGenre = document.querySelectorAll("a")
    booksByGenre.forEach(genre => {
        genre.addEventListener("click", (e) => {
            e.preventDefault()
            genreBooks(e.currentTarget.dataset.id)
        })
    })
    })
}

function showGenreForm() {
    document.getElementById("genreSection").innerHTML = ""
    listGenres()
    let formArea = document.getElementById("form-area")
    

    let formContent = `
        <form class="inputForm">
            <h2>Add a Genre</h2>
            <h3 id="error"></h3>
            <label>Genre Name:</label>
            <input type="text" id="Genre Name">
            <br><br>
            <input type="button" value="Cancel" class="closeFormBtn">
            <input type="submit" value="Add Genre" class="addGenre">
        </form>
    `
    formArea.innerHTML = formContent

    formArea.style.display = "block"

    let newGenre = document.querySelector("input.addGenre")
    newGenre.addEventListener("click", (e) => {

        let name = document.getElementById('Genre Name').value
        let error = document.getElementById('error')
        if (name == "" || name == null) {
            e.preventDefault()
            error.innerHTML = "Don't forget to add a genre name!"
        } else {
            window.alert("Genre added!")
            addGenre()
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

function addGenre() {
    let newGenre = new Genre(document.getElementById("Genre Name").value)

    let genreSection = document.getElementById("genreSection")
    fetch(BASE_URL + "/genres", {
        method: "POST",
        body: JSON.stringify(newGenre),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(genre => {
        genreSection.innerHTML += `
        <div class="genreItem">
        <a href="#" data-name="${genre.name}" data-id="${genre.id}">${genre.name}</a><br><br>
        <button data-name="${genre.name}" class="addBook" data-id="${genre.id}">Add Book</button>
        <button data-id="${genre.id}" class="editGenre" onclick="editGenre(${genre.id})"; return false;>Edit Genre Name</button>
        <button data-id="${genre.id}" class="deleteGenre" onclick="deleteGenre(${genre.id})"; return false;>Delete Genre</button>
        </div>
        `
        let newBook = document.querySelectorAll("button.addBook")
        newBook.forEach(addBookButton => {
            addBookButton.addEventListener("click", (e) => {
                addBook(e)
                e.preventDefault()
            })
        })

        let booksByGenre = document.querySelectorAll("a")
        booksByGenre.forEach(genre => {
            genre.addEventListener("click", (e) => {
                e.preventDefault()
                genreBooks(e.currentTarget.dataset.id)
            })
        })
    
    })
    
}

function editGenre(id) {
    fetch(BASE_URL + `/genres/${id}`)
    .then(resp => resp.json())
    .then(genre => {
        let formArea = document.getElementById("form-area")

        let formContent = `
            <form class="inputForm">
                <h2>Edit Genre Name</h2>
                <h3 id="error"></h3>
                <label>Genre Name:</label>
                <input type="text" id="Genre Name" value="${genre.name}">
                <br><br>
                <input type="button" value="Cancel" class="closeFormBtn">
                <input type="submit" class="editGenre" data-id="${genre.id} value="Edit Genre">
            </form>
        `
        formArea.innerHTML = formContent
        formArea.style.display = "block"

        let editGenre = document.querySelector("input.editGenre")
        
        editGenre.addEventListener("click", (e) => {
            let name = document.getElementById('Genre Name').value
            let error = document.getElementById('error')
 
            if (name == "" || name == null) {
                e.preventDefault()
                error.innerHTML = "Don't forget to add a genre name!"
            } else {
                window.alert("Genre name updated!")
                updateGenre(e.currentTarget.dataset.id)
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

function updateGenre(id) {
    let newGenre = new Genre(document.getElementById("Genre Name").value)
    
    fetch(BASE_URL + `/genres/${id}`, {
        method: "PATCH",
        body: JSON.stringify(newGenre),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(genre => {
        let content = document.querySelectorAll(`div a[data-id="${genre.id}"]`)[0].parentElement
        content.innerHTML = `
        <a href="#" data-name="${genre.name}" data-id="${genre.id}">${genre.name}</a><br><br>
        <button data-name="${genre.name}" class="addBook" data-id="${genre.id}">Add Book</button>
        <button data-id="${genre.id}" class="editGenre" onclick="editGenre(${genre.id})"; return false;>Edit Genre Name</button>
        <button data-id="${genre.id}" class="deleteGenre" onclick="deleteGenre(${genre.id})"; return false;>Delete Genre</button>
        `
        let newBook = document.querySelectorAll("button.addBook")
        newBook.forEach(addBookButton => {
            addBookButton.addEventListener("click", (e) => {
                addBook(e)
                e.preventDefault()
            })
        })

        let booksByGenre = document.querySelectorAll("a")
        booksByGenre.forEach(genre => {
            genre.addEventListener("click", (e) => {
                e.preventDefault()
                genreBooks(e.currentTarget.dataset.id)
            })
        })
    })
}

function deleteGenre(id) {
    const confirmation = confirm("Are you sure you want to delete this genre? All book log entries in this genre will be deleted as well.")
    if (confirmation) {
        fetch(BASE_URL + `/genres/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(document.querySelectorAll(`div a[data-id="${id}"]`)[0].parentElement.remove())
        window.alert("This genre has been deleted.")
    } else {
        return false;
    }
}

/*
Refactoring of Class, optional

constructor(attr) {
        this.name = attr.name;
        this.id = attr.id;
        
        Genre.all.push(this);
    }
    

    
    render() {
    
        return `
        <div class="genreItem">
        <a href="#" data-name="${this.name}" data-id="${this.id}">${this.name}</a><br><br>
        <button data-name="${this.name}" class="addBook" data-id="${this.id}">Add Book</button>
        <button data-id="${this.id}" class="editGenre" onclick="editGenre(${this.id})"; return false;>Edit Genre Name</button>
        <button data-id="${this.id}" class="deleteGenre" onclick="deleteGenre(${this.id})"; return false;>Delete Genre</button>
        </div>
        `;
    
    }

    static listGenres() {
       
        document.getElementById("genreSection").innerHTML = ""
        let genreSection = document.getElementById("genreSection")
        fetch(BASE_URL + "/genres")
            .then(resp => resp.json())
            .then(genres => {
                genres.sort()
                
                genreSection.innerHTML += genres.map(genre => {
                    let newGenre = new Genre(genre)
                    return newGenre.render()}).join('')
    
                let newBook = document.querySelectorAll("button.addBook")
                newBook.forEach(addBookButton => {
                    addBookButton.addEventListener("click", (e) => {
                        addBook(e)
                        e.preventDefault()
                    })
                })
    
                let booksByGenre = document.querySelectorAll("a")
                booksByGenre.forEach(genre => {
                    genre.addEventListener("click", (e) => {
                        e.preventDefault()
                        genreBooks(e.currentTarget.dataset.id)
                    })
                })
            })
    }

    static addGenre() {
        
    
        let genreSection = document.getElementById("genreSection")
        fetch(BASE_URL + "/genres", {
                method: "POST",
                body: JSON.stringify(newGenre),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then(genre => {
                let newGenre = new Genre(genre)
                genreSection.innerHTML += newGenre.render()
            
                let newBook = document.querySelectorAll("button.addBook")
                newBook.forEach(addBookButton => {
                    addBookButton.addEventListener("click", (e) => {
                        addBook(e)
                        e.preventDefault()
                    })
                })
    
                let booksByGenre = document.querySelectorAll("a")
                booksByGenre.forEach(genre => {
                    genre.addEventListener("click", (e) => {
                        e.preventDefault()
                        genreBooks(e.currentTarget.dataset.id)
                    })
                })
    
            })
    
    }


*/
