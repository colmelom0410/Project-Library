const myLibrary = [];

class Book{
  constructor(title, author, pages, stats, id){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.stats = stats;
    this.id = id;
  }

  readStatus(){
    this.stats = this.stats === "read" ? "not read" : "read";
  }
}

function addBookToLibrary(book) {
  // take params, create a book then store it in the array
    myLibrary.push(book);
}


const book1 = new Book("KOLATERAL", "BLKD et al.", 12, "read", crypto.randomUUID())
addBookToLibrary(book1);


//Functions to display books in the DOM
function displayBooks(book){
    //create new Div as the container for each book
    const newDiv = document.createElement("div");
    newDiv.classList.add("book");
    container.insertBefore(newDiv, container.children[container.children.length - 1]);
    //create img container
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("bookCover");
    newDiv.appendChild(imgDiv);
    imgDiv.textContent = "Book Cover";
    //display each object elements as <p> and append to the div container
    for (let x in book){
      if(book.hasOwnProperty(x) && x!="cover" && x!="id" && x!="stats"){
      const newP = document.createElement("p");
      newP.classList.add(x);
      newDiv.appendChild(newP);
      newP.textContent +=`${book[x]}`;
      } 
    }   

    //create remove button
    const removeButton = document.createElement("button");
    removeButton.classList.add("rmvBtn");
    removeButton.textContent = "Delete"
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
    stats.style.backgroundColor = "green";
  }
  else{
    stats.style.backgroundColor = "rgb(145, 15, 15)"
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

