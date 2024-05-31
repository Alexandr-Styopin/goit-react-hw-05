import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../fatchAPI/fetchMovies";
import ReviewsList from "./ReviewsList/ReviewsList";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getReviews = async () => {
      try {
        setError(false);
        setLoading(true);
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  if (reviews.length === 0) {
    return (
      <>
        <p>Information is absent</p>
      </>
    );
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <ReviewsList reviews={reviews} />
      )}
    </div>
  );
}
