import { combineReducers } from 'redux';
import BooksReducer from './reducer_books';
import ActiveBookReducer from './reducer_book_active';

const rootReducer = combineReducers({
  books:BooksReducer,
  activeBook:ActiveBookReducer
});

export default rootReducer;
