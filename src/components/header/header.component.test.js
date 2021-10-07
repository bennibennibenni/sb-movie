import "@testing-library/jest-dom";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Header from "../header/header.component";

test("Succes render header with title", () => {
  const testMessage = "Movie Finder";
  render(
    <BrowserRouter>
      <Header>{testMessage}</Header>
    </BrowserRouter>
  );

  expect(screen.getByTestId("title")).toHaveTextContent(testMessage);
});
