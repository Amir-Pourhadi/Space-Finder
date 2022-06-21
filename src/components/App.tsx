import { User } from "models/Models";
import React from "react";

interface AppState {
  user: User | undefined;
}

export default class App extends React.Component<{}, AppState> {
  render(): React.ReactNode {
    return <div>Hello World!</div>;
  }
}
