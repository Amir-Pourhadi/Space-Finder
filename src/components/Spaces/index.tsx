import Space from "components/Spaces/Space";
import { SpaceInterface } from "models/Models";
import React from "react";
import DataService from "services/DataService";

interface SpacesState {
  spaces: SpaceInterface[];
}

interface SpacesProps {
  dataService: DataService;
}

export default class Spaces extends React.Component<SpacesProps, SpacesState> {
  constructor(props: SpacesProps) {
    super(props);
    this.state = {
      spaces: [],
    };

    this.reserveSpace = this.reserveSpace.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const spaces: SpaceInterface[] = await this.props.dataService.getSpaces();
    this.setState({ spaces });
  }

  private async reserveSpace(spaceId: string) {}

  render(): React.ReactNode {
    return (
      <div>
        <h2>Welcome to the spaces page!</h2>
        {this.state.spaces.map(
          ({ id, name, location }: SpaceInterface): React.ReactElement => (
            <Space id={id} name={name} location={location} reserveSpace={this.reserveSpace} />
          )
        )}
      </div>
    );
  }
}
