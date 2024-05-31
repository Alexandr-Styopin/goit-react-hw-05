import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <p>NotFound</p>
      <Link to={"/"}>Go Home</Link>
    </div>
  );
}
