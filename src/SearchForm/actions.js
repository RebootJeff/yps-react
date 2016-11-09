import axios from 'axios';

import { API_KEY } from '../credentials.js';

const ROOT_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

export const FETCH_SEARCH_RESULTS = 'FETCH_SEARCH_RESULTS';

export function fetchSearchResults(searchText) {
  const request = axios.get(ROOT_SEARCH_URL, {
    params: {
      key: API_KEY,
      q: searchText,
      part: 'snippet',
      type: 'video',
      maxResults: 50
    },
    responseType: 'json'
  });

  return {
    type: FETCH_SEARCH_RESULTS,
    payload: request
  };
}
