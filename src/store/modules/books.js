import { auth, db } from '../../firebase/init';
import Book from '@/models/Book';

const collection = 'books';
const pagesCollection = 'pages';

const state = {
  books: [],
  book: new Book(),
  bookToEdit: {},
  bookToEditOriginal: {},
  pages: []
};

const getters = {
  // Books
  allBooks: state => state.books,
  bookToEdit: state => state.bookToEdit,
  totalBooks: state => state.books.length,
  totalReadingBooks: state => state.books.filter(b => b.reading).length,
  totalReadBooks: state => state.books.filter(b => b.read).length,
  totalPages: state => state.books.reduce((a, b) => a += b.readPages, 0),
  favoriteBooks: state => state.books.filter(b => b.favorite),
  // Pages
  allPages: state => state.pages
};

const actions = {
  async fetchBooks({ commit }, uid) {
    const data = [];
    await db.collection('users').doc(uid).collection(collection).onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type === 'added') {
          data.unshift({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
    commit('setBooks', data);
  },
  async fetchBookById({ commit }, { uid, id }) {
    try {
      const doc = await db.collection('users').doc(uid).collection(collection).doc(id).get();
      if (doc.exists) {
        return doc.data();
        // commit('setBook', doc.data());
      } else {
        console.log('Nenhum registro encontrado.');
      }  
    } catch (error) {
      console.log(`Ocorreu um erro:`, error.message);
    }
    
  },
  async createBook({ commit }, { book, uid }) {
    book.pages = Number(book.pages);
    book.readPages = Number(book.readPages);
    if (book.readPages == book.pages) {
      book.read = true;
    }
    try {
      const savedBook = await db.collection('users').doc(uid).collection(collection).add({...book});
      if (savedBook)
        return savedBook;
    } catch (error) {
      console.log(`Ocorreu um erro:`, error.message);
    }
  },
  setBookToEdit({ commit }, book) {
    commit('setEditBook', book);
  },
  async updateBook({ state, dispatch, commit }, { book, uid }) {
    book.pages = Number(book.pages);
    book.readPages = Number(book.readPages);
    if (book.readPages === book.pages) {
      book.read = true;
    } else {
      book.read = false;
    }
    try {
      const bookRef = await db.collection('users').doc(uid).collection(collection).doc(book.id);
      await bookRef.update(book);
      commit('updBook', book);
    } catch (error) {
      console.log(`Ocorreu um erro:`, error.message);
    }

    // Verify if user read pages comparing to the original object of the book
    if (state.bookToEditOriginal.readPages < book.readPages) {
      dispatch('createReadPagesRecord', { book, uid, readPages: book.readPages});
    }
  },
  async deleteBook({ commit }, { book, uid }) {
    try {
      await db.collection('users').doc(uid).collection(collection).doc(book.id).delete();
      commit('removeBook', book);
    } catch (error) {
      console.log(`Ocorreu um erro:`, error.message);
    }
  },
  // Pages
  async fetchPages({ commit }, uid) {
    const data = [];
    await db.collection('users').doc(uid).collection(pagesCollection).onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type === 'added') {
          data.unshift({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
    commit('setPages', data);
  },
  async createReadPagesRecord({ state, commit }, { book, uid, readPages }) {
    readPages = readPages - state.bookToEditOriginal.readPages;
    const record = {
      book,
      readPages,
      date: Date.now()
    };

    try {
      await db.collection('users').doc(uid).collection(pagesCollection).add(record);
    } catch (error) {
      console.log(`Ocorreu um erro:`, error.message);
    }
  },
  async deletePage({ commit }, { page, uid }) {
    try {
      await db.collection('users').doc(uid).collection(pagesCollection).doc(page.id).delete();
      commit('removePage', page);
    } catch (error) {
      console.log(`Ocorreu um erro:`, error.message);
    }
  },
};

const mutations = {
  // Books
  setBooks: (state, books) => state.books = books,
  setBook: (state, book) => state.book = book,
  setEditBook: (state, book) => {
    state.bookToEdit = book;
    state.bookToEditOriginal = Object.assign({}, book);
  },
  updBook: (state, book) => {
    const index = state.books.findIndex(b => b.id === book.id);
    if (index !== -1) {
      state.books.splice(index, 1, book);
    }
  },
  removeBook: (state, book) => state.books = state.books.filter(b => b.id !== book.id),
  // Pages
  setPages: (state, pages) => state.pages = pages,
  removePage: (state, page) => state.pages = state.pages.filter(b => b.id !== page.id),
};

export default {
  state,
  getters,
  actions,
  mutations
}