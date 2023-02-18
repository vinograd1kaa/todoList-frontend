import { compose } from 'lodash/fp';
import { withTranslation } from 'react-i18next';
import { Auth } from './Auth';

export const Authorization = compose(withTranslation())(Auth);
