import React from "react";
import "./ConfirmModal.css";

interface ConfirmModalProps {
  visible: boolean;
  content: string;
  close: () => void;
}

export default class ConfirmModal extends React.Component<ConfirmModalProps> {
  render(): React.ReactNode {
    if (!this.props.visible) return null;
    else
      return (
        <div className="modal">
          <div className="modal-content">
            <h2>Reservation Result...</h2>
            <h3>{this.props.content}</h3>
            <button onClick={this.props.close}>Got it</button>
          </div>
        </div>
      );
  }
}
