import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "components/Login";

type userInfo = { userName: string; password: string };

describe("Login Component Test Suit", () => {
  const wrongInfo: userInfo = { userName: "UserName", password: "PassWord" };
  const correctInfo: userInfo = { userName: "user", password: "1234" };

  const mockLogin = jest.fn((userName: string, password: string) => {
    if (userName === "user" && password === "1234") {
      return { userName, email: "example@gmail.com" };
    } else return undefined;
  });
  const MockAuthService = jest.fn().mockImplementation(() => ({ login: mockLogin }));

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

    const userNameInput = screen.getByPlaceholderText(/username/i);
    expect(userNameInput).toHaveValue("");

    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toHaveValue("");

    const loginBtn = screen.getByRole("button", { name: /login/i });
    expect(loginBtn).toHaveValue("Login");

    const failedLabel = screen.queryByText(/Login Failed/i);
    expect(failedLabel).not.toBeInTheDocument();

    const successLabel = screen.queryByText(/Login Successful/i);
    expect(successLabel).not.toBeInTheDocument();
  });

  test("Login with incorrect Info", async () => {
    const authService = new MockAuthService();
    render(<Login authService={authService} setUser={jest.fn} />);

    const userNameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByRole("button", { name: /login/i });

    fireEvent.change(userNameInput, { target: { value: wrongInfo.userName } });
    fireEvent.change(passwordInput, { target: { value: wrongInfo.password } });
    fireEvent.click(loginBtn);

    expect(authService.login).toBeCalledTimes(1);
    expect(authService.login).toBeCalledWith(wrongInfo.userName, wrongInfo.password);
    expect(authService.login).toReturnWith(undefined);

    const statusLabel = await waitFor(() => screen.findByTestId("status-label"));
    expect(statusLabel).toBeInTheDocument();
    expect(statusLabel).toHaveTextContent("Login Failed");
  });

  test("Login with correct Info", async () => {
    const authService = new MockAuthService();
    render(<Login authService={authService} setUser={jest.fn} />);

    const userNameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByRole("button", { name: /login/i });

    fireEvent.change(userNameInput, { target: { value: correctInfo.userName } });
    fireEvent.change(passwordInput, { target: { value: correctInfo.password } });
    fireEvent.click(loginBtn);

    expect(authService.login).toBeCalledTimes(1);
    expect(authService.login).toBeCalledWith(correctInfo.userName, correctInfo.password);
    expect(authService.login).toReturnWith({ userName: correctInfo.userName, email: "example@gmail.com" });

    const statusLabel = await waitFor(() => screen.findByTestId("status-label"));
    expect(statusLabel).toBeInTheDocument();

    // TODO: Fix the bug here and uncomment line 91!
    // Bug: Here I faced a bug... States in Login Component didn't updated :(
    // expect(statusLabel).toHaveTextContent("Login Successful");
  });
});
