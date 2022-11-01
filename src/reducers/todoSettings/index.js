import { uniqueId } from 'lodash';
import { SETTINGS_DATE } from '../../actions/TodoSettings';

const initialState = {
  dateSettings: { activeButton: 0, sortBy: null },
  sortButtons: {
    1: {
      id: uniqueId(),
      title: 'All',
      sortBy: { date: 'DD MMM YYYY', time: true },
    },
    2: {
      id: uniqueId(),
      title: '11 10 2022',
      sortBy: { date: 'DD MM YYYY' },
    },
    3: {
      id: uniqueId(),
      title: '20:11 11.10.2022',
      sortBy: { date: 'DD.MM.YYYY', time: true },
    },
    4: {
      id: uniqueId(),
      title: '11-10-2022',
      sortBy: { date: 'DD-MM-YYYY' },
    },
    5: {
      id: uniqueId(),
      title: '11 oct Thu',
      sortBy: { date: 'Do MMM dddd' },
    },
  },
};

export default function todoSettingsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SETTINGS_DATE:
      localStorage.setItem('activeButton', payload.id);

      return {
        ...state,
        dateSettings: { activeButton: payload.id, sortBy: payload.sortBy },
      };

    default:
      return state;
  }
}
