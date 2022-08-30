import { assoc, compose } from 'lodash/fp';
import { ADD_TASK } from '../../actions/Todo';

const initialState = {
  items: [
    {
      title: 'победить андрея лобби на сфах',
      checked: false,
    },
    {
      title: 'посапортить на земеле',
      checked: false,
    },
    {
      title: 'посапортить на вилке',
      checked: false,
    },
  ],
};

export default function todoReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TASK:
      return compose(assoc('items', payload.items))(state);
    default:
      return state;
  }
}
