import { render, screen, waitFor, within } from "@testing-library/react";
import Profile from "components/Profile";
import { BrowserRouter } from "react-router-dom";
import AuthService from "services/AuthService";
import { correctUserDesc, correctUserInfo } from "../mockData/userData";

const developmentUrl = "http://localhost";

describe("Profile Test Suit", () => {
  const mockGetUserAttributes = jest.fn(() => {
    return [
      { name: "Description", value: "Best user ever!" },
      { name: "Job", value: "Engineer" },
      { name: "Age", value: "25" },
      { name: "Experience", value: "3 years" },
    ];
  });
  const MockAuthService = jest.fn().mockImplementation(() => ({ getUserAttributes: mockGetUserAttributes }));

  beforeEach(() => {
    MockAuthService.mockClear();
    mockGetUserAttributes.mockClear();
  });

  test("Renders Correctly without user login", () => {
    render(<Profile authService={new MockAuthService()} user={undefined} />, { wrapper: BrowserRouter });

    expect(screen.getByText("Welcome to the Profile Page!")).toBeInTheDocument();

    const loginLink: HTMLAnchorElement = screen.getByText(/login/i);
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.href).toEqual(developmentUrl + "/login");
  });

  test("Renders Correctly with user login", async () => {
    render(<Profile authService={new AuthService()} user={correctUserInfo} />, { wrapper: BrowserRouter });

    expect(screen.getByText("Welcome to the Profile Page!")).toBeInTheDocument();
    expect(screen.getByText(`Hello ${correctUserInfo.userName}`)).toBeInTheDocument();
    expect(screen.getByText("Here are your attributes:")).toBeInTheDocument();

    await waitFor(() => {
      correctUserDesc.forEach(({ name, value }) => {
        const currentRow = screen.getAllByRole("row").find((row) => row.innerHTML.includes(name))!;

        const cells = within(currentRow);
        expect(cells.getByText(name)).toBeInTheDocument();
        expect(cells.getByText(value)).toBeInTheDocument();
      });
    });
  });
});
