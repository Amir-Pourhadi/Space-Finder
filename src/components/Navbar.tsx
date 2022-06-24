import { User } from "models/Models";
import React from "react";
import { Link } from "react-router-dom";

export default class Navbar extends React.Component<{ user: User | undefined }> {
  render(): React.ReactNode {
    return (
      <>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          {this.props.user ? <Link to="/logout">{this.props.user.userName}</Link> : <Link to="login">Login</Link>}
        </nav>
      </>
    );
  }
}
