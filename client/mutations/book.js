export default {
  attachOwnerInfoToBook(state, {book, owner}) {
    let bookIndex = state.books.indexOf(book);
    state.books = [
      ...state.books.slice(0, bookIndex),
      Object.assign({}, state.books[bookIndex], {_ownedBy: owner}),
      ...state.books.slice(bookIndex + 1)
    ];
    state.viewObject = state.books[bookIndex];
  },
  removeBook(state, bookId) {
    state.books = state.books.filter(book => book._id !== bookId);
  },
  gotBooks(state, books) {
    state.books = [...state.books, ...books];
  },
  showAllBooks(state) {
    state.navigation = "allBooks";
    state.viewType = "bookList";
    state.viewObject = null;
  },
  showAllMyBooks(state) {
    state.navigation = "myBooks";
    state.viewType = "bookList";
    state.viewObject = null;
  },
  showAParticularBook(state, bookIDOrObject) {
    let bookObject;
    if (typeof bookIDOrObject === 'string') {
      bookObject = state.books.find(book => book._id === bookIDOrObject);
    } else {
      bookObject = bookIDOrObject;
    }

    state.navigation = "allBooks";
    state.viewType = "bookDetail";
    state.viewObject = bookObject;
  },
  showMyParticularBook(state, bookIDOrObject) {
    let bookObject;
    if (typeof bookIDOrObject === 'string') {
      bookObject = state.books.find(book => book._id === bookIDOrObject);
    } else {
      bookObject = bookIDOrObject;
    }
    state.navigation = "myBooks";
    state.viewType = "bookDetail";
    state.viewObject = bookObject;
  },
  showAddBookForm(state) {
    state.navigation = "addBook";
    state.viewType = "addBookForm";
    state.viewObject = null;
  }
};
