import axios from 'axios';

const getBaseInstance = () =>
  axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
  });

const makeInstance = () => {
  const baseInstance = getBaseInstance();

  // baseInstance.interceptors.response.use(...) goes here

  return baseInstance;
};

export default makeInstance();
