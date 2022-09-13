import React, { useEffect } from 'react';

const Forwarding = () => {
  useEffect(() => {
    location.href = 'http://localhost:3000/todo';
  }, []);
  return <div />;
};

export default Forwarding;
