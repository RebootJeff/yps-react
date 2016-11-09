import { combineReducers } from 'redux';

import SearchReducer from '../SearchForm/reducers.js';

const rootReducer = combineReducers({
  searchResults: SearchReducer
});

export default rootReducer;
