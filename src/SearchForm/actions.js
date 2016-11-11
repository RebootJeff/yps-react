import partial from 'lodash/partial';

import * as YoutubeApi from '../api/youtube.js';

export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const REQUEST_SEARCH_RESULTS = 'REQUEST_SEARCH_RESULTS';

export function fetchSearchResults(searchText, nextPageToken) {
  return YoutubeApi.search(searchText, nextPageToken)
    .then(partial(receiveSearchResults, searchText));
}

export function receiveSearchResults(searchText, response) {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    payload: response,
    searchText: searchText
  };
}

export function requestSearchResults(resetResults) {
  return {
    type: REQUEST_SEARCH_RESULTS,
    resetResults
  };
}
