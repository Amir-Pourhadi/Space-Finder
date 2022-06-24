import { User } from "models/Models";
import React from "react";

export default class Navbar extends React.Component<{ user: User }> {
  render(): React.ReactNode {
    return (
      <>
        <nav></nav>
      </>
    );
  }
}
