import { act, fireEvent, render, screen } from "@testing-library/react";
import Login from "components/Login";
import { BrowserRouter } from "react-router-dom";

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

  function fillForm(info: userInfo): void {
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

    fillForm(wrongInfo);

    expect(authService.login).toBeCalledTimes(1);
    expect(authService.login).toBeCalledWith(wrongInfo.userName, wrongInfo.password);
    expect(authService.login).toReturnWith(undefined);
    expect(await screen.findByText(/Login Failed/i)).toBeInTheDocument();
  });

  test("Login with correct Info", async () => {
    const authService = new MockAuthService();
    render(<Login authService={authService} setUser={jest.fn} />, { wrapper: BrowserRouter });

    act(() => {
      fillForm(correctInfo);
    });

    expect(authService.login).toBeCalledTimes(1);
    expect(authService.login).toBeCalledWith(correctInfo.userName, correctInfo.password);
    expect(authService.login).toReturnWith({ userName: correctInfo.userName, email: "example@gmail.com" });

    // TODO: Also write tests for route navigation
  });
});
