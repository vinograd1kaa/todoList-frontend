import { compose } from 'lodash/fp';
import { withTranslation } from 'react-i18next';
import { Login } from './Login';

export const Entry = compose(withTranslation())(Login);
