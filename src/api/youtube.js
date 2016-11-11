import axios from 'axios';
import flow from 'lodash/fp/flow';
import get from 'lodash/fp/get';
import map from 'lodash/fp/map';

import { API_KEY } from '../credentials.js';

const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const VIDEO_DETAIL_URL = 'https://www.googleapis.com/youtube/v3/videos';

function fetchInitialSearchResults(searchText, nextPageToken) {
  return axios.get(SEARCH_URL, {
    params: {
      key: API_KEY,
      maxResults: 10,
      pageToken: nextPageToken,
      part: 'snippet',
      q: searchText,
      type: 'video'
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

function getDetailedSearchResults(initialResults) {
  const {
    items,
    nextPageToken,
    prevPageToken
  } = initialResults.data;
  const videoIds = map('id.videoId', items);

  return fetchVideosDetails(videoIds)
    .then((results) => {
      return Object.assign({}, results, {
        nextPageToken,
        prevPageToken
      });
    });
}

export function search(searchText, nextPageToken) {
  return fetchInitialSearchResults(searchText, nextPageToken)
    .then(getDetailedSearchResults);
}
