import ConfirmModal from "components/Spaces/ConfirmModal";
import Space from "components/Spaces/Space";
import { SpaceInterface } from "models/Models";
import React from "react";
import DataService from "services/DataService";

interface SpacesState {
  spaces: SpaceInterface[];
  showModal: boolean;
  modalContent: string;
}

interface SpacesProps {
  dataService: DataService;
}

export default class Spaces extends React.Component<SpacesProps, SpacesState> {
  constructor(props: SpacesProps) {
    super(props);
    this.state = {
      spaces: [],
      showModal: false,
      modalContent: "",
    };

    this.reserveSpace = this.reserveSpace.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const spaces: SpaceInterface[] = await this.props.dataService.getSpaces();
    this.setState({ spaces });
  }

  private async reserveSpace(spaceId: string): Promise<void> {
    const reservationResult: string | undefined = await this.props.dataService.reserveSpace(spaceId);
    if (reservationResult)
      this.setState({
        showModal: true,
        modalContent: `You reserved the space with id ${spaceId} and got reservation number ${reservationResult}!`,
      });
    else
      this.setState({
        showModal: true,
        modalContent: `Unfortunately, You can't reserve the space with id ${spaceId}!`,
      });
  }

  private closeModal(): void {
    this.setState({ showModal: false, modalContent: "" });
  }

  render(): React.ReactNode {
    return (
      <div>
        <h2>Welcome to the spaces page!</h2>
        {this.state.spaces.map(
          ({ id, name, location }: SpaceInterface): React.ReactElement => (
            <Space id={id} name={name} location={location} reserveSpace={this.reserveSpace} />
          )
        )}
        <ConfirmModal close={this.closeModal} content={this.state.modalContent} visible={this.state.showModal} />
      </div>
    );
  }
}
