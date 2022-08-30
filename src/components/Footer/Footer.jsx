import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withTranslation } from 'react-i18next';

import { Container, Links, Link, CopyrightContainer, Copyright, IconWrapper } from './styles';

function Footer({ t }) {
  return (
    <Container>
      <Links>
        <Link>{t('Footer.termsAndPrivacy')}</Link>
        <Link hiddenSm>{t('Footer.contact')}</Link>
      </Links>
      <CopyrightContainer>
        <Copyright>{t('Footer.copyright')}</Copyright>
        <IconWrapper>
          <FontAwesomeIcon icon={['fab', 'instagram']} />
        </IconWrapper>
        <IconWrapper>
          <FontAwesomeIcon icon={['fab', 'twitter']} />
        </IconWrapper>
      </CopyrightContainer>
    </Container>
  );
}

Footer.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Footer);
