import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import MovieList from "../../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearchMovie } from "../../fatchAPI/fetchMovies";

const SearchQuerySchema = Yup.object().shape({
  searchQuery: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams("");
  const searchQuery = searchParams.get("searchQuery") ?? "";

  const handleSubmit = (values, actions) => {
    const inputSearchQuery = values.searchQuery.toLowerCase().trim();
    setSearchParams({ searchQuery: inputSearchQuery });
    actions.resetForm();
  };

  useEffect(() => {
    const getSearchMovie = async () => {
      const queruResult = await fetchSearchMovie(searchQuery);

      setMovies(queruResult.results);

      console.log(queruResult, " ok");

      try {
      } catch (error) {
        console.log(error);
      }
    };
    getSearchMovie();
  }, [searchQuery]);

  return (
    <div>
      MoviesPage
      <div>
        <Formik
          initialValues={{ searchQuery: "" }}
          validationSchema={SearchQuerySchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                name="searchQuery"
                type="text"
                placeholder="Search movies"
              />
              {errors.searchQuery && touched.searchQuery ? (
                <div>{errors.searchQuery}</div>
              ) : null}
              <button type="submit">Search</button>
            </Form>
          )}
        </Formik>
      </div>
      <MovieList movies={movies} />
    </div>
  );
}
