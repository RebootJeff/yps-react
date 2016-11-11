import axios from 'axios';
import flow from 'lodash/fp/flow';
import get from 'lodash/fp/get';
import map from 'lodash/fp/map';

import { API_KEY } from '../credentials.js';

const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const VIDEO_DETAIL_URL = 'https://www.googleapis.com/youtube/v3/videos';

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
      // TODO: Remove 'snippet' and re-use `fetchInitialSearchResults` snippets
      // to save on API quota.
      part: 'contentDetails,snippet,status,statistics'
    },
    responseType: 'json'
  });
}

const getDetailedSearchResults = flow([
  get('data.items'),
  map('id.videoId'),
  fetchVideosDetails
]);

export function search(searchText) {
  return fetchInitialSearchResults(searchText)
    .then(getDetailedSearchResults);
}
