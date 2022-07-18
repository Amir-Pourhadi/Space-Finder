import { User } from "models/Models";
import React from "react";
import { Link } from "react-router-dom";

export default class Navbar extends React.Component<{ user: User | undefined }> {
  render(): React.ReactNode {
    return (
      <>
        <nav>
          <div>
            <Link to="/" data-testid="home-link">
              Home
            </Link>
            <Link to="/profile" data-testid="profile-link">
              Profile
            </Link>
            <Link to="/spaces" data-testid="spaces-link">
              Spaces
            </Link>
          </div>
          <h1>Website</h1>
          {this.props.user ? (
            <Link to="/logout" data-testid="logout-link">
              {this.props.user.userName}
            </Link>
          ) : (
            <Link to="/login" data-testid="login-link">
              Login
            </Link>
          )}
        </nav>
      </>
    );
  }
}
