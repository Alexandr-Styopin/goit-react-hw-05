import { fetchImages } from "../fatchAPI/fetchMovies";

export const getFullPosterUrl = async (posterPath) => {
  try {
    const imageData = await fetchImages();
    const { base_url: baseUrl, poster_sizes: posterSizes } = imageData.images;

    const posterSize = posterSizes[3];

    if (!baseUrl || !posterSize) {
      return "Missing image base URL or poster size";
    }

    return `${baseUrl}${posterSize}${posterPath}`;
  } catch (error) {
    console.error("Error fetching image data:", error);
    throw error;
  }
};
