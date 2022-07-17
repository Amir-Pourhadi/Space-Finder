import { User } from "models/Models";
import React, { ChangeEvent, FormEvent, SyntheticEvent } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "services/AuthService";

interface LoginProps {
  authService: AuthService;
  setUser: (user: User) => void;
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
    this.setState({ loginAttempted: true });
    const result: User | undefined = await this.props.authService.login(this.state.userName, this.state.password);
    if (result) {
      this.setState({ loginSuccessful: true });
      this.props.setUser(result);
    } else this.setState({ loginSuccessful: false });
  }

  private showMessage(): string | undefined {
    if (this.state.loginAttempted) {
      if (this.state.loginSuccessful) return "Login Successful";
      else return "Login Failed";
    }
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        {this.state.loginSuccessful && <Navigate to="/profile" replace={true} />}
        <div>
          <h2>Please Login</h2>
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
            <input type="submit" value="Login" />
          </form>
          <label data-testid="status-label">{this.showMessage()}</label>
        </div>
      </React.Fragment>
    );
  }
}
