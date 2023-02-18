import { compose } from 'lodash/fp';
import { withTranslation } from 'react-i18next';
import Todo from './Todo';

export const TodoList = compose(withTranslation())(Todo);
