import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../fatchAPI/fetchMovies";
export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData.results);
      } catch (error) {
        console.log("Error fetching movie reviews:", error);
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
      <ul>
        {reviews.map(({ id, author, content }) => (
          <li key={id}>
            <h2>Author: {author}</h2>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
