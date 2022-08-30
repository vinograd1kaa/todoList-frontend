import { createSelector } from 'reselect';
import { get } from 'lodash/fp';

const localState = get('todo');

export const todoSelector = createSelector(localState, get('items'));

