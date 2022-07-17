import { render, screen } from "@testing-library/react";
import Home from "components/Home";

describe("Login Component Test Suit", () => {
  test("Content Test", () => {
    render(<Home />);

    expect(screen.getByText("Home Sweet Home!")).toBeInTheDocument();
  });
});
