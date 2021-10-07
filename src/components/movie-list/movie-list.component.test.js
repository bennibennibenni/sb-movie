import "@testing-library/jest-dom";
import * as React from "react";
import { render } from "@testing-library/react";
import MovieList from "../movie-list/movie-list.component";
import { BrowserRouter as Router } from "react-router-dom";

test("Succes render movie list", () => {
  const props = {
    imdbID: "t2424234",
    Poster: "Poster",
    Title: "Superman",
    Year: "1998",
    onClick: () => {},
  };
  render(
    <Router>
      <MovieList {...props} />
    </Router>
  );
});
