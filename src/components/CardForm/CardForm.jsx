import React from "react";
import "./CardForm.css"
class CardForm extends React.Component {
  state = {
    frontInput: "",
    backInput: "",
    error: "",
  };
  handleNewCard = () => {
    if (this.props.currentDeckId) {
      this.props.onAddCard(this.state.frontInput, this.state.backInput);
      this.setState({ frontInput: "", backInput: "", error: "" });
    } else {
      this.setState({ error: "The deck not chosen. Please choose the deck" });
    }
  };

  handleFrontInput = (e) => {
    this.setState({ frontInput: e.target.value });
  };

  handleBackInput = (e) => {
    this.setState({ backInput: e.target.value });
  };
  render() {
    return (
      <div>
        <h2>AddCard</h2>
        <hr />
        <div className="error">{this.state.error}</div>
        <input
          type="text"
          value={this.state.frontInput}
          onChange={this.handleFrontInput}
          placeholder="Question"
        />
        <input
          type="text"
          value={this.state.backInput}
          onChange={this.handleBackInput}
          placeholder="Answer"
        />
        <button onClick={this.handleNewCard}>Create</button>
      </div>
    );
  }
}

export default CardForm;
