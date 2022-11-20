export type Sort = { date: string; time?: boolean };

interface ButtonData {
  id: string;
  title: string;
  sortBy: { date: string; time?: boolean };
}

export type DateButtons = { [key: ButtonData['id']]: ButtonData };

export interface TodoSettingsState {
  dateSettings: {
    activeButton: string;
    sortBy: Sort;
  };
  dateSortButtons: DateButtons;
}

export interface DatePayload {
  type: string;
  payload: {
    id: string;
    sortBy: Sort;
  };
}
