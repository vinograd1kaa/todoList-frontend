import { createSelector } from 'reselect';
import { get } from 'lodash/fp';

const localState = get('projects');

export const isLoadingSelector = createSelector(localState, get('isLoading'));

export const projectsSelector = createSelector(localState, get('items'));
