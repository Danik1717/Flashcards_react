import React from "react";

class DeckManager extends React.Component {
  state = {
    newDeckTitle: "",
  };

  handleChangeInput = (e) => {
    this.setState({ newDeckTitle: e.target.value });
  };

  render() {
    const { decks, currentDeckId, onSelectDeck, onAddDeck } = this.props;

    return (
      <div>
        <h2>Deck Manager</h2>
        <hr />
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
          onClick={() => {
            onAddDeck(this.state.newDeckTitle);
            this.setState({ newDeckTitle: "" });
          }}
        >
          Add deck
        </button>
      </div>
    );
  }
}

export default DeckManager;
