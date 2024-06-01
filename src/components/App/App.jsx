import { lazy, Suspense } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import css from "../App/App.module.css";

import MovieReviews from "../MovieReviews/MovieReviews";
import MovieCast from "../MovieCast/MovieCast";
import Loader from "../Loader/Loader";
import Header from "../Header/Header";

const HomePage = lazy(() => import("../../pages/HomePages/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);

function App() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="reviews" element={<MovieReviews />} />
            <Route path="cast" element={<MovieCast />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
