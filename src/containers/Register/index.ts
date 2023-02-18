import { compose } from 'lodash/fp';
import { withTranslation } from 'react-i18next';
import { Register } from './Register';

export const Registration = compose(withTranslation())(Register);
