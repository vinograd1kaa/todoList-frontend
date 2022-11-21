import { compose } from 'lodash/fp';
import { withTranslation } from 'react-i18next';
import Todo from './Todo';

export default compose(withTranslation())(Todo);
