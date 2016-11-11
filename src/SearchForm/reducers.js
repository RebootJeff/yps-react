import {
  RECEIVE_SEARCH_RESULTS,
  REQUEST_SEARCH_RESULTS
} from '../SearchForm/actions.js';

// const initialSearchResults = {
//   nextPageToken: null,
//   prevPageToken: null,
//   items: []
// }

export function searchResults(state = [], action) {
  switch(action.type) {
    case RECEIVE_SEARCH_RESULTS:
      return action.payload.data.items;
    default:
      return state;
  }
}

export function isLoading(state = false, action) {
  switch(action.type) {
    case RECEIVE_SEARCH_RESULTS:
      return false;
    case REQUEST_SEARCH_RESULTS:
      return true;
    default:
      return state;
  }
}
