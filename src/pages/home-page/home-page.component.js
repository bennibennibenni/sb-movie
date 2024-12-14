import React, { useState, useEffect, useRef, Fragment } from "react";
import FormSearch from "../../components/form-search/form-search.container";
import MovieList from "../../components/movie-list/movie-list.component";
import axios from "axios";
import get from "lodash/get";

import Modal from "../../components/modal/modal.component";
import "./home-page-styles.css";

const HomePage = (props) => {
  const {
    moviesList,
    moviesPage,
    setMoviesList,
    searchError,
  } = props;
  const [selectedMovie, setSelectedMovie] = useState({});
  const [showModal, setShowModal] = useState(false);
  const loaderCheckpointRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const _onClick = (imdbID) => () => {
    const movie = moviesList.find((data) => data.imdbID === imdbID);
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const _onCloseModal = () => {
    setShowModal(false);
  };

  const _renderPosterModal = () => {
    if (showModal) {
      return (
        <Modal showModal={showModal} onCloseModal={_onCloseModal}>
          <img
            className="poster-img"
            src={selectedMovie.Poster}
            alt={selectedMovie.Title}
          />
        </Modal>
      );
    }
    return null;
  };

  useEffect(() => {
    if (moviesList.length === 0) {
      getMoviesList();
    }
  }, []);

  const getMoviesList = async (searchQuery = "Avenger", pageNumber = 1) => {
    try {
      setIsLoading(true);
      const url = `http://www.omdbapi.com/?apikey=399d6c20&s=${encodeURIComponent(
        searchQuery
      )}&page=${pageNumber}`;
      const result = await axios.get(url);
      const list = get(result, "data.Search", []);
      const error = get(result, "data.Error", "");
      const newMoviveList = moviesList.concat(list);
      setMoviesList(newMoviveList);
      setIsLoading(false);

      return { list, error };
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <>
      <FormSearch />
      {isLoading ? (
        <div className="white">Loading</div>
      ) : (
        <div className="movies-list">
          {moviesList.map((list, index) => {
            const loaderCheckpoint = moviesPage.index * 5;
            return (
              <Fragment key={list.imdbID}>
                {index === loaderCheckpoint && (
                  <li
                    className="card-movie checkpoint"
                    ref={loaderCheckpointRef}
                  />
                )}
                <MovieList {...list} onClick={_onClick} />
              </Fragment>
            );
          })}
        </div>
      )}
      {!!searchError && <p className="white">Movies not found..</p>}
      {_renderPosterModal()}
    </>
  );
};

export default HomePage;
