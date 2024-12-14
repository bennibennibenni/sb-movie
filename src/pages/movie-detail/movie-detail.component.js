import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import get from "lodash/get";

import Modal from "../../components/modal/modal.component";
import "./movie-detail.styles.css";

const MovieDetail = () => {
  const { imdbID } = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const _onClick = () => () => {
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
            src={movieDetail.Poster}
            alt={movieDetail.Title}
          />
        </Modal>
      );
    }

    return null;
  };

  const getMovieDetail = async (imdbID) => {
    try {
      const url = `http://www.omdbapi.com/?apikey=399d6c20&i=${encodeURIComponent(
        imdbID
      )}`;
      const result = await axios.get(url);
      const data = get(result, "data", {});
      return data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsLoading(true);
      try {
        const result = await getMovieDetail(imdbID);
        setMovieDetail(result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [imdbID]);

  const renderMovieDetail = () => {
    return isLoading ? (
      <div className="white">Loading</div>
    ) : (
      <div className="movie-detail">
        <img
          onClick={_onClick()}
          className="poster-image"
          src={movieDetail.Poster}
          alt={movieDetail.Title}
        />
        <h1>{movieDetail.Title}</h1>
        <p>Released : {movieDetail.Released}</p>
        <p>imdbRating : {movieDetail.imdbRating}</p>
        <p>Genre : {movieDetail.Genre}</p>
        <p>Production : {movieDetail.Production}</p>
        <p>Country : {movieDetail.Country}</p>
        <p>Writer : {movieDetail.Writer}</p>
        <p>Director : {movieDetail.Director}</p>
        <p>Actors : {movieDetail.Actors}</p>
        <br />
        <p>{movieDetail.Plot}</p>
      </div>
    );
  };

  return (
    <div className="movie-page">
      {renderMovieDetail()}
      {_renderPosterModal()}
    </div>
  );
};

export default MovieDetail;
