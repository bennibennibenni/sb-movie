import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import FormSearch from "../form-search/form-search.component";

test("Succes render search form", () => {
  const props = {
    searchQuery: "",
    searchOptions: [
      {
        Title: "Title",
        Year: "Year",
        imdbID: "imdbID",
      },
    ],
    moviesPage: {},
    moviesList: [],
    setSearchQuery: () => {},
    setSearchOptions: () => {},
    setMoviesList: () => {},
    setIsLoadingSearch: () => {},
    setIsSearchError: () => {},
    setMoviesPage: () => {},
  };
  render(<FormSearch {...props} />);
});
