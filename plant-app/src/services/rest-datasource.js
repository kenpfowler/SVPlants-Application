import axios from "axios";

const API_URL = "https://localhost:44391/plantwatering";

export class RestDatasource {
  async FetchPlants() {
    const response = await axios.get(API_URL);
    return response.data;
  }
}

export default new RestDatasource();
