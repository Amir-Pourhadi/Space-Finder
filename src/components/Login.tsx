import { User } from "models/Models";
import React, { SyntheticEvent } from "react";
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
  constructor(props: any) {
    super(props);
    this.state = { userName: "", password: "", loginAttempted: false, loginSuccessful: false };
    this.setUserName = this.setUserName.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private setUserName(event: CustomEvent): void {
    this.setState({ userName: event.target.value });
  }

  private setPassword(event: CustomEvent): void {
    this.setState({ password: event.target.value });
  }

  private async handleSubmit(event: SyntheticEvent): Promise<void> {
    event.preventDefault();
    const result: User | undefined = await this.props.authService.login(this.state.userName, this.state.password);
    if (result) {
      this.setState({ loginAttempted: true, loginSuccessful: true });
      this.props.setUser(result);
    } else this.setState({ loginAttempted: true, loginSuccessful: false });
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <div>
          <h2>Please Login</h2>
          <br />
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.userName} placeholder="UserName" onChange={this.setUserName} />
            <br />
            <input type="password" value={this.state.password} placeholder="Password" onChange={this.setPassword} />
            <br />
            <input type="submit" value="Login" />
          </form>
          <label data-testid="status-label">
            {this.state.loginAttempted &&
              (this.state.loginSuccessful ? <Navigate to="/profile" replace={true} /> : "Login Failed")}
          </label>
        </div>
      </React.Fragment>
    );
  }
}
