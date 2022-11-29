import { uniqueId } from 'lodash';
import { DateButtons } from '../reducers/todoSettings/types';

export const dateButtons: DateButtons = {
  1: {
    id: uniqueId(),
    title: '20:11:21 11 Oct 2022',
    sortBy: { date: 'DD MMM YYYY', time: true },
  },
  2: {
    id: uniqueId(),
    title: '11 10 2022',
    sortBy: { date: 'DD MM YYYY' },
  },
  3: {
    id: uniqueId(),
    title: '20:11:21 11.10.2022',
    sortBy: { date: 'DD.MM.YYYY', time: true },
  },
  4: {
    id: uniqueId(),
    title: '11-10-2022',
    sortBy: { date: 'DD-MM-YYYY' },
  },
  5: {
    id: uniqueId(),
    title: '11 Oct Thu',
    sortBy: { date: 'Do MMM dddd' },
  },
};
