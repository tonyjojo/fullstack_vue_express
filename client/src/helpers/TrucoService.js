import axios from "axios";

const url = "/api/trucos/";

class TrucoService {
  // Get trucos
  static getTrucos() {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(res => {
          const data = res.data;
          resolve(
            data.map(truco => ({
              ...truco,
              creationDate: new Date(truco.creationDate)
            }))
          );
        })
        .catch(err => reject(err));
    });
  }

  // Create truco
  static createTruco(text) {
    return axios.post(url, { text });
  }

  // Delete truco
  static deleteTruco(trucoId) {
    return axios.delete(`${url}${trucoId}`);
  }
}

export default TrucoService;
