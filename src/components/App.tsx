import { User } from "models/Models";
import React from "react";
import AuthService from "services/AuthService";
import Login from "./Login";

interface AppState {
  user: User | undefined;
}

export default class App extends React.Component<{}, AppState> {
  private authService: AuthService = new AuthService();

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <div>Hello World!</div>
        <Login authService={this.authService} />
      </React.Fragment>
    );
  }
}
