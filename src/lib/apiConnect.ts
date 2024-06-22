import axios from "axios";

const BASE_URL = "http://localhost:9000";
const API_URL = "api/widgets";

export interface Widget {
  starRating: number;
  name: string;
  price: number;
}

export const fetchAllWidgets = (): Promise<Widget[]> =>
  axios.get(`${BASE_URL}/${API_URL}`).then((response) => response.data);
export const findWidgetByName = (name: string): Promise<Widget> =>
  axios
    .get(`${BASE_URL}/${API_URL}/get/${name}`)
    .then((response) => response.data);
export const saveWidget = (body: Widget): Promise<Widget> =>
  axios
    .post(`${BASE_URL}/${API_URL}/save`, body)
    .then((response) => response.data);
export const updateWidget = (body: Widget): Promise<Widget> =>
  axios
    .put(`${BASE_URL}/${API_URL}/update`, body)
    .then((response) => response.data);
export const deleteWidget = (name: string): Promise<Widget> =>
  axios
    .delete(`${BASE_URL}/${API_URL}/delete/${name}`)
    .then((response) => response.data);
