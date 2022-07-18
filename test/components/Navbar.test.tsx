import { render, screen } from "@testing-library/react";
import Navbar from "components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { correctUserInfo } from "../mockData/userData";

const developmentUrl = "http://localhost";

describe("Navbar Test Suit", () => {
  test("Renders Correctly with user login", () => {
    render(<Navbar user={undefined} />, { wrapper: BrowserRouter });

    const homeLink: HTMLAnchorElement = screen.getByTestId("home-link");
    expect(homeLink).toHaveTextContent("Home");
    expect(homeLink.href).toEqual(developmentUrl + "/");

    const profileLink: HTMLAnchorElement = screen.getByTestId("profile-link");
    expect(profileLink).toHaveTextContent("Profile");
    expect(profileLink.href).toEqual(developmentUrl + "/profile");

    const spacesLink: HTMLAnchorElement = screen.getByTestId("spaces-link");
    expect(spacesLink).toHaveTextContent("Spaces");
    expect(spacesLink.href).toEqual(developmentUrl + "/spaces");

    const loginLink: HTMLAnchorElement = screen.getByTestId("login-link");
    expect(loginLink).toHaveTextContent("Login");
    expect(loginLink.href).toEqual(developmentUrl + "/login");
  });

  test("Renders Correctly without user login", () => {
    render(<Navbar user={correctUserInfo} />, { wrapper: BrowserRouter });

    const homeLink: HTMLAnchorElement = screen.getByTestId("home-link");
    expect(homeLink).toHaveTextContent("Home");
    expect(homeLink.href).toEqual(developmentUrl + "/");

    const profileLink: HTMLAnchorElement = screen.getByTestId("profile-link");
    expect(profileLink).toHaveTextContent("Profile");
    expect(profileLink.href).toEqual(developmentUrl + "/profile");

    const spacesLink: HTMLAnchorElement = screen.getByTestId("spaces-link");
    expect(spacesLink).toHaveTextContent("Spaces");
    expect(spacesLink.href).toEqual(developmentUrl + "/spaces");

    const logoutLink: HTMLAnchorElement = screen.getByTestId("logout-link");
    expect(logoutLink).toHaveTextContent(correctUserInfo.userName);
    expect(logoutLink.href).toEqual(developmentUrl + "/logout");
  });
});
