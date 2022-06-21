import React from "react";
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

export default class Login extends React.Component<LoginProps, LoginState> {
  state: Readonly<LoginState> = {
    userName: "",
    password: "",
    loginAttempted: false,
    loginSuccessful: false,
  };

  render(): React.ReactNode {
    return (
      <>
        <div>
          <h2>Please Login!</h2>
          <br />
          <form action="">
            <input type="text" value={this.state.userName} placeholder="UserName" />
            <br />
            <input type="password" value={this.state.password} placeholder="Password" />
            <br />
            <input type="submit" value="login" />
          </form>
        </div>
      </>
    );
  }
}
