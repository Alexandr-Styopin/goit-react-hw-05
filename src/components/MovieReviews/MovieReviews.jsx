import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../fatchAPI/fetchMovies";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import ReviewsList from "./ReviewsList/ReviewsList";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const isReviewListEmpty = reviews.length === 0;

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

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : isReviewListEmpty ? (
        <p>Information is absent</p>
      ) : (
        <ReviewsList reviews={reviews} />
      )}
    </div>
  );
}
