export default function CastList({ cast }) {
  return (
    <ul>
      {cast.map(({ id, name, fullPosterUrl }) => (
        <li key={id}>
          <p>{name}</p>
          <img src={`${fullPosterUrl}`}></img>
        </li>
      ))}
    </ul>
  );
}
