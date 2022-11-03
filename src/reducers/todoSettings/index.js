import { SETTINGS_DATE } from '../../actions/TodoSettings';
import { dateButtons } from '../../utils/todoSettings';

const initialState = {
  dateSettings: { activeButton: '1', sortBy: null },
  sortButtons: dateButtons,
};

export default function todoSettingsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SETTINGS_DATE:
      return {
        ...state,
        dateSettings: { activeButton: payload.id, sortBy: payload.sortBy },
      };

    default:
      return state;
  }
}
