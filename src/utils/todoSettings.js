import { uniqueId } from 'lodash';

export const dateButtons = {
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
};
