import { fetchImages } from "../fatchAPI/fetchMovies";
import defaultImage from "../public/images/placeholder.png";

export const getFullPosterUrl = async (posterPath) => {
  try {
    const imageData = await fetchImages();
    const { base_url: baseUrl, poster_sizes: posterSizes } = imageData.images;

    const posterSize = posterSizes[3];

    if (!baseUrl || !posterSize) {
      return defaultImage;
    }

    if (!posterPath) {
      return defaultImage;
    }

    return `${baseUrl}${posterSize}${posterPath}`;
  } catch (error) {
    console.error("Error fetching image data:", error);
    return defaultImage;
  }
};
