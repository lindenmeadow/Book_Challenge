# Book_Challenge
Welcome to the Book Challenge! This is a JavaScript SPA with a Rails API that I completed as part of my web development coursework through Flatiron School. 

The Book Challenge is intended as an application which would allow users -- mainly elementary school and/or middle school students -- to create a log of books they have read. (By the way, the inspiration for the app derives from author Donalyn Miller's Forty Book Challenge.)  In keeping with the project's CRUD design requirements, the interface allows users to create, view, edit, and delete genres and book log entries. Once a genre has been added, books can be added to it. 

The Rails API has two models: Genre and Book. A genre has many books, and a book belongs to a genre. The Rails models in turn have corresponding JavaScript Genre and Book classes. To keep all features on a single page, I designed the app so the page's main section can switch back and forth between the genre list and a list of books contained in a particular genre, while the book log entries and input forms appear on the screen as modal boxes. 

I have populated the app with some dummy genre and book lists (for demonstration), which can be either deleted manually or, if you prefer to start with a fresh list of your own, can be removed by deleting 'schema.rb' and 'development.sqlite3' from the backend's 'db' folder and then running the rails migration. 
