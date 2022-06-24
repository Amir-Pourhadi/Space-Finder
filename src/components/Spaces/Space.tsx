import genericImage from "assets/generic-image.jpg";
import React from "react";
import "./Space.css";

interface SpaceProps {
  id: string;
  name: string;
  location: string;
  photoUrl?: string;
  reserveSpace: (id: string) => void;
}

export default class Space extends React.Component<SpaceProps> {
  render(): React.ReactNode {
    return (
      <div className="space-component">
        {this.props.photoUrl ? (
          <img src={this.props.photoUrl} alt={this.props.name} />
        ) : (
          <img src={genericImage} alt="Generic" />
        )}
        <label className="label name">{this.props.name}</label>
        <br />
        <label className="label id">{this.props.id}</label>
        <br />
        <label className="label location">{this.props.location}</label>
        <br />
        <button onClick={(): void => this.props.reserveSpace(this.props.id)}>Reserve</button>
      </div>
    );
  }
}
