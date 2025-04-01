const myLibrary = [];

function Book(title, author, pages, stats, id) {
  // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.stats = stats;
    this.id = id;
}
//create book prototype to change read status
Book.prototype.readStatus = function(){
  if(this.stats == "read"){
    this.stats = "not read"
  }
  else{
    this.stats = "read"
  }
}

function addBookToLibrary(book) {
  // take params, create a book then store it in the array
    myLibrary.push(book);
}


const book1 = new Book("EJK", "The turtle", 50, "read", crypto.randomUUID())
const book2 = new Book("Human Rights", "The Who?", 25, "not read", crypto.randomUUID())
const book3 = new Book("KOLATERAL", "BLKD et al.", 12, "read", crypto.randomUUID())
const book4 = new Book("Gatilyo", "BLKD", 25, "read", crypto.randomUUID())
const book5 = new Book("Bistay", "Emar industriya", 4, "read", crypto.randomUUID())
const book6 = new Book("Alamat ng Gubat", "Bob ong", 93, "read", crypto.randomUUID())
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);
addBookToLibrary(book6);

//Functions to display books in the DOM
function displayBooks(book){
    //create new Div as the container for each book
    const newDiv = document.createElement("div");
    newDiv.classList.add("book");
    container.appendChild(newDiv);

    //display each object elements as <p> and append to the div container
    for (let x in book){
      if(book.hasOwnProperty(x)){
      const newP = document.createElement("p");
      newDiv.appendChild(newP);
      newP.textContent +=`${x}: ${book[x]}`;
      } 
    }   

    //create remove button
    const removeButton = document.createElement("button");
    removeButton.classList.add("rmvBtn");
    removeButton.textContent = "×"
    removeButton.addEventListener("click", () => {
      removeBookFromLibrary(book.id);
      newDiv.remove(); // Remove the book from the DOM
    });
    newDiv.appendChild(removeButton);

    //create read status button
    const statsBtn = document.createElement("button");
    statsBtn.classList.add("statsBtn");
    statsBtn.textContent = book.stats;
    statsBtn.addEventListener("click", () => {
      book.readStatus();
      statsBtn.textContent = book.stats;
      statsColor(statsBtn);
    })
    statsColor(statsBtn);
    newDiv.appendChild(statsBtn);
 
}
//change read status color
function statsColor(stats){
  if(stats.textContent == "read"){
    stats.style.color = "green";
  }
  else{
    stats.style.color = "red"
  }
}

//function to delete books from the library
function removeBookFromLibrary(bookId) {
  const bookIndex = myLibrary.findIndex(book => book.id === bookId);
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1); // Remove the book from the library array
  }
}

const container = document.querySelector(".container");
myLibrary.forEach(displayBooks);

//Add new book dialog/forms
const addNewBook = document.querySelector("#addBook");
const addDialog = document.querySelector("#dialog");
const submitButton = document.querySelector("#submit");
const closeButton = document.querySelector("#close")

addNewBook.addEventListener("click", ()=>{
  addDialog.showModal();
})

closeButton.addEventListener("click", ()=> {
  addDialog.close()
})


// Add new books base on the user input details
submitButton.addEventListener("click", ()=>{
  const allBook = document.querySelectorAll(".book");
  const newTitle = document.querySelector("#title");
  const newAuthor = document.querySelector("#author");
  const newPages = document.querySelector("#pages");
  const newStatus = document.querySelector("#status");
  const addBook= new Book(newTitle.value, newAuthor.value, newPages.value, newStatus.value, crypto.randomUUID())
  if(!newTitle.value||!newAuthor.value||!newPages.value||!newStatus.value){
    alert("input values to all text fields")
  }
  else{
    allBook.forEach(book => { book.remove()})
    addBookToLibrary(addBook);
    myLibrary.forEach(displayBooks);
  }
  newTitle.value = "";
  newAuthor.value = "";
  newPages.value = "";
  addDialog.close();
})

