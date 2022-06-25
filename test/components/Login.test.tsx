import { render, screen } from "@testing-library/react";
import Login from "components/Login";

describe("Login Component Test Suit", () => {
  const authServiceMock = { login: jest.fn() };
  const setUserMock = jest.fn();

  test("Heading Test", () => {
    render(<Login authService={authServiceMock as any} setUser={setUserMock} />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Please Login");
  });

  test("Form Test", () => {
    render(<Login authService={authServiceMock as any} setUser={setUserMock} />);

    const userNameInput = screen.getByPlaceholderText(/username/i);
    expect(userNameInput).toBeInTheDocument();
    expect(userNameInput).toHaveValue("");

    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue("");

    const loginBtn = screen.getByRole("button", { name: /login/i });
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toHaveValue("Login");

    const failedLabel = screen.queryByText(/Login Failed/i);
    expect(failedLabel).not.toBeInTheDocument();

    const successLabel = screen.queryByText(/Login Successful/i);
    expect(successLabel).not.toBeInTheDocument();
  });
});
