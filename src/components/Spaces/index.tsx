import genericImage from "assets/generic-image.jpg";
import React from "react";

interface SpacesProps {
  id: string;
  name: string;
  location: string;
  photoUrl?: string;
  reserveSpace: (id: string) => void;
}

export default class Spaces extends React.Component<SpacesProps> {
  render(): React.ReactNode {
    return (
      <div>
        {this.props.photoUrl ? (
          <img src={this.props.photoUrl} alt={this.props.name} />
        ) : (
          <img src={genericImage} alt="Generic" />
        )}
        <label>{this.props.name}</label>
        <br />
        <label>{this.props.id}</label>
        <br />
        <label>{this.props.location}</label>
        <br />
        <button onClick={(): void => this.props.reserveSpace(this.props.id)}>Reserve</button>
      </div>
    );
  }
}
