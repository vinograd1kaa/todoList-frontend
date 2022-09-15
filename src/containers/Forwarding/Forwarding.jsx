import React from 'react';

const Forwarding = ({ fromURL, toURL }) => {
  if (`http://localhost:3000${fromURL}` === location.href) {
    location.href = `http://localhost:3000${toURL}`;
  }
  return <div />;
};

export default Forwarding;
