import { uniqueId } from 'lodash';
import { SETTINGS_DATE } from '../../actions/TodoSettings';

const initialState = {
  dateSettings: { activeButton: 0, sortBy: null },
  sortButtons: {
    1: {
      id: uniqueId(),
      title: 'All',
      sortBy: {
        day: true,
        month: true,
        year: true,
        time: true,
        dayOfWeek: true,
        divide: ' ',
      },
    },
    2: {
      id: uniqueId(),
      title: '11 oct 2022',
      sortBy: { day: true, month: true, year: true, divide: ' ' },
    },
    3: {
      id: uniqueId(),
      title: '20:11 11.10.2022',
      sortBy: { time: true, day: true, month: true, year: true, divide: '.' },
    },
    4: {
      id: uniqueId(),
      title: '11-10-2022',
      sortBy: { day: true, month: true, year: true, divide: '-' },
    },
    5: {
      id: uniqueId(),
      title: '11 oct Thu',
      sortBy: { day: true, month: true, dayOfWeek: true, divide: ' ' },
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
