import { combineReducers } from 'redux';

import {
  isLoading,
  searchResults
} from '../SearchForm/reducers.js';

const rootReducer = combineReducers({
  isLoading,
  searchResults
});

export default rootReducer;
