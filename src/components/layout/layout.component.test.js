import "@testing-library/jest-dom";
import * as React from "react";
import { render } from "@testing-library/react";
import Layout from "../layout/layout.component";

test("Succes render layout", () => {
  render(<Layout />);
});
