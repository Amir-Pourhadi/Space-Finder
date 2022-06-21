import { User } from "models/Models";
import React, { ChangeEvent, FormEvent, SyntheticEvent } from "react";
import AuthService from "services/AuthService";

interface LoginProps {
  authService: AuthService;
}

interface LoginState {
  userName: string;
  password: string;
  loginAttempted: boolean;
  loginSuccessful: boolean;
}

interface CustomEvent {
  target: HTMLInputElement;
}

export default class Login extends React.Component<LoginProps, LoginState> {
  state: Readonly<LoginState> = {
    userName: "",
    password: "",
    loginAttempted: false,
    loginSuccessful: false,
  };

  private setUserName(event: CustomEvent): void {
    this.setState({ userName: event.target.value });
  }

  private setPassword(event: CustomEvent): void {
    this.setState({ password: event.target.value });
  }

  private async handleSubmit(event: SyntheticEvent): Promise<void> {
    event.preventDefault();
    const result: User | undefined = await this.props.authService.login(this.state.userName, this.state.password);
  }

  render(): React.ReactNode {
    return (
      <>
        <div>
          <h2>Please Login! (user:1234)</h2>
          <br />
          <form onSubmit={(e: FormEvent<HTMLFormElement>): Promise<void> => this.handleSubmit(e)}>
            <input
              type="text"
              value={this.state.userName}
              placeholder="UserName"
              onChange={(e: ChangeEvent<HTMLInputElement>): void => this.setUserName(e)}
            />
            <br />
            <input
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={(e: ChangeEvent<HTMLInputElement>): void => this.setPassword(e)}
            />
            <br />
            <input type="submit" value="login" />
          </form>
        </div>
      </>
    );
  }
}
