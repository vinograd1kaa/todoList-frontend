import { SETTINGS_DATE } from '../../actions/TodoSettings';
import { dateButtons } from '../../utils/todoSettings';
import { DatePayload, TodoSettingsState } from './types';

const initialState: TodoSettingsState = {
  dateSettings: { activeButton: '1', sortBy: { date: 'DD MMM YYYY', time: true } },
  dateSortButtons: dateButtons,
};

export default function todoSettingsReducer(state = initialState, { type, payload }: DatePayload) {
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
