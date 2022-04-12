import apiService from "./apiService";
import apiConfig from "./config";

export const category = {
  movie: "movie",
  tv: "tv",
};

export const sortBy = [
  { id: "popularity.asc", name: "Popularity ASC" },
  { id: "popularity.desc", name: "Popularity DSC" },
  { id: "release_date.asc", name: "Release Date ASC" },
  { id: "release_date.desc", name: "Release Date DSC" },
  { id: "revenue.asc", name: "Revenue DSC" },
  { id: "revenue.desc", name: "Revenue DSC" },
  { id: "original_title.asc", name: "Title ASC" },
  { id: "original_title.desc", name: "Title DSC" },
  { id: "vote_average.asc", name: "Vote ASC" },
  { id: "vote_average.desc", name: "Vote DSC" },
  { id: "vote_count.asc", name: "Vote Count ASC" },
  { id: "vote_count.desc", name: "Vote Count DSC" },
];

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};
export const trendingType = {
  movie: "movie",
  tv: "tv",
};

export const trendingTimeType = {
  day: "day",
  week: "week",
};

const tmdbApi = {
  getMoviesList: (type, params) => {
    const url = `movie/${movieType[type]}?api_key=${apiConfig.apiKey}`;
    return apiService.get(url, params);
  },
  getTvList: (type, params) => {
    const url = `tv/${tvType[type]}?api_key=${apiConfig.apiKey}`;
    return apiService.get(url, params);
  },
  getTrendMovieList: (type, time, params) => {
    const url = `trending/${trendingType[type]}/${trendingTimeType[time]}?api_key=${apiConfig.apiKey}`;
    return apiService.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = `${category[cate]}/${id}/videos?api_key=${apiConfig.apiKey}`;
    return apiService.get(url, { params: {} });
  },
  getGenre: (cate, params) => {
    const url = `genre/${category[cate]}/list?api_key=${apiConfig.apiKey}`;
    return apiService.get(url, { params });
  },
  search: (cate, params) => {
    const url = `search/${category[cate]}?api_key=${apiConfig.apiKey}`;
    return apiService.get(url, { params });
  },
  detail: (cate, id, params) => {
    const url = `${category[cate]}/${id}?api_key=${apiConfig.apiKey}`;
    return apiService.get(url, params);
  },
  discover: (cate, params) => {
    const url = `discover/${category[cate]}?api_key=${apiConfig.apiKey}`;
    return apiService.get(url, { params });
  },
  similar: (cate, id) => {
    const url = `${category[cate]}/${id}/similar?api_key=${apiConfig.apiKey}`;
    return apiService.get(url, { params: {} });
  },
  credits: (cate, id) => {
    const url = `${category[cate]}/${id}/credits?api_key=${apiConfig.apiKey}`;
    return apiService.get(url, { params: {} });
  },
};

export default tmdbApi;
