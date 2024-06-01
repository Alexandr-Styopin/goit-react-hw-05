import css from "../MovieCastList/MovieCastList.module.css";

export default function CastList({ cast }) {
  return (
    <ul className={css.castList}>
      {cast.map(({ id, name, fullPosterUrl }) => (
        <li key={id} className={css.castMember}>
          <img src={fullPosterUrl} alt={name} className={css.castImage} />
          <p className={css.castMemberName}>{name} </p>
        </li>
      ))}
    </ul>
  );
}
