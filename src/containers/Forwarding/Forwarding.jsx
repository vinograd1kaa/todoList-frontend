import React from 'react';

const Forwarding = ({ fromURL, toURL }) => {
  if (`${location.origin}${fromURL}` === location.href) {
    location.href = `${location.origin}${toURL}`;
  }
  return <div />;
};

export default Forwarding;
