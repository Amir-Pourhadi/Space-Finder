import { User, UserAttribute } from "models/Models";
import React from "react";
import { Link } from "react-router-dom";
import AuthService from "services/AuthService";

interface ProfileState {
  userAttributes: UserAttribute[];
}

interface ProfileProps {
  user: User | undefined;
  authService: AuthService;
}

export default class Profile extends React.Component<ProfileProps, ProfileState> {
  render(): React.ReactNode {
    return (
      <>
        <div>Welcome to the Profile Page!</div>
        {this.props.user ? (
          <h3>Hello {this.props.user.userName}</h3>
        ) : (
          <div>
            Please <Link to="/login">Login</Link>
          </div>
        )}
      </>
    );
  }
}
