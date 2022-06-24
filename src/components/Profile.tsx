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
  state: Readonly<ProfileState> = {
    userAttributes: [],
  };

  async componentDidMount(): Promise<void> {
    if (this.props.user) {
      const userAttributes: UserAttribute[] = await this.props.authService.getUserAttributes(this.props.user);
      this.setState({ userAttributes });
    }
  }

  render(): React.ReactNode {
    return (
      <>
        <div>Welcome to the Profile Page!</div>
        {this.props.user ? (
          <React.Fragment>
            <h3>Hello {this.props.user.userName}</h3>
            <p>Here are your attributes: </p>
            <table>
              <tbody>
                {this.state.userAttributes.map(
                  (userAttribute: UserAttribute): React.ReactNode => (
                    <tr>
                      <td>{userAttribute.name}</td>
                      <td>{userAttribute.value}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </React.Fragment>
        ) : (
          <div>
            Please <Link to="/login">Login</Link>
          </div>
        )}
      </>
    );
  }
}
