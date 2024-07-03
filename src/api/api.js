// postgresql://snake_db_tr6n_user:noDqDwloeXRoT582wApT0Fn9T2SjZelS@dpg-cq2ocr56l47c73basa00-a/snake_db_tr6n

import axios from 'axios';

export async function fetchTrendMovie(pageNumber, controller) {
  const API_URL = 'https://api.themoviedb.org/3/trending/movie/day';
  // параметри запиту на бекенд
  const options = {
    signal: controller.signal,
    params: {
      api_key: '6eb92bed4e8effdfb5cc4dc890c8b1e8',
      language: 'en-US',
      page: pageNumber,
    },
  };

  const response = await axios.get(API_URL, options);
  // console.log(response.data);
  return response;
}