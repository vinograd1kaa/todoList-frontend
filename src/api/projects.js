import axios from './config';

export default {
  getProjects({ search }) {
    return axios.get(`/projects`, { params: { name: search } });
  },
};
