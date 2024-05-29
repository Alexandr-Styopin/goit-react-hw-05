import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTFkMmEyYjgxNzdhYzNiNWFkMzY5ODg5OGQ3OGQ4MCIsInN1YiI6IjYzYzFlZDdiYTU3NDNkMDBkZDU0ZjY4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uZ3jqnM8aEDf1ToNkW3qByoBAt-8_SQzhZR032RZSSs",
};

const API_KEY = "aa1d2a2b8177ac3b5ad3698898d78d80";

const fetchData = async (url, params = {}) => {
  const response = await axios.get(url, {
    params: { api_key: API_KEY, ...params },
  });
  return response.data;
};

export const fetchMoviesTrending = () => fetchData("trending/movie/day");

export const fetchMovieDetails = (movieId) => fetchData(`movie/${movieId}`);

export const fetchImages = () => fetchData("configuration");

export const fetchMovieReviews = (movieId) =>
  fetchData(`movie/${movieId}/reviews`);

export const fetchMovieCredits = (movieId) =>
  fetchData(`movie/${movieId}/credits`);

export const fetchSearchMovie = (searchQuery) =>
  fetchData("search/movie", { query: searchQuery });
