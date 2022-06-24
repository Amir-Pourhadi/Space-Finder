import "components/App.css";
import Home from "components/Home";
import Login from "components/Login";
import Navbar from "components/Navbar";
import Profile from "components/Profile";
import Spaces from "components/Spaces";

import { User } from "models/Models";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthService from "services/AuthService";
import DataService from "services/DataService";

export default class App extends React.Component<{}, { user: User | undefined }> {
  constructor(props: any) {
    super(props);

    this.state = { user: undefined };

    this.setUser = this.setUser.bind(this);
  }

  private authService: AuthService = new AuthService();
  private dataService: DataService = new DataService();

  private setUser(user: User): void {
    this.setState({ user });
  }

  render(): React.ReactNode {
    return (
      <main>
        <Navbar user={this.state.user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login authService={this.authService} setUser={this.setUser} />} />
          <Route path="/profile" element={<Profile authService={this.authService} user={this.state.user} />} />
          <Route path="/spaces" element={<Spaces dataService={this.dataService} />} />
        </Routes>
      </main>
    );
  }
}
