import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Container,
  Header,
  HeaderImage,
  HeaderInfo,
  HeaderTitle,
  HeaderLocation,
  HeaderMarkerIcon,
  Body,
  BodyTitle,
  BodyTags,
  BodyTag,
  Footer,
  FooterVideosCount,
  FooterDate,
  FooterVideoIcon,
  FooterVideosText,
  FooterClockIcon,
} from './styles';

const renderDate = (date) => {
  return new Date(date).toLocaleString('default', { day: 'numeric', month: 'long' });
};

function Card({ name, ownerName, videosAmount, date, imageSrc, location, tags, t }) {
  return (
    <Container>
      <Header>
        <HeaderImage src={imageSrc} />
        <HeaderInfo>
          <HeaderTitle>{ownerName}</HeaderTitle>
          <HeaderLocation>
            <HeaderMarkerIcon>
              <FontAwesomeIcon icon="map-marker-alt" />
            </HeaderMarkerIcon>
            {t('Projects.Card.location', { country: location.country, city: location.city })}
          </HeaderLocation>
        </HeaderInfo>
      </Header>
      <Body>
        <BodyTitle>{name}</BodyTitle>
        <BodyTags>
          {tags.map(({ id, name: tagName }) => (
            <BodyTag key={id}>{tagName}</BodyTag>
          ))}
        </BodyTags>
      </Body>
      <Footer>
        <FooterVideosCount>
          <FooterVideoIcon />
          <FooterVideosText>
            {videosAmount > 1
              ? t('Projects.Card.videos', { amount: videosAmount })
              : t('Projects.Card.video', { amount: videosAmount })}
          </FooterVideosText>
        </FooterVideosCount>
        <FooterDate>
          <FooterClockIcon />
          {renderDate(date)}
        </FooterDate>
      </Footer>
    </Container>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  location: PropTypes.shape({
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Card);
