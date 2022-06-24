import Home from "components/Home";
import Login from "components/Login";
import Navbar from "components/Navbar";
import Profile from "components/Profile";
import { User } from "models/Models";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthService from "services/AuthService";

export default class App extends React.Component<{}, { user: User | undefined }> {
  constructor(props: any) {
    super(props);

    this.state = { user: undefined };

    this.setUser = this.setUser.bind(this);
  }

  private authService: AuthService = new AuthService();
  private setUser(user: User): void {
    this.setState({ user });
    console.log("setting the user" + user);
  }

  render(): React.ReactNode {
    return (
      <main>
        <Navbar user={this.state.user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login authService={this.authService} setUser={this.setUser} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    );
  }
}
