import axios from 'axios';

const API_KEY = '29490885-39aa37afc891f3eb40eae4912';
const BASE_URL = 'https://pixabay.com/api/';

export async function searchImages(query, page = 1, per_page = 40) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response.statusText || error.message);
  }
}
