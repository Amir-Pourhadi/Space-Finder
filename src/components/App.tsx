import { User } from "models/Models";
import React from "react";
import AuthService from "services/AuthService";
import Login from "./Login";

interface AppState {
  user: User | undefined;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.setUser = this.setUser.bind(this);
  }

  private authService: AuthService = new AuthService();
  private setUser(user: User): void {
    this.setState({ user });
    console.log("setting the user" + user);
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <div>Hello World!</div>
        <Login authService={this.authService} setUser={this.setUser} />
      </React.Fragment>
    );
  }
}
