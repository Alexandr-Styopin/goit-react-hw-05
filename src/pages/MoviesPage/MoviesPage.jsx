import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearchMovie } from "../../fatchAPI/fetchMovies";

import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import css from "../MoviesPage/MoviesPage.module.css";

const SearchQuerySchema = Yup.object().shape({
  searchQuery: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams("");
  const searchQuery = searchParams.get("searchQuery") ?? "";

  const handleSubmit = (values, actions) => {
    const inputSearchQuery = values.searchQuery.toLowerCase().trim();
    setSearchParams({ searchQuery: inputSearchQuery });
    actions.resetForm();
  };

  useEffect(() => {
    const getSearchMovie = async () => {
      try {
        setError(false);
        setLoading(true);
        const queruResult = await fetchSearchMovie(searchQuery);
        setMovies(queruResult.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getSearchMovie();
  }, [searchQuery]);

  return (
    <div>
      <div className={css.searchBar}>
        <Formik
          initialValues={{ searchQuery: "" }}
          validationSchema={SearchQuerySchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={css.searchForm}>
              <Field
                name="searchQuery"
                type="text"
                placeholder="Search movies"
                className={css.searchInput}
              />
              <button type="submit" className={css.searchButton}>
                Search
              </button>
              {errors.searchQuery && touched.searchQuery ? (
                <div>{errors.searchQuery}</div>
              ) : null}
            </Form>
          )}
        </Formik>
      </div>
      {loading ? <Loader /> : error ? <Error /> : <MovieList movies={movies} />}
    </div>
  );
}
