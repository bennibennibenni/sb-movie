import React from "react";
import { Link } from "react-router-dom";
import imdbLogo from "../../assets/imdb-logo.svg";
import "./header.styles.css";

const Header = () => (
  <div className="container">
    <div className="logo-container">
      <img className="logo" src={imdbLogo} alt="IMDb Logo" />
      <Link to="/">
        <div className="text-title" data-testid="title">
          Movie Finder
        </div>{" "}
      </Link>
    </div>
  </div>
);

export default Header;
