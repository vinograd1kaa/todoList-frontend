import { compose } from 'lodash/fp';
import { withTranslation } from 'react-i18next';
import EmptyFullTodo from './EmptyFullTodo';

export default compose(withTranslation())(EmptyFullTodo);
