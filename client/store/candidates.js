import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_CANDIDATES = 'GET_CANDIDATES';

/**
 * ACTION CREATORS
 */

export const getCandidates = candidates => ({
  type: GET_CANDIDATES,
  candidates
});

/**
 * THUNK CREATORS
 */
export const fetchCandidates = year => dispatch =>
  axios
    .get(`/api/candidates/${year}`)
    .then(res => dispatch(getCandidates(res.data)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_CANDIDATES:
      return action.candidates;
    default:
      return state;
  }
}
