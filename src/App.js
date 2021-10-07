import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/home-page/home-page.container";
import MovieDetail from "./pages/movie-detail/movie-detail.component";
import Layout from "./components/layout/layout.component";
import Header from "./components/header/header.component";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/movie-detail/:imdbID" component={MovieDetail} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
