import React from "react";

class CardForm extends React.Component {
  state = {
    frontInput: "",
    backInput: "",
  };
  handleNewCard = () => {
    this.props.onAddCard(this.state.frontInput, this.state.backInput);
    this.setState({ frontInput: "", backInput: "" });
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
