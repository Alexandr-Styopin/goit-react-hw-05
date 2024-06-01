import css from "../ReviewsList/ReviewsList.module.css";
export default function ReviewsList({ reviews }) {
  return (
    <ul className={css.reviewsList}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={css.reviewItem}>
          <h2 className={css.reviewAuthor}>Author: {author}</h2>
          <p className={css.reviewContent}>{content}</p>
        </li>
      ))}
    </ul>
  );
}
