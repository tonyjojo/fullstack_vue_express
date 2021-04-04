import axios from "axios";

export default {
  callURL(url) {
    return axios
      .get(url)
      .then(res => res.data)
      .catch(error => error);
  }
};
