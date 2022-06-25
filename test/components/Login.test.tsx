import { render, screen } from "@testing-library/react";
import Login from "components/Login";

describe("Login Component Test Suit", () => {
  const authServiceMock = { login: jest.fn() };
  const setUserMock = jest.fn();

  test("Heading Test", () => {
    render(<Login authService={authServiceMock as any} setUser={setUserMock} />);

    const title: HTMLElement = screen.getByRole("heading");
    expect(title).toBeTruthy();
    expect(title).toHaveTextContent("Please Login! (user:1234)");
  });
});
