import { assoc, compose } from 'lodash/fp';
import {
  GET_PROJECTS_FAIL,
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
} from '../../actions/Projects';

const initialState = {
  isLoading: false,
  items: [],
};

export default function projectsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_PROJECTS_PENDING:
      return compose(assoc('isLoading', true))(state);
    case GET_PROJECTS_SUCCESS:
      return compose(assoc('items', payload.items), assoc('isLoading', false))(state);
    case GET_PROJECTS_FAIL:
      return compose(assoc('isLoading', false))(state);
    default:
      return state;
  }
}
