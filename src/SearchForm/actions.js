import axios from 'axios';
import map from 'lodash/fp/map';

import { API_KEY } from '../credentials.js';

const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const VIDEO_DETAIL_URL = 'https://www.googleapis.com/youtube/v3/videos';

export const FETCH_SEARCH_RESULTS = 'FETCH_SEARCH_RESULTS';

function fetchInitialSearchResults(searchText) {
  return axios.get(SEARCH_URL, {
    params: {
      key: API_KEY,
      part: 'snippet',
      q: searchText,
      type: 'video',
      maxResults: 50
    },
    responseType: 'json'
  });
}

function fetchVideosDetails(videoIds) {
  return axios.get(VIDEO_DETAIL_URL, {
    params: {
      id: videoIds.join(','),
      key: API_KEY,
      maxResults: 50,
      // TODO: Remove 'snippet' and re-use `fetchInitialSearchResults` snippets
      // to save on API quota.
      part: 'contentDetails,snippet,status,statistics'
    },
    responseType: 'json'
  });
}

function addDetails(response) {
  const searchResults = response.data.items;
  const videoIds = map('id.videoId', searchResults);
  return fetchVideosDetails(videoIds);
}

export function fetchSearchResults(searchText) {
  const request = fetchInitialSearchResults(searchText)
    .then(addDetails);

  return {
    type: FETCH_SEARCH_RESULTS,
    payload: request
  };
}
