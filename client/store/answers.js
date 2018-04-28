import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ANSWERS = 'GET_ANSWERS';


/**
 * ACTION CREATORS
 */

export const getAnswers = (answers) => ({
  type: GET_ANSWERS,
  answers
});

/**
 * THUNK CREATORS
 */
export const fetchAnswers = (year) =>
  dispatch =>
    axios.get(`/api/states/${year}`)
      .then(res =>
        dispatch(getAnswers(res.data)))
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_ANSWERS:
      return action.answers;
    default:
      return state;
  }
}
