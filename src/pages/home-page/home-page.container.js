import React from "react";
import { connect } from "react-redux";
import HomePage from "./home-page.component";

import {
  setMoviesPage,
  setMoviesList,
} from "../../redux/movies/movies.actions";
import {
  selectMoviesList,
  selectMoviesPage,
  selectIsLoadingSearch,
  selectSearchError,
} from "../../redux/movies/movies.selectors";

const HomePageComponent = (props) => <HomePage {...props} />;

const mapStateToProps = (state) => ({
  moviesList: selectMoviesList(state),
  moviesPage: selectMoviesPage(state),
  isLoadingSearch: selectIsLoadingSearch(state),
  searchError: selectSearchError(state),
});

const mapDispatchToProps = (dispatch) => ({
  setMoviesList: (value) => dispatch(setMoviesList(value)),
  setMoviesPage: (param) => dispatch(setMoviesPage(param)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePageComponent);
