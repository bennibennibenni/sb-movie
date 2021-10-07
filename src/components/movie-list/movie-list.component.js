import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./movie-list.styles.css";

const MovieList = (props) => {
  const { imdbID, Poster, Title, Year, onClick } = props;
  return (
    <li key={imdbID} className="card-movie">
      <div className="content-wrap">
        <img
          onClick={onClick(imdbID)}
          className="poster"
          src={Poster}
          alt={Title}
        />
        <Link to={`movie-detail/${imdbID}`} className="link-more-info">
          <h3>
            {Title} ({Year})
          </h3>
        </Link>
        <ul className="separating-info"></ul>
      </div>
    </li>
  );
};

export default withRouter(MovieList);
