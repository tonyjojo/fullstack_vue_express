import axios from "axios";

export default {
  fetchPeople(page) {
    return axios
      .get(`${apiUrl}/people/?page=${page}`)
      .then(res => res.data)
      .catch(error => error);
  },
  callURL(url) {
    return axios
      .get(url)
      .then(res => res.data)
      .catch(error => error);
  }
};
