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
    <br>
    <button id="sortGenres">Sort Genres</button>
    `

    let genreList = document.getElementById('genreList')
    genreList.addEventListener('click', listGenres)

    let renderGenreForm = document.getElementById('renderGenreForm')
    renderGenreForm.addEventListener('click', showGenreForm)
    
    let sortGenres = document.getElementById('sortGenres')
    sortGenres.addEventListener('click', () => {
        fetch(BASE_URL + "/genres")
        .then(resp => resp.json())
        .then(genres => {
            let genreSection = document.getElementById('genreSection')
            genres.sort(function(a, b) {
                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
              
                // names must be equal
                return 0;
              });
          genreSection.innerHTML = "";
          genreSection.innerHTML += genres
          .map(genre => {
            let newGenre = new Genre(genre);
            return newGenre.render();
          })
          .join("");
            
            console.log(genres)
        })
    })
}


