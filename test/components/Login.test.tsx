import { fireEvent, render, screen } from "@testing-library/react";
import Login from "components/Login";
import { UserCredential } from "models/Models";
import { correctCredential, wrongCredential } from "../mockData/userData";

describe("Login Component Test Suit", () => {
  const mockLogin = jest.fn((userName: string, password: string) => {
    if (userName === correctCredential.userName && password === correctCredential.password) {
      return { userName, email: "example@gmail.com" };
    } else return undefined;
  });
  const MockAuthService = jest.fn().mockImplementation(() => ({ login: mockLogin }));

  function fillForm(info: UserCredential): void {
    const { userName, password } = info;

    const userNameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByRole("button", { name: /login/i });

    fireEvent.change(userNameInput, { target: { value: userName } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(loginBtn);
  }

  beforeEach(() => {
    MockAuthService.mockClear();
    mockLogin.mockClear();
  });

  test("Heading Test", () => {
    render(<Login authService={new MockAuthService()} setUser={jest.fn} />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Please Login");
  });

  test("Form Test", () => {
    render(<Login authService={new MockAuthService()} setUser={jest.fn} />);

    expect(screen.getByPlaceholderText(/username/i)).toHaveValue("");
    expect(screen.getByPlaceholderText(/password/i)).toHaveValue("");
    expect(screen.getByRole("button", { name: /login/i })).toHaveValue("Login");
    expect(screen.queryByText(/Login Failed/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Login Successful/i)).not.toBeInTheDocument();
  });

  test("Login with incorrect Info", async () => {
    const authService = new MockAuthService();
    render(<Login authService={authService} setUser={jest.fn} />);

    fillForm(wrongCredential);

    expect(authService.login).toBeCalledTimes(1);
    expect(authService.login).toBeCalledWith(wrongCredential.userName, wrongCredential.password);
    expect(authService.login).toReturnWith(undefined);
    expect(await screen.findByText(/Login Failed/i)).toBeInTheDocument();
  });

  test("Login with correct Info", async () => {
    const authService = new MockAuthService();
    render(<Login authService={authService} setUser={jest.fn} />);

    fillForm(correctCredential);

    expect(authService.login).toBeCalledTimes(1);
    expect(authService.login).toBeCalledWith(correctCredential.userName, correctCredential.password);
    expect(authService.login).toReturnWith({ userName: correctCredential.userName, email: "example@gmail.com" });

    // TODO: Also write tests for route navigation
  });
});
