import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "aa1d2a2b8177ac3b5ad3698898d78d80";

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTFkMmEyYjgxNzdhYzNiNWFkMzY5ODg5OGQ3OGQ4MCIsInN1YiI6IjYzYzFlZDdiYTU3NDNkMDBkZDU0ZjY4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uZ3jqnM8aEDf1ToNkW3qByoBAt-8_SQzhZR032RZSSs",
  },
};

export async function fetchMoviesTrending() {
  const response = await axios.get(`${BASE_URL}trending/movie/day`, options);

  return response.data;
}

export async function fetchMovieDetails(movieId) {
  const response = await axios.get(`${BASE_URL}movie/${movieId}`, options);
  return response.data;
}

export async function fetchImages(params) {
  const response = await axios.get(`${BASE_URL}configuration`, options);

  return response.data;
}

export async function fetchMovieReviews(movieId) {
  console.log(movieId);
  const response = await axios.get(
    `${BASE_URL}movie/${movieId}/reviews`,
    options
  );

  return response.data;
}

export async function fetchMovieCredits(movieId) {
  const response = await axios.get(
    `${BASE_URL}movie/${movieId}/credits`,
    options
  );

  return response.data;
}
