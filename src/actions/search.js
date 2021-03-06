import axios from 'axios';
// import queryString from 'query-string';

export const QUERY_CHANGED = 'QUERY_CHANGED';
export const ADD_AGGS = 'ADD_AGGS';
export const REMOVE_AGGS = 'REMOVE_AGGS';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const PAGE_CHANGE = 'PAGE_CHANGE';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export function searchRequest(){
  return {
    type: SEARCH_REQUEST
  };
}

export function searchSuccess(results) {
  return {
    type: SEARCH_SUCCESS,
    results
  };
}

export function searchError(error) {
  return {
    type: SEARCH_ERROR,
    error
  };
}

export function fetchSearch () {
  return function (dispatch) {
    let searchApiUrl = '/api/deposits';
    let results;
    let location = window.location.search;
    const searchUrl = `${searchApiUrl}/${location}`;

    dispatch(searchRequest());

    axios
      .get(searchUrl)
      .then((response) => {
        results = response.data;
        dispatch(searchSuccess(results));
      });
  };
}

export function toggleAggs(selectedAggs) {
  return {
    type: ADD_AGGS,
    selectedAggs: selectedAggs
  };
}

export function queryChanged(query) {
    // history.pushState(null, null, `?q=${query}`);
  return function (dispatch) {
    // dispatch(setQuery(query));
    dispatch(fetchSearch(query));
  };
}

export function setQuery(query) {
  return {
    type: QUERY_CHANGED,
    query
  };
}