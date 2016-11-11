import * as YoutubeApi from '../api/youtube.js';

export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const REQUEST_SEARCH_RESULTS = 'REQUEST_SEARCH_RESULTS';

export function fetchSearchResults(searchText) {
  return YoutubeApi.search(searchText)
    .then(receiveSearchResults);
}

export function receiveSearchResults(response) {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    payload: response
  };
}

export function requestSearchResults() {
  return {
    type: REQUEST_SEARCH_RESULTS
  };
}
