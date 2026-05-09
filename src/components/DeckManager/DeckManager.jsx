import React from "react";

class DeckManager extends React.Component {
  state = {
    newDeckTitle: "",
  };

  handleChangeInput = (e) => {
    this.setState({ newDeckTitle: e.target.value });
  };

  handleCreateDeck = () => {
    
    if (this.state.newDeckTitle.trim() === "") return;

    this.props.onAddDeck(this.state.newDeckTitle);

    this.setState({ newDeckTitle: "" });
};

handleDeleteDeck = ()=> {
  if(this.props.currentDeckId === null) return
  this.props.onDeleteDeck(this.props.currentDeckId)
}

  render() {
    const { decks, currentDeckId, onSelectDeck, onAddDeck } = this.props;

    return (
      <div>
        <hr />
        <h2>Deck Manager</h2>
        <select
          value={currentDeckId || ""}
          onChange={(e) => {
            onSelectDeck(e.target.value);
          }}
        >
          <option value="" disabled>
            Choose the deck
          </option>
          {decks.map((deck) => {
            return (
              <option key={deck.id} value={deck.id}>
                {deck.title}
              </option>
            );
          })}
        </select>

        <input
          type="text"
          placeholder="Write the name of new deck"
          value={this.state.newDeckTitle}
          onChange={this.handleChangeInput}
        />
        <button
          onClick={this.handleCreateDeck}
        >
          Add deck
        </button>
        <button onClick={this.handleDeleteDeck}>Delete deck</button>
      </div>
    );
  }
}

export default DeckManager;
