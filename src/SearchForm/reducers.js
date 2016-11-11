import {
  RECEIVE_SEARCH_RESULTS,
  REQUEST_SEARCH_RESULTS
} from '../SearchForm/actions.js';

const blankSearchResults = {
  items: [],
  nextPageToken: null,
  prevPageToken: null,
  searchText: ''
};

export function searchResults(state = blankSearchResults, action) {
  switch(action.type) {
    case RECEIVE_SEARCH_RESULTS:
      const {
        data,
        nextPageToken,
        prevPageToken
      } = action.payload;
      return {
        items: state.items.concat(data.items),
        nextPageToken,
        prevPageToken,
        searchText: action.searchText
      };

    case REQUEST_SEARCH_RESULTS:
      if(action.resetResults) {
        return blankSearchResults; // drop previous search results
      }
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
