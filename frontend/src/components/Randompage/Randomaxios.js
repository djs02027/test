import axios from 'axios';
import server from '../../API/server';

function provinceCities(provinceId) {
  const provinceCities =
    server.BASE_URL + server.ROUTES.allCities + `${provinceId}`;
  return axios.get(provinceCities);
}

export { provinceCities };
