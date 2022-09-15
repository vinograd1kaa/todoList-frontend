import React from 'react';

const Forwarding = ({ fromURL, toURL }) => {
  if (`${location.origin}${fromURL}` === location.href) {
    location.href = `http://localhost:3000${toURL}`;
  }
  return <div />;
};

export default Forwarding;
